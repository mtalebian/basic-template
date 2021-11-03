import classNames from "classnames";
import { useField } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { FormRow } from "./form-row";
import * as icons from "../../assets/icons";

export const FormikInput = ({
    trace,
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
    const isLabel = type === "label";
    const inputRef = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let [field, meta, helper] = useField({ ...props, type });

    //if (!field.value) field.value = "";

    if (!type) type = "text";
    if (!autoComplete) autoComplete = "off";
    if (label && id === undefined) id = props.name;

    const buttons = [];
    if (buttonIcon) buttons.push({ icon: buttonIcon, action: buttonOnClick, isBtn: true });
    if (menu) buttons.push({ icon: <icons.ArrowDropDown />, action: onToggleDropDown, isBtn: !isSelect });

    const cnInput = classNames("form-control", inputClassName, {
        "has-1-btn": buttons.length === 1,
        "has-2-btn": buttons.length === 2,
        "cur-default": type === "label" || isSelect,
        "form-input-label": type === "label",
        "form-readonly": readOnly,
        "bd-border-error": meta.error,
    });

    function onKeyDown(e) {
        const UP = 38;
        const LEFT = 37;
        const RIGHT = 39;
        const DOWN = 40;
        const ENTER = 13;

        if (!readOnly && isSelect && Array.isArray(menu)) {
            if (e.keyCode === ENTER) {
                onToggleDropDown();
                return;
            }
            let delta = e.keyCode === UP ? -1 : e.keyCode === DOWN ? 1 : 0;
            let idx = selectedItemIndex + delta;
            if (idx >= 0 && idx < menu.length) helper.setValue(getValue(menu[idx]));
        }
    }

    function onToggleDropDown() {
        var is_open = !isMenuOpen;
        if (is_open && onOpeningMenu) onOpeningMenu();
        setIsMenuOpen(is_open);
        if (inputRef.current) inputRef.current.focus();
    }

    const getValue = (item) => (typeof item !== "object" ? item : "id" in item ? item["id"] : "code" in item ? item["code"] : item);
    const getText = (item) => (typeof item !== "object" ? item : "title" in item ? item["title"] : item);
    const selectedItemIndex = !Array.isArray(menu) ? -1 : menu.findIndex((x) => field.value === getValue(x));

    if (isSelect && Array.isArray(menu)) {
        var value = field.value;
        var item = menu.find((x) => value === getValue(x));
        field = { value: !item ? "" : getText(item), onKeyDown };
    }

    const selectItem = (item) => {
        if (!readOnly) helper.setValue(getValue(item));
        if (inputRef.current) inputRef.current.focus();
    };

    function buildMenu() {
        if (readOnly || isLabel) return null;
        if (menu && Array.isArray(menu) && menu.length > 0 && !React.isValidElement(menu[0]))
            return menu.map((x, xIndex) => (
                <div
                    key={getValue(x)}
                    className={classNames("bd-dropdown-item", { active: xIndex === selectedItemIndex })}
                    onClick={(e) => selectItem(x)}
                >
                    {getText(x)}
                </div>
            ));
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

    if (isLabel) {
        type = "text";
        readOnly = true;
    }

    if (isSelect) {
        type = "text";
        field["onClick"] = onToggleDropDown;
    }

    var inp = (
        <div className="bd-input">
            {buttons.map((x, index) => (
                <span key={index} className={"icon1 size-md " + (x.isBtn ? "icon-btn" : "cur-default")} onClick={x.action}>
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

    if (trace) {
        //console.log("> FormikInput > i:", selectedItemIndex, "v:", field.value);
    }

    if (label === null || label === undefined) return inp;
    return (
        <FormRow label={label} labelSize={labelSize} htmlFor={id} className={className} style={{ ...style, maxWidth, width }}>
            {inp}
        </FormRow>
    );
};
