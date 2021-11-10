import classNames from "classnames";
import { useField } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as bd from "react-basic-design";
import * as icons from "../../assets/icons";
import { FormikInput } from "../forms";
import { FilterLookup } from "./filter-lookup";
import { FilterX } from "./filter-x";

export const Filter = ({
    trace,
    label,

    id,
    type,
    inputClassName,
    autoComplete,

    items,
    multiSelect,
    showValues,
    autoGrow,

    className,
    width,
    maxWidth,
    style,

    readOnly,
    name,
    simple,
    checkTable,
    rowValues,
    isNumber,
    ...props
}) => {
    const inputApi = useRef();
    const [lookupIsOpen, setLookupIsOpen] = useState(false);
    const [field, meta, helper] = useField({ ...props, name, type });
    const values = field.value ? field.value : simple ? null : [];
    const [nameIndex, setNameIndex] = useState(0);

    const removeFilter = (e, xIndex) => {
        if (Array.isArray(values)) {
            values.splice(xIndex, 1);
            helper.setValue(values);
            if (nameIndex >= values.length) setNameIndex(Math.max(0, values.length - 1));
            if (values.length >= 1) e.stopPropagation();
        }
    };

    const addFilter = () => {
        if (!Array.isArray(values)) return;
        for (let i = 0; i < values.length; i++) {
            if (!values[i]) {
                setNameIndex(i);
                return;
            }
        }
        helper.setValue([...values, ""]);
        setNameIndex(values.length);
    };

    const menu =
        simple || !Array.isArray(values)
            ? null
            : values.map((x, xIndex) => (
                  <div
                      key={xIndex}
                      className={classNames("bd-dropdown-item d-flex", { active: nameIndex === xIndex })}
                      onClick={(e) => {
                          setNameIndex(xIndex);
                      }}
                  >
                      <span className="flex-grow-1">{x}</span>
                      <bd.Button
                          type="button"
                          variant="text"
                          size="sm"
                          color="primary"
                          onClick={(e) => removeFilter(e, xIndex)}
                          className="my-n1 m-e-n2"
                      >
                          <icons.Close className="size-sm" />
                      </bd.Button>
                  </div>
              ));

    useEffect(() => {
        var i = nameIndex;
        if (i >= values.length) {
            i = Math.max(0, values.length - 1);
            if (i !== nameIndex) {
                setNameIndex(i);
            }
        }
    }, [nameIndex, values]);

    function openLookup() {
        if (!simple) setLookupIsOpen(true);
    }

    function onKeyDown(e, isMenuOpen) {
        const UP = 38;
        const DOWN = 40;
        const ENTER = 13;
        const INSERT = 45;
        const DELETE = 46;
        const F4 = 115;
        let i;

        switch (e.keyCode) {
            case F4:
                openLookup();
                break;

            case UP:
                i = nameIndex - 1;
                if (i >= 0) setNameIndex(i);
                break;

            case DOWN:
                i = nameIndex + 1;
                if (i < values.length) setNameIndex(i);
                break;

            case DELETE:
                if (!isMenuOpen) break;
                removeFilter(e, nameIndex);
                e.stopPropagation();
                return false;

            case ENTER:
                if (e?.shiftKey) addFilter();
                break;

            case INSERT:
                console.log("isMenuOpen", isMenuOpen);
                if (!isMenuOpen) break;
                addFilter();
                e.stopPropagation();
                return false;

            default:
                break;
        }
    }

    return (
        <>
            <FormikInput
                inputApi={inputApi}
                trace={true}
                label={label}
                id={id}
                type={type}
                inputClassName={inputClassName}
                autoComplete={autoComplete}
                //

                buttonTitle={!simple && <icons.OpenInNew style={{ fontSize: "1.125rem" }} />}
                buttonOnClick={(e) => openLookup()}
                //

                items={items}
                multiSelect={multiSelect}
                showValues={showValues}
                //filterable={Array.isArray(items) && items.length > 10}
                autoGrow={autoGrow}
                //

                menuTitle={simple ? null : values.length > 1 && <FilterX count={values.length} style={{ fontSize: "1.125rem" }} />}
                menu={menu}
                //

                className={className}
                width={width}
                maxWidth={maxWidth}
                style={style}
                readOnly={readOnly}
                {...props}
                name={simple ? name : `${name}[${nameIndex}]`}
                //onKeyDown={(a, b) => onKeyDown(a, b)}
                onKeyDown={onKeyDown}
            />

            {lookupIsOpen && (
                <FilterLookup
                    name={name}
                    show={lookupIsOpen}
                    setShow={(visible) => {
                        setLookupIsOpen(visible);
                        if (!visible) setTimeout(() => inputApi.current?.getRef()?.focus(), 0);
                    }}
                    title={label}
                    isNumber={isNumber}
                    checkTable={checkTable}
                    rowValues={rowValues}
                />
            )}
        </>
    );
};
