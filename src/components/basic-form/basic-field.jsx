import classNames from "classnames";
import { ErrorMessage, Field } from "formik";
import React from "react";

export const BasicInput = ({ label, name, type, className, controlClassName, ...props }) => {
    var cn = classNames("basic-input", className);
    var cnLabel = "form-label mb-1";
    var cnControl = "form-control";
    var cnErorr = "text-danger mt-1";
    if (!type) type = "text";

    return (
        <>
            <div className={cn}>
                <label className={cnLabel} htmlFor={props.id || name}>
                    {label}
                </label>
                <Field name={name} type={type} className={cnControl} {...props} />
                <ErrorMessage component="div" className={cnErorr} name={name} />
            </div>
        </>
    );
};
