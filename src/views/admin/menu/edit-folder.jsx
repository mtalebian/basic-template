import React from "react";
import * as bd from "react-basic-design";

import * as icons from "../../../assets/icons";
import { menuApi } from "../../../api/menu-api";

export const EditFolder = ({ insertMode, onGoBack }) => {
    const title = insertMode ? "New Folder" : "Edit Folder";

    return (
        <>
            <bd.AppBar color position="sticky" style={{ zIndex: 10 }} shadow={0} className="shadow-0 border-bottom">
                <bd.Toolbar className="container">
                    <bd.Button variant="icon" size="md" onClick={() => onGoBack()}>
                        <icons.ArrowBackIos className="rtl-rotate-180" />
                    </bd.Button>

                    <h5 className="appbar-title">
                        <span className="text-secondary">{title}</span>
                    </h5>
                </bd.Toolbar>
            </bd.AppBar>
        </>
    );
};
