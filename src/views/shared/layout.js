import React, { useState } from "react";
import * as bs from "react-basic-design";
import { Offcanvas } from "react-bootstrap";
import "./index.scss";

const menuMore = (
    <bs.Menu className="mt-n5 shadow-4 border-0">
        <bs.MenuItem>User Profige</bs.MenuItem>
        <bs.MenuItem>Settings</bs.MenuItem>
        <bs.MenuItem>Logout</bs.MenuItem>
    </bs.Menu>
);

export function Layout({ mainContent, sidebarContent }) {
    const [show, setShow] = useState(false);
    const onShow = () => setShow(true);
    const onHide = () => setShow(false);

    return (
        <>
            <div className="layout has-sidebar">
                <aside className="layout-sidebar">{sidebarContent}</aside>

                <main className="layout">
                    <bs.AppBar color="primary">
                        <bs.Toolbar>
                            <bs.Button color="inherit" edge="start" variant="icon" onClick={onShow}>
                                <icons.Menu />
                            </bs.Button>

                            <h5 className="appbar-title">My Application</h5>

                            <bs.Button color="inherit" variant="icon">
                                <icons.Search />
                            </bs.Button>

                            <bs.Button color="inherit" variant="icon">
                                <icons.AccountCircle />
                            </bs.Button>

                            <bs.Button variant="icon" align="start" color="inherit" edge="end" menu={menuMore}>
                                <icons.MoreVert />
                            </bs.Button>
                        </bs.Toolbar>
                    </bs.AppBar>
                    {mainContent}
                </main>
            </div>

            <div className="notif-container"></div>

            <Offcanvas show={show} onHide={onHide} placement="end" id="offcanvas-sidebar">
                {/*<Offcanvas.Header closeButton className="align-items-start"><Offcanvas.Title></Offcanvas.Title></Offcanvas.Header>*/}
                <Offcanvas.Body>{sidebarContent}</Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
