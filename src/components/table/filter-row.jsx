import React from "react";
import * as bd from "react-basic-design";

export const FilterRow = ({ label, labelSize }) => {
    return (
        <>
            <bd.FormRow label={label} labelSize={labelSize}>
                <input className="form-control" />
            </bd.FormRow>
        </>
    );
};
