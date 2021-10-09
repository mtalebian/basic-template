import React, { useState, useEffect } from "react";
import * as bs from "react-basic-design";

import accountManager from "../../../app/account-manager";

import "./index.scss";
import classNames from "classnames";
import { tableDesignerApi } from "../../../api/table-designer-api";
import SvgArrowBackIos from "../../../assets/icons/ArrowBackIos";
import SvgFolder from "../../../assets/icons/Folder";
import SvgEdit from "../../../assets/icons/Edit";
import SvgInsertDriveFile from "../../../assets/icons/InsertDriveFile";

export function FormDesignerApp() {
    const [group, setGroup] = useState(null);
    const [form, setForm] = useState(null);

    function goBack() {
        setGroup(null);
        setForm(null);
    }

    function refresh() {
        goBack();
        tableDesignerApi.menu();
    }

    useEffect(
        () =>
            accountManager.status.onConnected(function () {
                refresh();
            }).remove
    );

    return (
        <>
            <bs.AppBar shadow={0} className="shadow-0 border-bottom">
                <div className="container">
                    <bs.Toolbar>
                        {(group || form) && (
                            <bs.Button variant="icon" onClick={goBack} size="md">
                                <SvgArrowBackIos />
                            </bs.Button>
                        )}
                        <h5 className="appbar-title">Form Designer</h5>

                        <bs.Button variant="icon">
                            <SvgFolder />
                        </bs.Button>
                    </bs.Toolbar>
                </div>
            </bs.AppBar>

            <div className={classNames("container", { "d-none": group || form })}>
                <ul className="tiles">
                    <li>
                        <h5>
                            Group 1
                            <bs.Button
                                variant="text"
                                size="sm"
                                className="mx-2"
                                color="secondary"
                                onClick={() => {
                                    setGroup({ title: "G1" });
                                    return false;
                                }}
                            >
                                <SvgEdit />
                                Edit Group
                            </bs.Button>
                            <bs.Button variant="text" size="sm" color="secondary">
                                <SvgInsertDriveFile />
                                New Form
                            </bs.Button>
                        </h5>
                        <ul>
                            <li>
                                <a
                                    href="#Form1"
                                    onClick={() => {
                                        setForm({ title: "Form 1" });
                                        return false;
                                    }}
                                >
                                    Form 1
                                </a>
                            </li>
                            <li>
                                <a href="#Form2">Form 2</a>
                            </li>
                            <li>
                                <a href="#Form3">Form 3</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h5>Group B</h5>
                        <ul>
                            <li>
                                <a href="/#">Form B-1</a>
                            </li>
                            <li>
                                <a href="/#">Form B-2</a>
                            </li>
                            <li>
                                <a href="/#">Form B-3</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            {group && <div className="container">Edit {group.title}</div>}

            {form && <div className="container">Edit {form.title}</div>}
        </>
    );
}
