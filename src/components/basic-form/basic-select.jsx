import classNames from "classnames";
import { ErrorMessage, Field } from "formik";
import React from "react";

export const BasicSelect = ({ label, name, type, size, labelClassName, ...props }) => {
    var cn = classNames("basic-input");
    var cnLabel = classNames(labelClassName);

    if (!type) type = "text";

    return (
        <div className={cn}>
            <label className={cnLabel} htmlFor={name}>
                {label}
            </label>
            <Field name={name} type={type} {...props} />
            <ErrorMessage name={name} />
        </div>
    );
};
