import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import * as yup from "yup";
import { notify } from "../../../components/basic/notify";
import { Form, Formik } from "formik";
import { BasicInput } from "../../../components/basic-form/basic-input";
import { RenderTableDiv } from "../../../components/table/render-table-div";
import { Modal, Tab } from "react-bootstrap";
import { authorizationApi } from "../../../api/authorization-api";
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

export const EditRole = ({ roleId, onGoBack }) => {
  const { t } = useTranslation();
  const formRef = useRef();
  const insertMode = !roleId;
  const titlePage = insertMode ? "New-Role" : "Edit-Role";
  const [busy, setBusy] = useState(false);
  const [role, setRole] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const initialValue = insertMode ? { id: "", title: "" } : role;
  const [authorizationObject, setAuthorizationObject] = useState([]);
  const [azObjects, setAzObjects] = useState([]);
  const azObjectListLoadedFromDB = [
    { id: 1, title: "New4" },
    { id: 5, title: "New5" },
    { id: 6, title: "New6" },
    { id: 7, title: "New7" },
  ];
  const authorizationObjectCurrentRole = [
    {
      title: "Massenger",
      id: 1,
      Fields: [
        { id: "readField", title: "Read", value: "1" },
        { id: "Reply", title: "Reply", value: "2" },
        { id: "Block", title: "Block", value: "3" },
      ],
    },
    {
      title: "Payment",
      id: 2,
      Fields: [
        { id: "Filed1", title: "Filed1", value: "" },
        { id: "Field2", title: "Field2", value: "" },
      ],
    },
  ];

  useEffect(() => {
    if (!insertMode && role == null) {
      authorizationApi
        .getRole(roleId)
        .then((x) => {
          setRole(x);
        })
        .catch((ex) => {
          notify.error(ex);
        });
    }
    if (!insertMode && !authorizationObject.length) {
      setAuthorizationObject(authorizationObjectCurrentRole);
    }
    if (!azObjects.length) {
      setAzObjects(azObjectListLoadedFromDB);
    }
  });

  const onSaveClick = (e) => {
    alert("save");
  };

  const onDeleteRoleClick = (hide) => {
    setDeleting(true);
    authorizationApi
      .deleteRole(roleId)
      .then((x) => {
        setDeleting(false);
        hide();
        notify.info(t("role-is-deleted"));
        onGoBack(null);
      })
      .catch((ex) => {
        setDeleting(false);
        notify.error(ex);
      });
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
  const onDeleteAzObjectClick = (id) => {
    msgbox("you are deleting 1 record", null, [
      { title: "close" },
      {
        title: "delete",
        action: (hide) => {
          hide();
          const temp = authorizationObject.filter((azObject) => azObject.id != id);
          setAuthorizationObject(temp);
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
  const GeneralTab = () => {
    const inputStyle = {
      maxWidth: 250,
    };
    return (
      <div className="row">
        <div className="col-md-6">
          <BasicInput name="id" label={t("role-id")} labelSize="2" autoComplete="off" autoFocus style={inputStyle} readOnly={!insertMode} />
          <BasicInput name="title" label={t("title")} labelSize="2" autoComplete="off" autoFocus style={inputStyle} />
          <BasicInput name="application" label={t("application-id")} labelSize="2" autoComplete="off" autoFocus style={inputStyle} />
        </div>
      </div>
    );
  };
  const AuthorizationTab = () => {
    const inputStyle = {
      maxWidth: 250,
    };
    return (
      <>
        <div className="col-5">
          <bd.Toolbar className="container">
            <SelectAzObjectForm azObjects={azObjects} onSelect={(object) => setAuthorizationObject([...authorizationObject, object])} />
            <div className="flex-grow-1" />
          </bd.Toolbar>
          <div className="border-bottom"></div>

          <div className="container pt-4">
            {authorizationObject.map((azObject) => {
              return (
                <div className="pt-4" key={azObject.id}>
                  <div className="col-7">
                    <bd.Toolbar className="container">
                      <h4 className="p-e-2">
                        {" "}
                        {azObject.title} (#{azObject.id})
                      </h4>
                      <bd.Button color="secondary" variant="icon" onClick={() => onDeleteAzObjectClick(azObject.id)} type="button">
                        <icons.Delete className="size-md" />
                      </bd.Button>
                    </bd.Toolbar>
                  </div>
                  <dl className="pt-4">
                    {azObject.Fields.map((azFiled) => {
                      return (
                        <dd key={azFiled.id}>
                          {" "}
                          <BasicInput
                            name="value"
                            label={azFiled.title}
                            placeholder="Value"
                            value={azFiled.value}
                            labelSize="2"
                            autoComplete="off"
                            style={inputStyle}
                          />
                        </dd>
                      );
                    })}
                  </dl>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  const TabContainer = () => {
    return (
      <>
        <Formik
          initialValues={initialValue}
          validationSchema={yup.object({
            id: yup.string().required("required"),
            title: yup.string().required("required"),
          })}
          onSubmit={onSaveClick}
          innerRef={formRef}
        >
          <Form className="pt-2">
            <div className="row">
              <div className="col-md-12">
                <Tab.Content className="mt-4">
                  <Tab.Pane eventKey="home">
                    <h5 className="pb-2 pt-2 ">{t("general-tab")}</h5>
                    <GeneralTab />
                    <div className="col-8 border-bottom"></div>
                    <h5 className="pb-2 pt-5 ">{t("authorization-tab")}</h5>
                    <AuthorizationTab />
                  </Tab.Pane>
                  <Tab.Pane eventKey="general">
                    <GeneralTab />
                  </Tab.Pane>
                  <Tab.Pane eventKey="authorization">
                    <AuthorizationTab />
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </div>
          </Form>
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
          <TabContainer />
        </div>
      </Tab.Container>
    </>
  );
};

//
const SelectAzObjectForm = ({ azObjects, onSelect }) => {
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
    const newAzObject = {
      title: "NewObject",
      id: 3,
      Fields: [{ id: "fff", title: "fff", value: "8" }],
    };
    onSelect(newAzObject);
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
