import classNames from "classnames";
import { useField } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { FormRow } from "./form-row";
import * as icons from "../../assets/icons";

export const FormikInput = ({
    inputApi,
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
    multiSelect,
    showValues,
    filterable,
    autoGrow,

    menuTitle,
    menu,
    onOpeningMenu,

    className,
    width,
    maxWidth,
    style,
    onKeyDown,
    onClick,

    readOnly,
    ...props
}) => {
    const isSelect = type === "select" || (!type && items);
    const isLabel = type === "label";
    const inpRef = useRef();
    const [filter, setFilter] = useState();
    const [isListOpen, setIsListOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    if (inputApi) inputApi.current = { focus: () => inpRef.current?.focus(), getRef: () => inpRef.current };
    let [field, meta, helper] = useField({ ...props, type });
    let displayValue = field.value;

    if (!type) type = "text";
    if (!autoComplete) autoComplete = "off";
    if (label && id === undefined) id = props.name;

    const buttons = [];
    if (buttonTitle) buttons.push({ icon: buttonTitle, action: buttonOnClick, isBtn: true });
    if (menuTitle) buttons.push({ icon: menuTitle, action: onToggleMenu, isBtn: !isSelect });
    if (items) buttons.push({ icon: <icons.ArrowDropDown />, action: onToggleSelect, isBtn: !isSelect });

    const cnInput = classNames("form-control", inputClassName, {
        "has-1-btn": buttons.length === 1,
        "has-2-btn": buttons.length === 2,
        "has-3-btn": buttons.length === 3,
        "cur-default": type === "label" || isSelect,
        "form-input-label": type === "label",
        "form-readonly": readOnly,
        "bd-border-error": meta.error,
    });

    function onClickHandler(e) {
        if (onClick) onClick(e);
        if (isSelect) onToggleSelect(e);
    }

    function onKeyDownHandler(e) {
        const ESC = 27;
        const UP = 38;
        const DOWN = 40;
        const ENTER = 13;

        if (onKeyDown && onKeyDown(e, isMenuOpen) === false) return;
        if (readOnly || (!items && !menu)) return;

        switch (e.keyCode) {
            case ESC:
                stopEvent(e);
                closeAll();
                return false;

            case ENTER:
                stopEvent(e);
                if (!e?.shiftKey && !e?.ctrlKey) {
                    if (items) onToggleSelect();
                    else if (menu) onToggleMenu();
                }
                return false;

            case UP:
            case DOWN:
                stopEvent(e);
                if (!multiSelect && Array.isArray(items)) {
                    let delta = e.keyCode === UP ? -1 : 1;
                    let idx = selectedItemIndex + delta;
                    if (idx >= 0 && idx < items.length) selectItem(items[idx]);
                }
                return false;

            default:
                break;
        }
    }

    const getValue = (item) => (typeof item !== "object" ? item : "id" in item ? item["id"] : "code" in item ? item["code"] : item);
    const getText = (item) => (typeof item !== "object" ? item : "title" in item ? item["title"] : item);
    const getDisplayText = (item) => (showValues ? getValue(item) : getText(item));
    const selectedItemIndex = multiSelect || !Array.isArray(items) ? -1 : items.findIndex((x) => getValue(x) === field.value);

    function onToggleSelect(e) {
        //stopEvent(e);
        //if (isMenuOpen) setIsMenuOpen(false);
        setTimeout(() => {
            setIsListOpen(!isListOpen);
            setFilter("");
            inpRef.current?.focus();
        }, 0);
    }

    function onToggleMenu(e) {
        //stopEvent(e);
        //if (isListOpen) setIsListOpen(false);
        setTimeout(() => {
            var is_open = !isMenuOpen;
            if (is_open && onOpeningMenu) onOpeningMenu();
            setIsMenuOpen(is_open);
            inpRef.current?.focus();
        }, 0);
    }

    function closeAll() {
        if (isListOpen) setIsListOpen(false);
        if (isMenuOpen) setIsMenuOpen(false);
    }

    if (isSelect && Array.isArray(items)) {
        var value = field.value;
        var item = items.find((x) => getValue(x) === value);
        if (!multiSelect) displayValue = !item ? "" : getDisplayText(item);
        else {
            displayValue = "";
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                var idx = getIndexOf(item);
                if (idx >= 0) {
                    if (displayValue) displayValue += ", ";
                    displayValue += getDisplayText(item);
                }
            }
        }
    }

    const selectItem = (item) => {
        var v = getValue(item);
        if (!readOnly) {
            if (!multiSelect) helper.setValue(v);
            else {
                var i = getIndexOf(item);
                var values = Array.isArray(field.value) ? [...field.value] : [];
                if (i === -1) values.push(v);
                else values.splice(i, 1);
                helper.setValue(values);
                return;
            }
        }
        inpRef.current?.focus();
    };

    function getIndexOf(item) {
        var v = getValue(item);
        if (!multiSelect) return getValue(field.value) === v ? 0 : -1;
        if (!Array.isArray(field.value)) return -1;
        for (let i = 0; i < field.value.length; i++) {
            if (getValue(field.value[i]) === v) return i;
        }
        return -1;
    }

    function buildList() {
        if (readOnly || isLabel) return null;
        if (!Array.isArray(items)) return items;
        var _filter = filter?.toLowerCase();
        return items
            .filter(
                (x) => !filter || (getValue(x) + "").toLowerCase().indexOf(_filter) >= 0 || getText(x)?.toLowerCase().indexOf(_filter) >= 0
            )
            .map((x, xIndex) => (
                <div
                    key={getValue(x)}
                    className={classNames("bd-dropdown-item d-flex flex-align-center", { active: getIndexOf(x) >= 0 })}
                    onClick={(e) => {
                        if (multiSelect) stopEvent(e);
                        selectItem(x);
                    }}
                >
                    {multiSelect &&
                        (getIndexOf(x) === -1 ? (
                            <icons.CheckBoxOutlineBlank className="text-secondary-text size-md" />
                        ) : (
                            <icons.CheckBox className="text-secondary-text size-md" />
                        ))}
                    <span className="m-s-1">
                        {showValues && getValue(x) + " - "} {getText(x)}
                    </span>
                </div>
            ));
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
    }

    var inp = (
        <div className="bd-input">
            {buttons.map((x, index) => (
                <span key={index} className={`btn${index + 1} size-md icon-btn`} onClick={x.action}>
                    {x.icon}
                </span>
            ))}

            <input
                id={id}
                ref={inpRef}
                type={type}
                className={cnInput}
                autoComplete={autoComplete}
                title={meta.error}
                {...field}
                {...props}
                value={displayValue || ""}
                readOnly={readOnly || isSelect}
                onKeyDown={onKeyDownHandler}
                onClick={onClickHandler}
            />

            {isListOpen && items && (
                <div
                    className={classNames("bd-dropdown-menu nano-scroll", { "w-100": !autoGrow, "border rounded": autoGrow })}
                    style={{ marginTop: 1 }}
                >
                    {filterable && (
                        <div class="bd-dropdown-filter">
                            <input
                                value={filter || ""}
                                onChange={(e) => setFilter(e.target.value)}
                                onClick={(e) => stopEvent(e)}
                                className="form-control"
                            />
                        </div>
                    )}
                    {buildList()}
                </div>
            )}
            {isMenuOpen && menu && <div className="bd-dropdown-menu">{menu}</div>}
        </div>
    );

    if (label === null || label === undefined) return inp;
    return (
        <FormRow label={label} labelSize={labelSize} htmlFor={id} className={className} style={{ ...style, maxWidth, width }}>
            {inp}
        </FormRow>
    );
};

function stopEvent(e) {
    if (e?.stopPropagation) e.stopPropagation(e);
    if (e?.preventDefault) e.preventDefault(e);
}
