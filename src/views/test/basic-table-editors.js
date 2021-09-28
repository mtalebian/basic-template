import React from "react";

// Create an editable cell renderer
export const BTTextEditor = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
    editable,
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);
    const onChange = (e) => setValue(e.target.value);
    const onBlur = () => updateMyData(index, id, value);

    React.useEffect(() => setValue(initialValue), [initialValue]);

    if (!editable) return `${initialValue}`;
    return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

//
//
export const BTSelectEditor = ({
    value: initialValue,
    row: { index },
    column,
    updateMyData, // This is a custom function that we supplied to our table instance
    editable,
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);
    const onChange = (e) => {
        setValue(e.target.value);
    };
    const onBlur = () => updateMyData(index, column.id, value);

    React.useEffect(() => setValue(initialValue), [initialValue]);

    if (!editable || !column._validValues) return `${initialValue}`;

    //<input value={value} onChange={onChange} onBlur={onBlur} />;
    return (
        <select value={value} onChange={onChange} className="" onBlur={onBlur}>
            <option value=""></option>
            {column._validValues.map((x) => (
                <option key={x.id} value={x.id}>
                    {x.title}
                </option>
            ))}
        </select>
    );
};
