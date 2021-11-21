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
import { Modal } from "react-bootstrap";
import { RenderTableDiv } from "../../../components/table/render-table-div";
import { T } from "../../../components/basic/text";
import { useReactTable } from "../../../components/table/use-react-table";
import { TableTitlebar } from "../../../components/table";
import { RenderRoles } from "./render-roles";

export const EditCompositeRole = ({ currentProjectId, originalCompositeRole, roles, onGoBack, onChange }) => {
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
        roles: [],
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
      <div className="border-bottom bg-default">
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
      </div>
      <div className="container pt-4">
        <Formik
          initialValues={initialValue}
          validationSchema={yup.object({
            id: yup.string().required("required"),
            title: yup.string().required("required"),
          })}
          onSubmit={onSubmit}
          innerRef={formRef}
        >
          {({ values }) => (
            <Form>
              <div className="row" style={{ maxWidth: 500 }}>
                <BasicInput name="id" label={t("composite-role-id")} labelSize="4" autoComplete="off" autoFocus readOnly={!insertMode} />
                <BasicInput name="title" label={t("title")} labelSize="4" autoComplete="off" autoFocus />
                <div class="border-bottom">
                  <div class="container toolbar">
                    <h5 class="flex-grow-1">Role-list</h5>
                    <SelectRoleForm
                      roles={roles}
                      onSelect={(object) => {
                        var field = formRef.current.getFieldProps("roles");
                        formRef.current.setFieldValue("roles", [...field.value, { ...object }]);
                      }}
                    />
                  </div>
                </div>
                <RenderRoles data={values} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

const SelectRoleForm = ({ roles, onSelect }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const gridColumns = useRef([
    { Header: <T>id</T>, accessor: "id" },
    { Header: <T>title</T>, accessor: "title" },
  ]);

  const tableApi = useReactTable({ columns: gridColumns.current, data: roles, flexLayout: false });

  return (
    <>
      <bd.Button color="primary" variant="icon" type="button" onClick={handleShow}>
        <icons.Add className="size-lg" />
      </bd.Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{<T>Select Roles</T>}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TableTitlebar hideSettings tableApi={tableApi} title="roles" fixed />
          <RenderTableDiv
            tableApi={tableApi}
            singleSelect
            hideCheckbox
            showTableInfo
            showPageSize
            enablePaging
            enableSorting
            clickAction="select"
            className="nano-scroll border"
            hasWhitespace
            onShowMoreClick={(row) => onSelect(row.original)}
          />
        </Modal.Body>
        <Modal.Footer>
          <bd.Button
            type="button"
            variant="icon"
            size="md"
            color="primary"
            disabled={!tableApi.selectedFlatRows.length}
            onClick={() => {
              tableApi.selectedFlatRows.length && onSelect(tableApi.selectedFlatRows[0].original);
            }}
            className="mx-1"
          >
            <icons.Add />
            <T>add</T>
          </bd.Button>
          <bd.Button variant="secondary" onClick={handleClose} type="button">
            Close
          </bd.Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
