import classNames from "classnames";
import * as bd from "react-basic-design";
import { useField } from "formik";
import React from "react";

export const BasicSwitch = ({ id, label, labelSize, size, className, children, color, ...props }) => {
    const [field, meta] = useField({ ...props });
    const break_point = typeof labelSize !== "string" ? "md" : labelSize.startsWith("lg") ? "lg" : labelSize.startsWith("xl") ? "xl" : "md";
    labelSize = typeof labelSize !== "string" || labelSize.indexOf("-") === -1 ? labelSize * 1 : labelSize.split("-")[1] * 1;

    var cn = classNames("bd-input", { "row gx-3": labelSize });
    var cnLabel = classNames("form-label", {
        [`text-start text-${break_point}-end col-form-label col-12 col-${break_point}-${labelSize}`]: labelSize,
    });

    if (label && id === undefined) id = props.name;

    let field_comp = (
        <>
            <bd.Switch
                id={id}
                name={field.name}
                model={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                size={size ?? "sm"}
                color={color ?? "primary"}
                {...props}
            />
            {children}
            {meta.touched && meta.error ? <div className="bd-error">{meta.error}</div> : null}
        </>
    );

    if (labelSize > 0) field_comp = <div className={classNames(`col-12 col-${break_point}-${12 - labelSize}`)}>{field_comp}</div>;

    return (
        <>
            <div className={cn}>
                <label className={cnLabel} htmlFor={props.readOnly ? null : field.id || field.name}>
                    {label}
                </label>
                {field_comp}
            </div>
        </>
    );
};
