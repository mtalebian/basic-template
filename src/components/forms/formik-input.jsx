import classNames from "classnames";
import { useField } from "formik";
import React, { useEffect, useRef, useState } from "react";
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

    readOnly,
    ...props
}) => {
    const isSelect = type === "select";
    const inputRef = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [field, meta, helper] = useField({ ...props, type });
    if (!field.value) field.value = "";

    if (!type) type = "text";
    if (!autoComplete) autoComplete = "off";
    if (label && id === undefined) id = props.name;

    const buttons = [];
    if (buttonIcon) buttons.push({ icon: buttonIcon, action: buttonOnClick, isBtn: true });
    if (menu) buttons.push({ icon: <icons.ArrowDropDown />, action: onToggleDropDown, isBtn: !isSelect });

    const cnInput = classNames("form-control", inputClassName, {
        "has-1-icon": buttons.length === 1,
        "has-2-icon": buttons.length === 2,
        "cur-default": type === "label" || isSelect,
        "form-readonly": type === "label" || readOnly,
        "bd-border-error": meta.error,
    });

    function onToggleDropDown(e) {
        var is_open = !isMenuOpen;
        if (is_open && onOpeningMenu) onOpeningMenu();
        setIsMenuOpen(is_open);
    }

    const getValue = (item) => (typeof item !== "object" ? item : "id" in item ? item["id"] : "code" in item ? item["code"] : item);
    const getText = (item) => (typeof item !== "object" ? item : "title" in item ? item["title"] : item);
    const selectItem = (item) => {
        if (!readOnly) helper.setValue(getValue(item));
        if (inputRef.current) inputRef.current.focus();
    };

    function buildMenu() {
        if (menu && Array.isArray(menu))
            return menu.map((x) =>
                React.isValidElement(x) ? (
                    x
                ) : (
                    <div key={getValue(x)} className="bd-dropdown-item" onClick={(e) => selectItem(x)}>
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
        readOnly = true;
    }
    if (isSelect) {
        type = "text";
        field["onClick"] = onToggleDropDown;
    }

    var inp = (
        <div className="bd-input">
            {buttons.map((x) => (
                <span className={"icon1 size-md " + (x.isBtn ? "icon-btn" : "cur-default")} onClick={x.action}>
                    {x.icon}
                </span>
            ))}

            <input
                id={id}
                ref={inputRef}
                type={type}
                className={cnInput}
                autoComplete={autoComplete}
                title={meta.error}
                {...field}
                {...props}
                readOnly={readOnly || isSelect}
            />

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
