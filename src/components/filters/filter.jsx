import React from "react";
import * as icons from "../../assets/icons";
import * as bd from "react-basic-design";
import { FormRow } from "../forms/form-row";
import { FormInput } from "../forms";

export const Filter = ({ label, labelSize, width, className, onBlur, ...props }) => {
    return (
        // <div className="bd-filter">
        //     <bd2.FormInput label={label} btnIcon={<icons.OpenInNew />} onBtnClick={() => alert("ccc")} {...props} />
        // </div>
        <FormInput
            label={label}
            labelSize={labelSize}
            button1={{
                icon: <icons.OpenInNew />,
                action: () => alert("ccc"),
            }}
            button2={{
                icon: <icons.ArrowDropDown />,
                action: () => alert("ccc"),
            }}
            inputClassName={className}
            onBtnClick={() => alert("ccc")}
            {...props}
            width={width}
        />
    );
};
