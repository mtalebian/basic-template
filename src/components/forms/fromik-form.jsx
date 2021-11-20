import React from "react";
import classNames from "classnames";
import { Form, Formik } from "formik";

export const FormikForm = ({
    initialValues,
    validationSchema,
    onSubmit,
    innerRef,
    validate,
    className,
    enableReinitialize,
    flex,
    compact,
    children,
}) => {
    return (
        <Formik
            initialValues={initialValues ?? {}}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={innerRef}
            validate={validate}
            enableReinitialize={enableReinitialize}
        >
            {(props) => (
                <Form
                    className={classNames(className, "bd-form", {
                        "bd-form-flex": flex,
                        "bd-form-compact": compact,
                    })}
                >
                    {typeof children === "function" ? children(props) : children}
                </Form>
            )}
        </Formik>
    );
};
