import classNames from "classnames";
import { ErrorMessage, Field } from "formik";
import React from "react";

export const BasicInput = ({ label, name, type, className, controlClassName, ...props }) => {
    var cn = classNames("basic-input", className);
    var cnLabel = "form-label";
    if (!type) type = "text";

    return (
        <>
            <div className={cn}>
                <label className={cnLabel} htmlFor={name}>
                    {label}
                </label>
                <Field name={name} type={type} {...props} />
                <ErrorMessage name={name} />
            </div>
        </>
    );
};
