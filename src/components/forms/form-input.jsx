import classNames from "classnames";
import { useField } from "formik";
import React from "react";
import * as bd from "react-basic-design";
import { Dropdown } from "react-bootstrap";
import { FormRow } from "./form-row";

export const FormInput = ({
    label,
    labelSize,

    id,
    button1,
    button2,
    type,
    inputClassName,
    autoComplete,

    menu,

    className,
    width,
    maxWidth,
    style,
    ...props
}) => {
    const [field, meta] = useField({ ...props, type });
    if (!field.value) field.value = "";
    if (!type) type = "text";
    if (!autoComplete) autoComplete = "off";

    const cnInput = classNames("form-control", inputClassName, {
        "has-icon": button1 && !button2,
        "has-2-icon": button2,
        "bd-border-error": meta.error,
    });

    if (label && id === undefined) id = props.name;

    var inp = (
        <div className="bd-input">
            {button1 && (
                <span className="icon1 size-md" onClick={button1.action}>
                    {button1.icon}
                </span>
            )}
            {button2 && (
                <span className="icon2 size-md" onClick={button2.action}>
                    {button2.icon}
                </span>
            )}
            <input id={id} type={type} className={cnInput} autoComplete={autoComplete} title={meta.error} {...field} {...props} />
        </div>
    );

    // inp = (
    //     <Dropdown>
    //         <Dropdown.Toggle variant="success" id="dropdown-basic">
    //             Dropdown Button
    //         </Dropdown.Toggle>

    //         <Dropdown.Menu>
    //             <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    //             <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    //             <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    //         </Dropdown.Menu>
    //     </Dropdown>
    // );

    if (label === null || label === undefined) return inp;
    return (
        <FormRow label={label} labelSize={labelSize} htmlFor={id} className={className} style={{ ...style, maxWidth, width }}>
            {inp}
        </FormRow>
    );
};
