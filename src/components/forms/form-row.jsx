import classNames from "classnames";
import React from "react";

export const FormRow = ({ label, labelSize, htmlFor, className, children, ...props }) => {
    const break_point = typeof labelSize !== "string" ? "md" : labelSize.startsWith("lg") ? "lg" : labelSize.startsWith("xl") ? "xl" : "md";
    labelSize = typeof labelSize !== "string" || labelSize.indexOf("-") === -1 ? labelSize : labelSize.split("-")[1];
    labelSize = labelSize * 1;
    var lb_is_nothing = label === undefined || label === null;
    var cn = classNames("bd-form-row", className, { "row gx-3": labelSize });
    var cnLabel = classNames("form-label", {
        [`text-start text-${break_point}-end col-form-label col-12 col-${break_point}-${labelSize}`]: labelSize,
        [`d-block`]: !label,
    });

    let field_comp = children;
    if (labelSize > 0) field_comp = <div className={classNames(`col-12 col-${break_point}-${12 - labelSize}`)}>{field_comp}</div>;

    return (
        <>
            <div className={cn} {...props}>
                {!lb_is_nothing && (
                    <label className={cnLabel} htmlFor={htmlFor}>
                        {label === "" ? <>&nbsp;</> : label}
                    </label>
                )}
                {field_comp}
            </div>
        </>
    );
};
