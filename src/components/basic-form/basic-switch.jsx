import React from "react";
import * as bd from "react-basic-design";
import { useField } from "formik";

export const BasicSwitch = ({ id, label, labelSize, size, className, children, color, ...props }) => {
    const [field, meta, helper] = useField({ ...props });

    if (label && id === undefined) id = props.name;

    let field_comp = (
        <>
            <bd.Switch
                id={id}
                name={field.name}
                model={field.value}
                setModel={!props.readOnly && helper.setValue}
                onBlur={field.onBlur}
                size={size ?? "sm"}
                color={color ?? "primary"}
                {...props}
            />
            {children}
            {meta.touched && meta.error ? <div className="bd-error">{meta.error}</div> : null}
        </>
    );

    return (
        <>
            <bd.FormRow label={label} labelSize={labelSize} htmlFor={id} className={className}>
                {field_comp}
            </bd.FormRow>
        </>
    );
};
