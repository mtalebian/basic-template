import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import * as yup from "yup";
import { notify } from "../../../components/basic/notify";
import { Form, Formik } from "formik";
import { BasicInput } from "../../../components/basic-form/basic-input";
import { RenderTableDiv } from "../../../components/table/render-table-div";
import { Modal, Tab } from "react-bootstrap";
import { roleApi } from "../../../api/role-api";
import { useAccount } from "../../../app/account-context";
import { msgbox } from "react-basic-design";
import { DefaultEditor } from "../../../components/table/editors";
import { TableTitlebar } from "../../../components/table";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  useRowSelect,
  //useBlockLayout,
  useFlexLayout,
  //useRowState,
  useResizeColumns,
} from "react-table";
import { RenderAuthorizations } from "./render-auth";

export const EditRole = ({ currentProjectId, originalRole, azObjects, onGoBack, onChange }) => {
  const { t } = useTranslation();
  const formRef = useRef();
  const insertMode = !originalRole;
  const account = useAccount();
  const titlePage = insertMode ? "New-Role" : "Edit-Role";
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [authorizations, setAuthorizations] = useState([]);

  const onSubmit = (values) => {
    // alert(JSON.stringify(values, null, 2));
    values.projectId = currentProjectId;
    const insertMode = !originalRole;
    if (account.isConnected()) {
      roleApi
        .saveRole(insertMode, values)
        .then((x) => {
          notify.info(t("role-is-saved"));
          onChange(values, originalRole);
        })
        .catch((ex) => {
          notify.error(ex);
        });
    }
  };

  const onDeleteRoleClick = (hide) => {
    if (account.isConnected()) {
      roleApi
        .deleteRole(currentProjectId, originalRole.id)
        .then((x) => {
          setDeleting(false);
          hide();
          notify.info(t("role-is-deleted"));
          onChange(null, originalRole);
        })
        .catch((ex) => {
          setDeleting(false);
          notify.error(ex);
        });
    }
  };

  const deleteRoleClickHandler = () => {
    msgbox(t("the-role-will-be-deleted"), null, (hide) => (
      <>
        <bd.Button variant="text" color="primary" onClick={hide} className="m-e-2">
          {t("cancel")}
        </bd.Button>

        <bd.Button variant="text" color="primary" disabled={deleting} onClick={() => onDeleteRoleClick(hide)} type="button">
          {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
          {t("delete")}
        </bd.Button>
      </>
    ));
  };

  const onDeleteAzObject = (id) => {
    console.log(authorizations);
    msgbox("you are deleting 1 record", null, [
      { title: "close" },
      {
        title: "delete",
        action: (hide) => {
          hide();
          const temp = authorizations.filter((azObject) => azObject.id != id);
          setAuthorizations(temp);
        },
      },
    ]);
    return;
  };

  const moreMenu = (
    <bd.Menu>
      <bd.MenuItem disabled={insertMode | busy || deleting} onClick={deleteRoleClickHandler}>
        {deleting && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
        <span>{t("delete")}</span>
      </bd.MenuItem>
    </bd.Menu>
  );

  const PageContainer = () => {
    return (
      <>
        <Formik
          initialValues={originalRole ?? { authorizations: [] }}
          validationSchema={yup.object({
            id: yup.string().required("required"),
            title: yup.string().required("required"),
          })}
          onSubmit={onSubmit}
          innerRef={formRef}
        >
          {({ values }) => (
            <Form className="pt-2">
              <Tab.Content className="mt-4">
                <Tab.Pane eventKey="home">
                  <GeneralTab insertMode={insertMode} />

                  {/* RENDER-AUTH --- BEGIN*/}

                  <div className="border-bottom">
                    <bd.Toolbar className="container">
                      <h5 className="flex-grow-1">{t("authorization-tab")}</h5>
                      <SelectAzObjectForm
                        currentProjectId={currentProjectId}
                        azObjects={azObjects}
                        onSelect={(object) => {
                          var field = formRef.current.getFieldProps("authorizations");
                          formRef.current.setFieldValue("authorizations", [...field.value, { ...object }]);
                        }}
                      />
                      <div className="flex-grow-1" />
                    </bd.Toolbar>
                  </div>
                  <RenderAuthorizations role={values} onDeleteAzObject={onDeleteAzObject} />

                  {/* RENDER-AUTH -- END */}
                </Tab.Pane>
                <Tab.Pane eventKey="general">{/* <GeneralTab /> */}</Tab.Pane>
                <Tab.Pane eventKey="authorization">{/* <AuthorizationTab /> */}</Tab.Pane>
              </Tab.Content>
            </Form>
          )}
        </Formik>
      </>
    );
  };

  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="home">
        <div className="border-bottom bg-default">
          <bd.Toolbar className="container">
            <bd.Button variant="icon" onClick={() => onGoBack()} size="md" edge="start" className="m-e-2">
              <icons.ArrowBackIos className="rtl-rotate-180" />
            </bd.Button>
            <h5 className="col-1">{t(titlePage)}</h5>

            <div className="flex-grow-1" />
            <bd.Button color="primary" disabled={busy} onClick={() => formRef.current.submitForm()}>
              {busy && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
              <span>{t("save-changes")}</span>
            </bd.Button>

            <bd.Button variant="icon" menu={moreMenu} edge="end" className="m-s-1">
              <icons.MoreVert />
            </bd.Button>
          </bd.Toolbar>
          <bd.TabStrip textColor="primary" indicatorColor="primary" className="container">
            <bd.TabStripItem style={{ display: "none" }} eventKey="home"></bd.TabStripItem>
            <bd.TabStripItem eventKey="general">{t("general-info-tab")}</bd.TabStripItem>
            <bd.TabStripItem eventKey="authorization">{t("authorization-tab")}</bd.TabStripItem>
            <bd.TabStripItem eventKey="othertab">{t("other-tab")}</bd.TabStripItem>
          </bd.TabStrip>
        </div>
        <div className="container">
          <PageContainer />
        </div>
      </Tab.Container>
    </>
  );
};

//
//
const SelectAzObjectForm = ({ currentProjectId, azObjects, onSelect }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const defaultPageSize = 10;
  const skipReset = true;
  const tableApi = useTable(
    {
      initialState: { pageSize: defaultPageSize },
      defaultColumn: {
        Cell: DefaultEditor,
        minWidth: 30,
        disableGroupBy: true,
      },
      columns: useMemo(
        () => [
          { Header: t("id"), accessor: "id", width: 50 },
          { Header: t("title"), accessor: "title" },
          {
            Header: t("operation"),
            accessor: "operation",
            Cell: ({ row }) => {
              return (
                <bd.Button
                  size="sm"
                  color="inherit"
                  size
                  onClick={() => {
                    addNewAzObjectClick(row.original);
                  }}
                >
                  <icons.Add className="size-md" />
                  {t("add")}
                </bd.Button>
              );
            },
          },
        ],
        []
      ),
      data: useMemo(() => (azObjects ? azObjects : []), [azObjects]),
      autoResetPage: !skipReset,
      autoResetFilters: !skipReset,
      autoResetSortBy: !skipReset,
      autoResetSelectedRows: !skipReset,
      autoResetGlobalFilter: !skipReset,
      disableMultiSort: false,
    },
    useGlobalFilter,
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    useFlexLayout,
    useResizeColumns
  );

  const addNewAzObjectClick = (row) => {
    roleApi
      .getAzObjectFields(currentProjectId, row.id)
      .then((x) => {
        onSelect(x);
      })
      .catch((ex) => {
        notify.error(ex);
      });
  };

  return (
    <>
      <bd.Button color="primary" variant="icon" type="button" onClick={handleShow}>
        <icons.Add className="size-lg" />
      </bd.Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("add-az-object")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TableTitlebar tableApi={tableApi} hideSettings title="AzObjects" fixed />
          <RenderTableDiv
            tableApi={tableApi}
            resizable
            //multiSelect
            singleSelect
            hideCheckbox
            hasSummary
            showTableInfo
            showPageSize
            enablePaging
            enableGrouping
            enableSorting
            //editable
            clickAction="select"
            className="border0 nano-scroll border"
            //style={{ minHeight: 400 }}
            //hover
            // striped
            hasWhitespace
            stickyFooter
          />
        </Modal.Body>
        <Modal.Footer>
          <bd.Button variant="secondary" onClick={handleClose} type="button">
            Close
          </bd.Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

/**
 *
 *
 */
const GeneralTab = ({ insertMode }) => {
  const { t } = useTranslation();
  return (
    <div className="row">
      <div className="col-md-6" style={{ maxWidth: 400 }}>
        <BasicInput name="id" label={t("role-id")} labelSize="4" autoComplete="off" autoFocus readOnly={!insertMode} />
        <BasicInput name="title" label={t("title")} labelSize="4" autoComplete="off" autoFocus />
        <BasicInput name="applicationTitle" label={t("application-title")} labelSize="4" autoComplete="off" autoFocus />
      </div>
    </div>
  );
};
