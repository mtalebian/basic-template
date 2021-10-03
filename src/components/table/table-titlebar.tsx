import React, { MutableRefObject, ReactNode, useState } from "react";
import { InputGroup, Modal, TabContainer, TabContent, TabPane } from "react-bootstrap";
import * as icons from "../../assets/icons";
import * as bd from "react-basic-design";

interface TableTitlebarProps {
    tableRef?: MutableRefObject<any>;
    title?: string;
    color?: "" | "primary" | "secondary";
    buttons?: ReactNode;
    fixed?: boolean;
    expanded?: boolean;
    children?: any;
    [x: string]: any;
}

export function TableTitlebar({ tableRef, title, color, fixed, expanded, buttons, children, ...props }: TableTitlebarProps) {
    const [showSettings, setShowSettings] = useState(false);
    const [globalFilter, setGlobalFilter] = useState("");

    return (
        <>
            <bd.Panel
                title={title}
                size="md"
                fixed={fixed}
                expanded={expanded}
                buttons={
                    <>
                        {buttons}

                        <InputGroup className="mx-1" style={{ width: 200, height: "auto", minHeight: "auto" }}>
                            <input
                                className="form-control py-1 "
                                value={globalFilter || ""}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                placeholder="Search..."
                            />

                            <bd.Button
                                variant="flat"
                                size="md"
                                color="default"
                                onClick={(e) => {}}
                                style={{ height: "auto" }}
                                className="py-0 px-2 border"
                            >
                                <icons.Search />
                            </bd.Button>
                        </InputGroup>

                        <bd.Button variant="icon" color={color} size="md" edge="end" onClick={() => setShowSettings(true)}>
                            <icons.Settings />
                        </bd.Button>
                    </>
                }
            >
                {children}
            </bd.Panel>
            <SettingsDialog show={showSettings} setShow={setShowSettings} tableRef={tableRef} />
        </>
    );
}

export function GlobalFilter({ filter, setFilter, ...props }: any) {
    return <input type="text" value={filter || ""} onChange={(e) => setFilter(e.target.value)} {...props} />;
}

function SettingsDialog({ show, setShow, tableRef }: any) {
    return (
        <Modal show={show} fullscreen="md-down" onHide={() => setShow(false)}>
            <div className="shadow-10">
                <Modal.Header closeButton>
                    <Modal.Title>View Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 shadow-3">
                    <TabContainer defaultActiveKey="b">
                        <bd.Card>
                            <bd.AppBar color="default">
                                <div>
                                    <bd.TabStrip>
                                        <bd.TabStripItem eventKey="columns">Columns</bd.TabStripItem>
                                        <bd.TabStripItem eventKey="filters">Filters</bd.TabStripItem>
                                        <bd.TabStripItem eventKey="groups">Groups</bd.TabStripItem>
                                    </bd.TabStrip>
                                </div>
                            </bd.AppBar>
                            <bd.CardBody>
                                <TabContent>
                                    <TabPane eventKey="columns">Columns</TabPane>
                                    <TabPane eventKey="filters">Filters</TabPane>
                                    <TabPane eventKey="groups">Groups</TabPane>
                                </TabContent>
                            </bd.CardBody>
                        </bd.Card>
                    </TabContainer>
                </Modal.Body>
            </div>
        </Modal>
    );
}
