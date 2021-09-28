import React from "react";
import * as bs from "react-basic-design";

export function TablesApp() {
    return (
        <>
            <bs.AppBar shadow={0} className="shadow-0 border-bottom">
                <div className="container">
                    <bs.Toolbar>
                        <h5 className="appbar-title">Maintain tables</h5>
                    </bs.Toolbar>
                </div>
            </bs.AppBar>

            <div className="py-4">
                <div className="container">
                    <h5 className="text-secondary-text">Select a table ...</h5>
                </div>
            </div>
        </>
    );
}
