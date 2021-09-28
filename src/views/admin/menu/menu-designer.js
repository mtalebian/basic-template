import React, { useState, useContext } from "react";
import { Form } from "react-final-form";
//import { Dropdown } from "react-bootstrap";

import * as bs from "react-basic-design";
import MainMenu, { menuHelper } from "../../../components/mainmenu/mainmenu";
import * as tables from "../../../data";
import { messages } from "../../../components/messages";
import { ThemeContext } from "../../../app/theme-context";
import { BasicModal } from "../../../components/basic/basic-modal";
import { GenerateEditControls } from "../../../components/basic/table/generate-edit-controls";
import { notify } from "../../../components/basic/notify";
import * as icons from "../../../assets/icons";

export function MenuDesigner({ applications, currApp, setApp, menus, menuFolders, onAdd, onUpdate, onDelete }) {
    const [theme] = useContext(ThemeContext);
    const [busy, setBusy] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [insertMode, setInsertMode] = useState(false);
    const [entityTable, setEntityTable] = useState(null);
    const [entity, setEntity] = useState({});

    const [activeItem, setActiveItem] = useState(null);
    const [activeItemTable, setActiveItemTable] = useState({});
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);

    /*    const changeCurrentApp = (x) => {
        setApp(x);
        setActiveItem(null);
    };*/

    const onSelectMenu = (folder, menu) => {
        setActiveItem(!menu ? folder : menu);
        setActiveItemTable(!menu ? tables.menuFolders : tables.menus);
        if (
            menuHelper.isOpen({
                folder,
                folders: menuFolders,
                menus,
                selectedFolder,
                selectedMenu,
            })
        ) {
            folder = folder.parentId == null ? null : menuFolders.find((x) => x.id === folder.parentId);
        }
        setSelectedFolder(folder);
        setSelectedMenu(menu);
        setInsertMode(false);
    };

    const currFolderId = () => (!activeItem ? null : activeItemTable.is("menus") ? activeItem.parentId : activeItem.id);
    const onAddFolderClick = () => openEditForm(true, { parentId: currFolderId() }, tables.menuFolders);
    const onAddMenuClick = () => openEditForm(true, { parentId: currFolderId() }, tables.menus);

    const openEditForm = (insert_mode, data, table) => {
        setEntity(data);
        setEntityTable(table);
        setInsertMode(insert_mode);
        setShowEditForm(true);
    };

    const onDeleteClick = () => {
        setEntity(activeItem);
        setEntityTable(activeItemTable);
        setShowEditForm(false);
        setShowDeleteForm(true);
    };

    const deleteEntity = () => {
        onDelete(entity, entityTable)
            .then((x) => {
                setShowDeleteForm(false);
                notify.info(messages.RowIsDeleted);
                setBusy(false);
                //
                var p = menuFolders.find((x) => x.id === activeItem.parentId);
                setActiveItem(p);
                setSelectedFolder(p);
                setSelectedMenu(null);
            })
            .catch((ex) => {
                notify.error(ex);
                setBusy(false);
            });
    };

    const onSaveEditForm = (values) => {
        setBusy(true);
        var task = insertMode ? onAdd(values, entityTable) : onUpdate(values, entityTable);
        task.then((x) => {
            setShowEditForm(false);
            notify.info(messages.ChangesAreSaved);
            setBusy(false);
            if (insertMode) {
                if (entityTable.is("menus")) {
                    setSelectedMenu(x);
                    setSelectedFolder(null);
                } else {
                    setSelectedMenu(null);
                    setSelectedFolder(x);
                }
                setActiveItem(x);
                setActiveItemTable(entityTable);
            }
        }).catch((ex) => {
            notify.error(ex);
            setBusy(false);
        });
    };

    return (
        <>
            <div className="sticky-top border mt-0 bg-light mb-3 card" style={{}}>
                <div className="card-body">
                    <div className="row row-cols-sm g-2 align-items-center">
                        {!currApp && <div className="col">{messages.SelectAnApp}</div>}
                        {!!currApp && (
                            <div className="col">
                                <button className="btn btn-sm btn-primary px-1" onClick={onAddFolderClick}>
                                    <icons.Folder height={20} fill="#fff" />
                                </button>

                                <button className="btn btn-sm btn-primary px-1 mx-2" onClick={onAddMenuClick}>
                                    <icons.InsertDriveFile />
                                </button>

                                {activeItem && (
                                    <>
                                        <bs.Button
                                            variant="text"
                                            size="sm"
                                            onClick={() => openEditForm(false, activeItem, activeItemTable)}
                                            title={activeItem.title}
                                        >
                                            <icons.Edit />
                                            {messages.Edit}
                                        </bs.Button>
                                        {
                                            <bs.Button variant="text" size="sm" onClick={onDeleteClick}>
                                                <icons.Delete />
                                                {messages.Delete}
                                            </bs.Button>
                                        }
                                        <bs.Button
                                            variant="text"
                                            size="sm"
                                            color="secondary"
                                            onClick={() => setActiveItem(null)}
                                            title={messages.Cancel}
                                        >
                                            <icons.Close height={16} fill="#555" />
                                        </bs.Button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* EDIT FORM */}
                    {entityTable && (
                        <BasicModal
                            show={showEditForm}
                            setShow={setShowEditForm}
                            title={(insertMode ? messages.New : messages.Edit) + " " + entityTable.singularTitle}
                            args={{
                                insertMode,
                                entity,
                                columns: entityTable.getReactTableColumns(),
                            }}
                            renderBody={({ args }) => (
                                <>
                                    <Form
                                        initialValues={args.entity}
                                        onSubmit={onSaveEditForm}
                                        render={({ handleSubmit, form, submitting, pristine, invalid, values }) => (
                                            <form onSubmit={handleSubmit}>
                                                <GenerateEditControls columns={args.columns} data={args.entity} insertMode={args.insertMode} />
                                                <div className="text-end pt-3">
                                                    <button className="btn btn-sm btn-warning" type="submit" disabled={busy || invalid}>
                                                        {busy && <div className="me-2 spinner-border spinner-border-sm"></div>}
                                                        {messages.Save}
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    />
                                </>
                            )}
                        />
                    )}

                    <BasicModal
                        show={showDeleteForm}
                        setShow={setShowDeleteForm}
                        title={messages.ConfirmDeleting}
                        args={{ entity }}
                        renderBody={({ args }) => (
                            <>
                                <p>{messages.YouAreGoingToDeleteRows.replace("{count}", 1)}</p>
                                <div className="text-end pt-3">
                                    <button className="btn btn-danger btn-sm text-white" type="button" onClick={deleteEntity} disabled={busy}>
                                        {busy && <div className="me-2 spinner-border spinner-border-sm"></div>}
                                        {messages.Delete}
                                    </button>
                                </div>
                            </>
                        )}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-auto">
                    <MainMenu
                        folders={menuFolders}
                        menus={menus}
                        onSelect={onSelectMenu}
                        selectedFolder={selectedFolder}
                        selectedMenu={selectedMenu}
                        activeItem={activeItem}
                        light={theme === "mui-light"}
                        dark={theme !== "mui-light"}
                    />
                </div>
            </div>
        </>
    );
}
