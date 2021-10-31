import classNames from "classnames";
import { useField } from "formik";
import React from "react";
import * as bd from "react-basic-design";

export const FormInput = ({
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
    var cnControl = classNames("form-control", inputClassName, {
        "bd-border-error": meta.error,
    });
    var cnErorr = "bd-error";
    if (!type) type = "text";
    if (!autoComplete) autoComplete = "off";
    if (label && id === undefined) id = props.name;

    let style = props.style;
    if (maxWidth > 0) {
        style = { ...style, maxWidth };
    }

    let field_comp = (
        <>
            <input id={id} type={type} className={cnControl} {...field} autoComplete={autoComplete} {...props} style={style} />
            {meta.touched && meta.error ? <div className={cnErorr}>{`${meta.error}`}</div> : null}
        </>
    );

    return label === undefined ? (
        field_comp
    ) : (
        <bd.FormRow label={label} labelSize={labelSize} htmlFor={id} className={className}>
            {field_comp}
        </bd.FormRow>
    );

    //////////
    const cnInput = classNames("form-control", { "has-icon": btnIcon });
    const lbl = <label className="form-label">{label}</label>;
    //const inp = <Input className={inputClassName} icon={icon} btnIcon={btnIcon} />;
    const inp = (
        <div className="bd-input">
            {btnIcon && (
                <span className="icon size-md" onClick={onBtnClick}>
                    {btnIcon}
                </span>
            )}
            <input className={cnInput} type="text" />
        </div>
    );
    return (
        <div className={classNames(className, "bd-form-input")} {...props}>
            {lbl}
            {inp}
        </div>
    );
    /*
    
    

    return label === undefined ? (
        field_comp
    ) : (
        <bd.FormRow label={label} labelSize={labelSize} htmlFor={id} className={className}>
            {field_comp}
        </bd.FormRow>
    );
    
*/
};
