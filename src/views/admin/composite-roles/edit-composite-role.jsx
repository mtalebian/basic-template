import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import * as yup from "yup";
import { notify } from "../../../components/basic/notify";
import { Form, Formik } from "formik";
import { BasicInput } from "../../../components/basic-form/basic-input";
import { useAccount } from "../../../app/account-context";
import { msgbox } from "react-basic-design";
import { roleApi } from "../../../api/role-api";

export const EditCompositeRole = ({ currentProjectId, originalCompositeRole, onGoBack, onChange }) => {
  const { t } = useTranslation();
  const formRef = useRef();
  const insertMode = !originalCompositeRole;
  const account = useAccount();
  const titlePage = insertMode ? "New-Composite-Role" : "Edit-Composite-Role";
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const initialValue = insertMode
    ? {
        id: "",
        title: "",
      }
    : originalCompositeRole;

  const onDeleteCompositeRoleClick = (hide) => {
    if (account.isConnected()) {
      setBusy(true);
      roleApi
        .deleteCompositeRole(currentProjectId, originalCompositeRole.id)
        .then((x) => {
          setDeleting(false);
          hide();
          notify.info(t("composit-role-is-deleted"));
          onChange(null, originalCompositeRole);
          setBusy(false);
        })
        .catch((ex) => {
          setDeleting(false);
          notify.error(ex);
          setBusy(false);
        });
    }
  };

  const deleteCompositeRoleClickHandler = () => {
    msgbox(t("the-composite-role-will-be-deleted"), null, (hide) => (
      <>
        <bd.Button variant="text" color="primary" onClick={hide} className="m-e-2">
          {t("cancel")}
        </bd.Button>

        <bd.Button variant="text" color="primary" disabled={deleting} onClick={() => onDeleteCompositeRoleClick(hide)} type="button">
          {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
          {t("delete")}
        </bd.Button>
      </>
    ));
  };

  const moreMenu = (
    <bd.Menu>
      <bd.MenuItem disabled={insertMode | busy || deleting} onClick={deleteCompositeRoleClickHandler}>
        {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
        <span>{t("delete")}</span>
      </bd.MenuItem>
    </bd.Menu>
  );

  const onSubmit = (values) => {
    values.projectId = currentProjectId;
    const insertMode = !originalCompositeRole;
    if (account.isConnected()) {
      setBusy(true);
      roleApi
        .saveCompositeRole(insertMode, values)
        .then((x) => {
          notify.info(t("composite-role-is-saved"));
          onChange(values, originalCompositeRole);
          setBusy(false);
        })
        .catch((ex) => {
          notify.error(ex);
          setBusy(false);
        });
    }
  };

  return (
    <>
      <bd.Toolbar className="container">
        <bd.Button variant="icon" onClick={() => onGoBack()} size="md" edge="start" className="m-e-2">
          <icons.ArrowBackIos className="rtl-rotate-180" />
        </bd.Button>
        <h5 className="col-4">{t(titlePage)}</h5>
        <div className="flex-grow-1" />
        <bd.Button color="primary" disabled={busy} onClick={() => formRef.current.submitForm()}>
          {busy && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
          <span>{t("save-changes")}</span>
        </bd.Button>
        <bd.Button variant="icon" menu={moreMenu} edge="end" className="m-s-1">
          <icons.MoreVert />
        </bd.Button>
      </bd.Toolbar>
      <Formik
        initialValues={initialValue}
        validationSchema={yup.object({
          id: yup.string().required("required"),
          title: yup.string().required("required"),
        })}
        onSubmit={onSubmit}
        innerRef={formRef}
      >
        <Form>
          <div className="container pt-4">
            <div style={{ maxWidth: 400 }}>
              <BasicInput name="id" label={t("composite-role-id")} labelSize="4" autoComplete="off" autoFocus readOnly={!insertMode} />
              <BasicInput name="title" label={t("title")} labelSize="4" autoComplete="off" autoFocus />
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};
