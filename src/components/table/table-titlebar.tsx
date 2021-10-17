import React, { ReactNode, useState } from "react";
import { InputGroup, Modal, TabContainer, TabContent, TabPane } from "react-bootstrap";
import * as icons from "../../assets/icons";
import * as bd from "react-basic-design";
import { useTranslation } from "react-i18next";

interface TableTitlebarProps {
    tableApi?: any;
    title?: string;
    color?: "" | "primary" | "secondary";
    buttons?: ReactNode;
    fixed?: boolean;
    expanded?: boolean;
    children?: any;
    [x: string]: any;
}

export function TableTitlebar({ tableApi, title, color, fixed, expanded, buttons, children, ...props }: TableTitlebarProps) {
    const [showSettings, setShowSettings] = useState(false);

    return (
        <>
            <bd.Panel
                title={title}
                size="md"
                fixed={fixed}
                expanded={expanded}
                controls={
                    <>
                        {buttons}
                        <input
                            className="form-control py-1 "
                            value={tableApi.state.globalFilter || ""}
                            onChange={(e) => tableApi.setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                        />

                        <bd.Button variant="icon" color={color} size="md" edge="end" onClick={() => setShowSettings(true)}>
                            <icons.Settings />
                        </bd.Button>
                    </>
                }
            >
                {children}
            </bd.Panel>
            <SettingsDialog show={showSettings} setShow={setShowSettings} tableApi={tableApi} />
        </>
    );
}

function SettingsDialog({ show, setShow, tableApi }: any) {
    const { t } = useTranslation();
    const columns = tableApi.columns.filter((x: any) => !!x.accessor);

    return (
        <Modal show={show} fullscreen="md-down" onHide={() => setShow(false)}>
            <div className="shadow-10">
                <Modal.Header closeButton>
                    <Modal.Title>{t("table-settings")}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <TabContainer defaultActiveKey="columns">
                        <div className="border-bottom">
                            <div>
                                <bd.TabStrip>
                                    <bd.TabStripItem eventKey="columns">Columns</bd.TabStripItem>
                                    <bd.TabStripItem eventKey="groups">Groups</bd.TabStripItem>
                                </bd.TabStrip>
                            </div>
                        </div>

                        <div>
                            <TabContent>
                                <TabPane eventKey="columns" className="px-2">
                                    <div className="text-center pt-2">
                                        <bd.Button
                                            variant="text"
                                            color="primary"
                                            onClick={() => columns.forEach((x: any) => x.toggleHidden(false))}
                                        >
                                            <icons.DoneAll />
                                            {t("check-all")}
                                        </bd.Button>
                                        <bd.Button
                                            variant="text"
                                            color="primary"
                                            onClick={() => columns.forEach((x: any) => x.toggleHidden(true))}
                                        >
                                            <icons.CheckBoxOutlineBlank />
                                            {t("uncheck-all")}
                                        </bd.Button>
                                    </div>

                                    <bd.List dense variant="menu" className="border-0 m-0">
                                        {columns.map((x: any) => (
                                            <bd.ListItem
                                                key={x.id}
                                                primary={x.Header}
                                                controls={<bd.Toggle color="primary" model={x.isVisible} />}
                                                onClick={() => x.toggleHidden()}
                                            />
                                        ))}
                                    </bd.List>
                                </TabPane>

                                <TabPane eventKey="groups" className="px-2">
                                    <div className="row gx-1">
                                        <div className="col-6">
                                            <bd.List dense variant="menu" className="border-0 m-0">
                                                <bd.ListItem variant="text" primary={t("all-columns")} className="fw-bold" />
                                                {columns.map((x: any) => (
                                                    <bd.ListItem
                                                        variant={x.canGroupBy && !x.isGrouped ? "menu" : "text"}
                                                        key={x.id}
                                                        icon={<icons.Functions />}
                                                        primary={x.Header}
                                                        style={!x.canGroupBy || x.isGrouped ? { opacity: 0.5 } : {}}
                                                        onClick={() => (x.canGroupBy && !x.isGrouped ? tableApi.toggleGroupBy(x.id) : null)}
                                                    />
                                                ))}
                                            </bd.List>
                                        </div>
                                        <div className="col-6">
                                            <bd.List dense variant="menu" className="border-0 m-0">
                                                <bd.ListItem variant="text" primary={t("selected-columns")} className="fw-bold" />
                                                {columns
                                                    .filter((x: any) => x.isGrouped)
                                                    .map((x: any) => (
                                                        <bd.ListItem
                                                            key={x.id}
                                                            icon={<icons.Delete />}
                                                            primary={x.Header}
                                                            onClick={() => tableApi.toggleGroupBy(x.id)}
                                                        />
                                                    ))}
                                            </bd.List>
                                        </div>
                                    </div>
                                </TabPane>
                            </TabContent>
                        </div>
                    </TabContainer>
                </Modal.Body>
            </div>
        </Modal>
    );
}
