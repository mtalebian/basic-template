import { useField } from "formik";
import React, { useState } from "react";
import * as bd from "react-basic-design";
import * as icons from "../../assets/icons";
import { FormikInput } from "../forms";
import { FilterLookup } from "./filter-lookup";
import { FilterX } from "./filter-x";

export const Filter = ({
    trace,
    label,
    labelSize,

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
    ...props
}) => {
    const [lookupIsOpen, setLookupIsOpen] = useState(false);
    const [field, meta, helper] = useField({ ...props, name, type });
    const values = field.value ? field.value : simple ? null : [];
    const [nameIndex, setNameIndex] = useState(0);

    const removeFilter = (e, xIndex) => {
        if (Array.isArray(values)) {
            values.splice(xIndex, 1);
            helper.setValue(values);
            if (values.length >= 1) e.stopPropagation();
        }
    };

    const menu = !Array.isArray(values) ? (
        <></>
    ) : (
        values.map((x, xIndex) => (
            <div
                key={x}
                className="bd-dropdown-item d-flex "
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
        ))
    );

    return (
        <>
            <FormikInput
                trace={true}
                label={label}
                //labelSize={labelSize}

                id={id}
                type={type}
                inputClassName={inputClassName}
                autoComplete={autoComplete}
                //

                buttonTitle={!simple && <icons.OpenInNew style={{ fontSize: "1.125rem" }} />}
                buttonOnClick={(e) => {
                    //e.stopPropagation();
                    setLookupIsOpen(true);
                }}
                //

                items={items}
                multiSelect={multiSelect}
                showValues={showValues}
                //filterable={Array.isArray(items) && items.length > 10}
                autoGrow={autoGrow}
                //

                menuTitle={values.length > 1 && <FilterX count={values.length} style={{ fontSize: "1.125rem" }} />}
                menu={menu}
                //

                className={className}
                width={width}
                maxWidth={maxWidth}
                style={style}
                readOnly={readOnly}
                {...props}
                name={simple ? name : `${name}[${nameIndex}]`}
            />
            {lookupIsOpen && <FilterLookup name={name} show={lookupIsOpen} setShow={setLookupIsOpen} title={label} />}
        </>
    );
};
