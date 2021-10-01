import React from "react";
import accountManager from "../../../app/account-manager";
import * as bs from "react-basic-design";
import settings from "../../../app/settings";

export default function StartupApp() {
    function GotoSysMenu() {
        window.location = accountManager.isLoggedin() ? "/home" : "/login";
    }

    return (
        <>
            <div
                className="landing"
                style={{
                    backgroundImage: "url(/images/bg/bg1.jpg)",
                    backgroundSize: "cover",
                }}
            >
                <bs.AppBar color="inherit" shadow={0} className="border-bottom shadow-0" style={{ backgroundColor: "transparent" }}>
                    <div className="container">
                        <bs.Toolbar>
                            <img
                                src="/images/logo/logo.png"
                                alt="logo"
                                style={{
                                    fontSize: "2.2rem",
                                    width: "1em",
                                    height: "1em",
                                }}
                            />

                            <h5 className="appbar-title">{settings.title}</h5>
                        </bs.Toolbar>
                    </div>
                </bs.AppBar>

                <div className="container">
                    <section
                        className="banner py-5 px-30"
                        style={{
                            maxWidth: 1000,
                            minHeight: 500,
                            fontSize: "1.15rem",
                        }}
                    >
                        <div className="row">
                            <p className="col-lg-8">
                                <h2>Welcome</h2>
                                We can help you to boost engagement with your visitors by ensuring that people have access to the information that
                                they. A business concept is a statement that describes the reach and reason of existence of a given business idea.
                            </p>
                            <p className="col-lg-4 pt-5 text-center">
                                <bs.Button color="primary" onClick={GotoSysMenu}>
                                    Start Project
                                </bs.Button>
                            </p>
                        </div>
                    </section>
                </div>
            </div>

            <div className="features py-5">
                <section className="container">
                    <h2>FAQ</h2>
                    <p>
                        <h3>#1: What are you doing?</h3>
                        <br />
                        Sample text. Click to select the text box. Click again or double click to start editing the text.
                    </p>

                    <p>
                        <h3>#2: What is your product features?</h3>
                        <br />
                        Sample text. Click to select the text box. Click again or double click to start editing the text.
                    </p>
                </section>
            </div>

            <footer className="page-footer">
                <section className="container">
                    <ul className="links">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/#about">About us</a>
                        </li>
                        <li>
                            <a href="/#contact">Contact us</a>
                        </li>
                    </ul>
                    <p>&copy; 2021 All rights reserved for my componay</p>
                </section>
            </footer>
        </>
    );
}
