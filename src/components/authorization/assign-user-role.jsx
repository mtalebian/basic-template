import { useMemo, useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../assets/icons";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { BasicInput } from "../../components/basic-form/basic-input";
import { useAccount } from "../../app/account-context";
import { msgbox } from "react-basic-design";
import { RenderUserRole } from "./render-user-role";
import { RenderUserCompositeRole } from "./render-composit-role";
import { roleApi } from "../../api/role-api";
import { Tab } from "react-bootstrap";
import { notify } from "../../components/basic/notify";

export const AssignUserRole = ({ projectId, userId, roleId, compositeRoleId, onGoBack }) => {
  const { t } = useTranslation();
  const formRef = useRef();
  const [defaultActiveTab, setDefaultActiveTab] = useState(roleId ? "userRoleTab" : "userCompositeRoleTab");
  const [initialized, setInitialized] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [userCompositeRoles, setUserCompositeRoles] = useState([]);
  const assignType = defaultActiveTab == "userRoleTab" ? "role" : "compositeRole";
  const title = defaultActiveTab == "userRoleTab" ? "Assign Role" : "Assign Composite Role";
  const [deleting, setDeleting] = useState(false);
  const account = useAccount();
  const [busy, setBusy] = useState(false);

  const initialValue = {
    projectId: projectId,
    userId: userId,
    roleId: assignType == "role" ? roleId : compositeRoleId,
  };

  useEffect(() => {
    if (!initialized && account.isConnected()) {
      if (roleId) {
        roleApi
          .getUserRoles("role", projectId, userId)
          .then((x) => {
            setUserRoles(x);
          })
          .catch((ex) => {
            notify.error(ex);
          });
      }
      if (compositeRoleId) {
        roleApi
          .getUserRoles("compositeRole", projectId, userId)
          .then((x) => {
            setUserCompositeRoles(x);
          })
          .catch((ex) => {
            notify.error(ex);
          });
      }
      setInitialized(true);
    }
  });

  const onSubmit = () => {
    if (account.isConnected()) {
      var values = formRef.current.values;
      setBusy(true);
      roleApi
        .assignRole(assignType, values)
        .then((newItem) => {
          if (assignType == "role") {
            setUserRoles([...userRoles, newItem]);
          } else {
            setUserCompositeRoles([...userCompositeRoles, newItem]);
          }
          notify.info(t("role-is-assigned"));
          setBusy(false);
        })
        .catch((ex) => {
          notify.error(ex);
          setBusy(false);
        });
    }
  };
  const deleteAssignRoleHandler = (selectItem) => {
    msgbox(t("the-User-role-will-be-deleted"), null, (hide) => (
      <>
        <bd.Button variant="text" color="primary" onClick={hide} className="m-e-2">
          {t("cancel")}
        </bd.Button>

        <bd.Button variant="text" color="primary" disabled={deleting} onClick={() => onDeleteAssignRole(selectItem, hide)} type="button">
          {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
          {t("delete")}
        </bd.Button>
      </>
    ));
  };
  const onDeleteAssignRole = (selectItem, hide) => {
    if (account.isConnected()) {
      setDeleting(true);
      const roleId = assignType == "role" ? selectItem.roleId : selectItem.compositeRoleId;
      roleApi
        .deleteAssignRole(assignType, selectItem.projectId, roleId, selectItem.userId)
        .then((x) => {
          if (assignType == "role") {
            const newUserRoles = userRoles.filter((x) => x.roleId != selectItem.roleId);
            setUserRoles(newUserRoles);
          } else {
            const newUserCompositeRole = userCompositeRoles.filter((x) => x.compositeRoleId != selectItem.compositeRoleId);
            setUserCompositeRoles(newUserCompositeRole);
          }
          setDeleting(false);
          hide();
          notify.info(t("role-assigned-is-deleted"));
        })
        .catch((ex) => {
          notify.error(ex);
          setDeleting(false);
        });
    }
  };

  const AssignBox = () => {
    const styleAddBox = {
      maxWidth: 650,
      borderRadius: "5px",
      padding: 20,
      boxShadow: "rgb(0 0 0 / 2%) 0px 0px 0px 0px, rgb(10 31 35 / 8%) 0px 0px 0px 1px",
    };
    return (
      <div className="row mt-4" style={styleAddBox}>
        <h5>{title}</h5>
        <div className="col-md-8 pt-3">
          <BasicInput name="projectId" label={t("project-id")} labelSize="4" autoComplete="off" autoFocus />
          <BasicInput name="userId" label={t("user-id")} labelSize="4" autoComplete="off" autoFocus />
          <BasicInput name="roleId" label={t("role-id")} labelSize="4" autoComplete="off" autoFocus />
        </div>
        <div className="col-md-4" style={{ margin: "auto" }}>
          <bd.Button color="primary" disabled={busy} onClick={() => onSubmit}>
            {busy && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
            <icons.Add />
            <span>{t("assign-role")}</span>
          </bd.Button>
        </div>
        <hr />
        <Tab.Content>
          <Tab.Pane eventKey="userRoleTab">
            {userRoles && (
              <RenderUserRole
                userRoles={userRoles}
                deleteUserRoleItem={(selectItem) => {
                  deleteAssignRoleHandler(selectItem);
                }}
              />
            )}
          </Tab.Pane>
          <Tab.Pane eventKey="userCompositeRoleTab">
            <RenderUserCompositeRole
              userCompositRoles={userCompositeRoles}
              deleteUserCompositeRoleItem={(selectItem) => {
                deleteAssignRoleHandler(selectItem);
              }}
            />
          </Tab.Pane>
        </Tab.Content>
      </div>
    );
  };

  const PageBody = () => {
    return (
      <Formik
        initialValues={initialValue}
        validationSchema={yup.object({
          projectId: yup.string().required("required"),
          userId: yup.string().required("required"),
          roleId: yup.string().required("required"),
        })}
        onSubmit={onSubmit}
        innerRef={formRef}
      >
        <Form>
          <AssignBox />
        </Form>
      </Formik>
    );
  };
  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey={defaultActiveTab}>
        <div className="border-bottom bg-default">
          <bd.Toolbar className="container">
            <bd.Button variant="icon" onClick={() => onGoBack()} size="md" edge="start" className="m-e-2">
              <icons.ArrowBackIos className="rtl-rotate-180" />
            </bd.Button>
            <h5 className="col-6">{t("assign-user-role")}</h5>
            <div className="flex-grow-1" />
          </bd.Toolbar>
          <bd.TabStrip textColor="primary" indicatorColor="primary" className="container">
            <bd.TabStripItem eventKey="userRoleTab" onClick={() => setDefaultActiveTab("userRoleTab")}>
              {t("user-role-tab")}
            </bd.TabStripItem>
            <bd.TabStripItem eventKey="userCompositeRoleTab" onClick={() => setDefaultActiveTab("userCompositeRoleTab")}>
              {t("user-compositeRole-tab")}
            </bd.TabStripItem>
          </bd.TabStrip>
        </div>
        <div className="container">
          <PageBody />
        </div>
      </Tab.Container>
    </>
  );
};
