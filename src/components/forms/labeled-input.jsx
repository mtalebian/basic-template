import classNames from "classnames";
import { useField } from "formik";
import React from "react";

export const LabeledInput = ({
    id,
    className,
    label,
    labelSize,
    labelClassName,
    btnIcon,
    onBtnClick,
    type,
    inputClassName,
    autoComplete,
    maxWidth,
    ...props
}) => {
    const [field, meta] = useField({ ...props, type });
    if (!field.value) field.value = "";
    if (!type) type = "text";
    if (!autoComplete) autoComplete = "off";
    if (label && id === undefined) id = props.name;

    let style = props.style;
    if (maxWidth > 0) style = { ...style, maxWidth };

    //////////
    const cnInput = classNames("form-control densed", inputClassName, {
        "has-icon": btnIcon,
        "bd-border-error": meta.error,
    });

    const lbl = (
        <label className="form-label" htmlFor={id}>
            {label}
            {meta.touched && meta.error ? <span className={"bd-error p-1"}>*</span> : null}
        </label>
    );

    //const inp = <Input className={inputClassName} icon={icon} btnIcon={btnIcon} />;
    const inp = (
        <div className="bd-input">
            {btnIcon && (
                <span className="icon size-md" onClick={onBtnClick}>
                    {btnIcon}
                </span>
            )}
            <input
                id={id}
                type={type}
                className={cnInput}
                autoComplete={autoComplete}
                title={meta.error}
                {...field}
                {...props}
                style={style}
            />
        </div>
    );

    return (
        <div className="d-flex">
            <div className={className}>
                {lbl}
                {inp}
            </div>
        </div>
    );
};
