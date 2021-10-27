import React from "react";
import * as icons from "../../assets/icons";
import * as bd2 from "../../components/forms";

export const Filter = ({ title, onBlur, ...props }) => {
    return (
        <div className="bd-filter">
            <bd2.FormInput label={title} btnIcon={<icons.OpenInNew />} onBtnClick={() => alert("ccc")} />
        </div>
    );
};
