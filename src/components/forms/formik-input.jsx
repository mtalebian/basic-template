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

    buttonTitle,
    buttonOnClick,

    items,

    menuTitle,
    menu,
    onOpeningMenu,

    className,
    width,
    maxWidth,
    style,

    readOnly,
    children,
    ...props
}) => {
    const isSelect = type === "select" || (!type && items);
    const isLabel = type === "label";
    const inputRef = useRef();
    const [isListOpen, setIsListOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let [field, meta, helper] = useField({ ...props, type });

    if (!type) type = "text";
    if (!autoComplete) autoComplete = "off";
    if (label && id === undefined) id = props.name;

    const buttons = [];
    if (buttonTitle) buttons.push({ icon: buttonTitle, action: buttonOnClick, isBtn: true });
    if (menuTitle) buttons.push({ icon: menuTitle, action: onToggleMenu, isBtn: !isSelect });
    if (items) buttons.push({ icon: <icons.ArrowDropDown />, action: onToggleList, isBtn: !isSelect });

    const cnInput = classNames("form-control", inputClassName, {
        "has-1-btn": buttons.length === 1,
        "has-2-btn": buttons.length === 2,
        "has-3-btn": buttons.length === 3,
        "cur-default": type === "label" || isSelect,
        "form-input-label": type === "label",
        "form-readonly": readOnly,
        "bd-border-error": meta.error,
    });

    function onKeyDown(e) {
        const UP = 38;
        const DOWN = 40;
        const ENTER = 13;

        if (!readOnly && Array.isArray(items)) {
            if (e.keyCode === ENTER) {
                onToggleList();
                return;
            }
            let delta = e.keyCode === UP ? -1 : e.keyCode === DOWN ? 1 : 0;
            if (delta !== 0) {
                let idx = selectedItemIndex + delta;
                if (idx >= 0 && idx < items.length) selectItem(items[idx]);
            }
        }
    }

    const getValue = (item) => (typeof item !== "object" ? item : "id" in item ? item["id"] : "code" in item ? item["code"] : item);
    const getText = (item) => (typeof item !== "object" ? item : "title" in item ? item["title"] : item);
    const selectedItemIndex = !Array.isArray(items) ? -1 : items.findIndex((x) => getValue(x) === field.value);

    function onToggleList() {
        if (isMenuOpen) setIsMenuOpen(false);
        var is_open = !isListOpen;
        setIsListOpen(is_open);
        inputRef.current?.focus();
    }

    function onToggleMenu() {
        if (isListOpen) setIsListOpen(false);
        var is_open = !isMenuOpen;
        if (is_open && onOpeningMenu) onOpeningMenu();
        setIsMenuOpen(is_open);
        inputRef.current?.focus();
    }

    function closeAll() {
        if (isListOpen) setIsListOpen(false);
        if (isMenuOpen) setIsMenuOpen(false);
    }

    if (isSelect && Array.isArray(items)) {
        var value = field.value;
        var item = items.find((x) => getValue(x) === value);
        field = { value: !item ? "" : getText(item) };
    }

    if (Array.isArray(items)) {
        field = { ...field, onKeyDown };
    }

    const selectItem = (item) => {
        if (!readOnly) helper.setValue(getValue(item));
        inputRef.current?.focus();
    };

    function buildList() {
        if (readOnly || isLabel) return null;
        if (Array.isArray(items))
            return items.map((x, xIndex) => (
                <div
                    key={getValue(x)}
                    className={classNames("bd-dropdown-item", { active: xIndex === selectedItemIndex })}
                    onClick={(e) => selectItem(x)}
                >
                    {getText(x)}
                </div>
            ));
        return items;
    }

    useEffect(() => {
        if (!isListOpen && !isMenuOpen) return;
        window.addEventListener("click", closeAll);
        return () => {
            window.removeEventListener("click", closeAll);
        };
    });

    if (isLabel) {
        type = "text";
        readOnly = true;
    }

    if (isSelect) {
        type = "text";
        field["onClick"] = onToggleList;
    }

    var inp = (
        <div className="bd-input">
            {buttons.map((x, index) => (
                <span key={index} className={`btn${index + 1} size-md ` + (x.isBtn ? "icon-btn" : "cur-default")} onClick={x.action}>
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

            {isListOpen && items && <div className="bd-dropdown-menu">{buildList()}</div>}
            {isMenuOpen && menu && <div className="bd-dropdown-menu">{menu}</div>}
        </div>
    );

    if (trace) {
        //console.log("> FormikInput > i:", selectedItemIndex, "v:", field.value);
    }

    if (label === null || label === undefined) return inp;
    return (
        <FormRow label={label} labelSize={labelSize} htmlFor={id} className={className} style={{ ...style, maxWidth, width }}>
            {inp}
            {children}
        </FormRow>
    );
};
