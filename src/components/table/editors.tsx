import React from "react";

//
//
//
export const DefaultEditor = ({ value: initialValue, row, column, updateMyData, editable, ...tableApi }: any) => {
    const [value, setValue] = React.useState(initialValue);
    const onChange = (e: any) => setValue(e.target.value);
    const onBlur = () => updateMyData(row.index, column.id, value);

    React.useEffect(() => setValue(initialValue), [initialValue]);

    if (!editable) {
        if (!initialValue) return initialValue;
        if (typeof initialValue === "number") return initialValue;
        return `${initialValue}`;
    }
    return <input className="form-control table-editor" value={value} onChange={onChange} onBlur={onBlur} />;
};

//
//
//
export const TextEditor = ({ value: initialValue, row: { index }, column: { id }, updateMyData, editable }: any) => {
    const [value, setValue] = React.useState(initialValue);
    const onChange = (e: any) => setValue(e.target.value);
    const onBlur = () => updateMyData(index, id, value);

    React.useEffect(() => setValue(initialValue), [initialValue]);

    if (!editable) return `${initialValue}`;
    return <input className="form-control table-editor" value={value} onChange={onChange} onBlur={onBlur} />;
};

//
//
//
export const SelectEditor = ({ value: initialValue, row: { index }, column, updateMyData, editable }: any) => {
    const [value, setValue] = React.useState(initialValue);
    const onChange = (e: any) => {
        setValue(e.target.value);
    };
    const onBlur = () => updateMyData(index, column.id, value);

    React.useEffect(() => setValue(initialValue), [initialValue]);

    if (!editable || !column._validValues) return `${initialValue}`;

    return (
        <select value={value} onChange={onChange} className="form-select table-editor" onBlur={onBlur}>
            <option value=""></option>
            {column._validValues.map((x: any) => (
                <option key={x.id} value={x.id}>
                    {x.title}
                </option>
            ))}
        </select>
    );
};
