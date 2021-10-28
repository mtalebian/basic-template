import React from "react";
import * as bd from "react-basic-design";
import * as bd2 from "../../components/forms";
import { Text } from "../../components/basic/text";
import { Filter } from "./filter";

export const FilterBox = ({ variants, fields, systemIsBusy, onExecute, ...props }) => {
    const variantsMenu = (
        <bd.Menu>
            <div style={{ minWidth: 300 }}>
                {variants &&
                    variants.map((x) => (
                        <bd.MenuItem key={x.title} onClick={() => applyVariant(x)}>
                            {x.title}
                        </bd.MenuItem>
                    ))}
                <div className="text-end px-2 pt-2 border-top mt-2">
                    <bd.Button color="primary" className="m-s-2" variant="text">
                        <Text>manage</Text>
                    </bd.Button>
                    <bd.Button color="primary">
                        <Text>save</Text>
                    </bd.Button>
                </div>
            </div>
        </bd.Menu>
    );
    const applyVariant = (variant) => {
        alert("applyVariant: \r\n" + JSON.stringify(variant, null, 2));
    };

    const onBlur = (filter) => {
        console.log("onBlur: \r\n" + JSON.stringify(filter, null, 2));
    };

    return (
        <div>
            <bd.Toolbar>
                <bd.Button
                    variant="text"
                    className="btn-lg p-s-0 bg-transparent edge-start"
                    color="primary"
                    menu={variantsMenu}
                    disableRipple
                >
                    Standard
                </bd.Button>

                <div className="flex-grow-1"></div>

                <bd.Button color="primary" size="md" disabled={systemIsBusy} className="m-e-2" onClick={(e) => onExecute()}>
                    <Text>apply-filter</Text>
                </bd.Button>

                <bd.Button variant="outline" color="primary" size="md" disabled={systemIsBusy}>
                    <Text>filters</Text>
                </bd.Button>
            </bd.Toolbar>

            <bd2.Form className="mx-2">
                {fields.map((x) => (
                    <Filter key={x.title} title={x.title} onBlur={(e) => onBlur(x)} />
                ))}
            </bd2.Form>
        </div>
    );
};
