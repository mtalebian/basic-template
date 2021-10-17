import React from "react";
import * as bd from "react-basic-design";

interface FieldProps {
    type?: string;
    value: any;
    autoComplete?: string;
    onChange?: (e: any) => void;
    onBlur?: (e: any) => void;
}

export const DefaultEditor = ({ value: initialValue, row, column, updateMyData, editable, ...tableApi }: any) => {
    const [value, setValue] = React.useState(initialValue);
    const onChange = (e: any) => setValue(e.target.value);
    const onBlur = (e: any) => updateMyData(row.index, column.id, value);

    React.useEffect(() => setValue(initialValue), [initialValue]);

    function getValidValues() {
        var values = column.validValues;
        if (!values) return [];
        if (typeof values === "function") values = values(row);
        if (typeof values === "string") {
            return values.split(",").map((x: string) => {
                var i = x.indexOf(":");
                var code = i === -1 ? x : x.substr(0, i);
                var title = i === -1 ? x : x.substr(0, i);
                return { code: code.trim(), title: title.trim() };
            });
        }
        return values;
    }

    function getDisplayValue(value: any) {
        return column.getDisplayValue ? column.getDisplayValue(value, row, column) : value;
    }

    function renderLabel() {
        if (value === undefined) return "";
        if (value === null) {
            return !column.nullValue ? "" : <i className="small text-secondary-text">{column.nullValue}</i>;
        }
        switch (column.display) {
            case "textarea":
                return <div className="pre nano-scroll">{`${getDisplayValue(value)}`}</div>;

            case "check":
                return <bd.Toggle model={value ?? false} color="primary" size="sm" className="p-1 m-s-1" />;

            case "switch":
                return <bd.Switch model={value ?? false} color="primary" size="sm" className="py-0" />;
        }
        return `${getDisplayValue(value)}`;
    }

    function isReadonly() {
        const r = column.readOnly;
        return typeof r === "function" ? r(row) : r;
    }

    //-----------
    if (!editable || isReadonly()) return renderLabel();

    //-----------
    var field: FieldProps = { onChange, onBlur, value, autoComplete: "off" };

    switch (column.display) {
        case null:
        case "":
        case "text":
            field.type = "text";
            if (!value) field.value = "";
            break;

        case "number":
        case "amount":
            field.type = "number";
            break;

        case "email":
            field.type = "email";
            if (!value) field.value = "";
            break;

        case "url":
            field.type = "url";
            if (!value) field.value = "";
            break;

        case "check":
            return <bd.Toggle model={value} setModel={setValue} color="primary" size="sm" />;

        case "textarea":
            return <textarea className="form-control table-editor" {...field}></textarea>;

        case "switch":
            return <bd.Switch model={value} setModel={setValue} color="primary" size="sm" className="py-0" />;

        case "select":
            return (
                <select className="form-select table-editor" {...field}>
                    ;
                    {getValidValues().map((x: any) => (
                        <option key={x.code} value={x.code}>
                            {x.title}
                        </option>
                    ))}
                </select>
            );
    }

    return <input {...field} className="form-control table-editor" />;
};
