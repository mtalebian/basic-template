import { useField } from "formik";
import React, { useState } from "react";
import * as bd from "react-basic-design";
import * as icons from "../../assets/icons";
import { FormikInput } from "../forms";

export const Filter = ({
    trace,
    label,
    labelSize,

    id,
    type,
    inputClassName,
    autoComplete,

    //buttonTitle,
    //buttonOnClick,

    items,
    multiSelect,
    showValues,
    filterable,
    autoGrow,

    //menuTitle,
    //menu,
    //onOpeningMenu,

    className,
    width,
    maxWidth,
    style,

    readOnly,
    name,
    ...props
}) => {
    let [field, meta, helper] = useField({ ...props, name, type });
    const values = field.value ? field.value : [];
    const [nameIndex, setNameIndex] = useState(0);

    const menu = !Array.isArray(values) ? (
        <></>
    ) : (
        values.map((x) => (
            <div
                key={x}
                className="bd-dropdown-item d-flex "
                onClick={(e) => {
                    alert(x.id);
                }}
            >
                <span className="flex-grow-1">{x}</span>
                <bd.Button
                    type="button"
                    variant="text"
                    size="sm"
                    color="primary"
                    onClick={(e) => {
                        e.stopPropagation();
                        alert(`close ${x}`);
                    }}
                    className="my-n1 m-e-n2"
                >
                    <icons.Close className="size-sm" />
                </bd.Button>
            </div>
        ))
    );

    return (
        <FormikInput
            button1={{
                icon: <icons.OpenInNew />,
                action: () => alert("ccc"),
            }}
            button2={{
                icon: <icons.ArrowDropDown />,
                action: () => alert("ccc"),
            }}
            //
            trace={trace}
            label={label}
            labelSize={labelSize}
            //
            id={id}
            type={type}
            inputClassName={inputClassName}
            autoComplete={autoComplete}
            //
            buttonTitle={<icons.OpenInNew style={{ fontSize: "1.125rem" }} />}
            buttonOnClick={() => {
                alert("ccc");
            }}
            //
            items={items}
            multiSelect={multiSelect}
            showValues={showValues}
            filterable={filterable}
            autoGrow={autoGrow}
            //
            //menuTitle={menuTitle}
            //menu={menu}
            //onOpeningMenu={onOpeningMenu}

            menuTitle={values.length && <FilterX count={values.length} style={{ fontSize: "1.125rem" }} />}
            menu={menu}
            //
            className={className}
            width={width}
            maxWidth={maxWidth}
            style={style}
            readOnly={readOnly}
            {...props}
            name={`${name}[${nameIndex}]`}
        />
    );
};

export const FilterX = ({ count, ...props }) => {
    switch (count) {
        case 0:
            return <icons.FilterNone {...props} />;
        case 1:
            return <icons.Filter1 {...props} />;
        case 2:
            return <icons.Filter2 {...props} />;
        case 3:
            return <icons.Filter3 {...props} />;
        case 4:
            return <icons.Filter4 {...props} />;
        case 5:
            return <icons.Filter5 {...props} />;
        case 6:
            return <icons.Filter6 {...props} />;
        case 7:
            return <icons.Filter7 {...props} />;
        case 8:
            return <icons.Filter8 {...props} />;
        case 9:
            return <icons.Filter9 {...props} />;

        default:
            return <icons.Filter9Plus {...props} />;
    }
};
