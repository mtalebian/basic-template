import { useField } from "formik";
import React from "react";
import * as bd from "react-basic-design";
import { FormRow } from "./form-row";

export const FormikToggle = ({
    toggleLabel,
    label,
    labelSize,
    controlLabel,
    id,
    className,
    width,
    maxWidth,
    style,
    readOnly,
    ...props
}) => {
    let [field, , helper] = useField({ ...props });

    if (label && id === undefined) id = props.name;

    var inp = (
        <bd.Toggle
            id={id}
            label={toggleLabel}
            model={!!field.value}
            setModel={!readOnly && helper.setValue}
            {...props}
            color="primary"
            readOnly={readOnly}
        />
    );

    if (label === null || label === undefined) {
        if (className || style || maxWidth || width)
            inp = (
                <div className={className} style={{ ...style, maxWidth, width }}>
                    {inp}
                </div>
            );
        return inp;
    }
    return (
        <FormRow label={label} labelSize={labelSize} htmlFor={id} className={className} style={{ ...style, maxWidth, width }}>
            <div style={{ margin: -3 }}>{inp}</div>
        </FormRow>
    );
};
