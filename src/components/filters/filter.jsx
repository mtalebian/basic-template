import React from "react";
import * as icons from "../../assets/icons";
import { FormikInput } from "../forms";

export const Filter = ({ label, labelSize, width, className, onBlur, ...props }) => {
    return (
        // <div className="bd-filter">
        //     <bd2.FormInput label={label} btnIcon={<FormikInput.OpenInNew />} onBtnClick={() => alert("ccc")} {...props} />
        // </div>
        <FormikInput
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
