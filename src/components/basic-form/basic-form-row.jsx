import classNames from "classnames";
import React from "react";

export const BasicFormRow = ({ label, labelSize, htmlFor, children }) => {
    const break_point = typeof labelSize !== "string" ? "md" : labelSize.startsWith("lg") ? "lg" : labelSize.startsWith("xl") ? "xl" : "md";
    labelSize = typeof labelSize !== "string" || labelSize.indexOf("-") === -1 ? labelSize * 1 : labelSize.split("-")[1] * 1;

    var cn = classNames("mb-3", { "row gx-3": labelSize });
    var cnLabel = classNames("form-label", {
        [`text-start text-${break_point}-end col-form-label col-12 col-${break_point}-${labelSize}`]: labelSize,
    });

    let field_comp = children;
    if (labelSize > 0) field_comp = <div className={classNames(`col-12 col-${break_point}-${12 - labelSize}`)}>{field_comp}</div>;

    return (
        <div className={cn}>
            <label className={cnLabel} htmlFor={htmlFor}>
                {label}
            </label>
            {field_comp}
        </div>
    );
};
