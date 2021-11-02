import classNames from "classnames";
import { useField } from "formik";
import React, { useEffect, useState } from "react";
import { FormRow } from "./form-row";
import * as icons from "../../assets/icons";

export const FormikInput = ({
    label,
    labelSize,

    id,
    type,
    inputClassName,
    autoComplete,

    buttonIcon,
    buttonOnClick,

    menu,
    onOpeningMenu,

    className,
    width,
    maxWidth,
    style,
    ...props
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [field, meta, helper] = useField({ ...props, type });
    if (!field.value) field.value = "";

    if (!type) type = "text";
    if (!autoComplete) autoComplete = "off";
    if (label && id === undefined) id = props.name;

    const buttons = [];
    if (buttonIcon) buttons.push({ icon: buttonIcon, action: buttonOnClick });
    if (menu) buttons.push({ icon: <icons.ArrowDropDown />, action: onToggleDropDown });

    const cnInput = classNames("form-control", inputClassName, {
        "has-1-icon": buttons.length === 1,
        "has-2-icon": buttons.length === 2,
        "cur-default": type === "label" || type === "combobox",
        "form-readonly": type === "label" || props.readOnly,
        "bd-border-error": meta.error,
    });

    function onToggleDropDown(e) {
        var is_open = !isMenuOpen;
        if (is_open && onOpeningMenu) onOpeningMenu();
        setIsMenuOpen(is_open);
    }

    const getValue = (item) => (typeof item !== "object" ? item : "id" in item ? item["id"] : "code" in item ? item["code"] : item);
    const getText = (item) => (typeof item !== "object" ? item : "title" in item ? item["title"] : item);

    function buildMenu() {
        if (menu && Array.isArray(menu))
            return menu.map((x) =>
                React.isValidElement(x) ? (
                    x
                ) : (
                    <div key={getValue(x)} className="bd-dropdown-item" onClick={(e) => !props.readOnly && helper.setValue(getValue(x))}>
                        {getText(x)}
                    </div>
                )
            );
        return menu;
    }

    const close = () => isMenuOpen && setIsMenuOpen(false);

    useEffect(() => {
        if (!isMenuOpen) return;
        window.addEventListener("click", close);
        return () => {
            window.removeEventListener("click", close);
        };
    });

    if (type === "label") {
        type = "text";
        props["readOnly"] = true;
    }
    if (type === "combobox") {
        type = "text";
        props["readOnly"] = true;
    }

    var inp = (
        <div className="bd-input">
            {buttons.map((x) => (
                <span className="icon1 size-md" onClick={x.action}>
                    {x.icon}
                </span>
            ))}

            <input id={id} type={type} className={cnInput} autoComplete={autoComplete} title={meta.error} {...field} {...props} />

            {isMenuOpen && menu && <div className="bd-dropdown-menu">{buildMenu()}</div>}
        </div>
    );

    if (label === null || label === undefined) return inp;
    return (
        <FormRow label={label} labelSize={labelSize} htmlFor={id} className={className} style={{ ...style, maxWidth, width }}>
            {inp}
        </FormRow>
    );
};
