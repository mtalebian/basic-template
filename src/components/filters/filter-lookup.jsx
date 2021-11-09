import classNames from "classnames";
import { useField } from "formik";
import React, { useEffect, useState } from "react";
import * as bd from "react-basic-design";
import { Modal } from "react-bootstrap";
import * as icons from "../../assets/icons";
import { T, Text, TOptGroup, TOption } from "../basic/text";

const ROPs = [
    { id: "*x*", title: "contains", ignoreNumbers: true },
    { id: "=x", title: "equal-to" },
    { id: "x...y", title: "between" },
    { id: "x*", title: "starts-with", ignoreNumbers: true },
    { id: "*x", title: "ends-with", ignoreNumbers: true },
    { id: "<x", title: "less-than" },
    { id: "<=x", title: "less-than-or-equal" },
    { id: ">x", title: "greater-than" },
    { id: ">=x", title: "greater-than-or-equal" },
    { id: "<EMPTY>", title: "empty", ignoreNumbers: true },
];

/********/
export const FilterLookup = ({ name, title, show, setShow, isNumber, checkTable, ...props }) => {
    const [values, setValues] = useState(null);
    const [field, meta, helper] = useField({ name });

    const hide = () => setShow(false);
    let height = window.innerHeight - 200;
    if (height < 0) height = 0;
    if (height > 500) height = 500;
    if (window.innerWidth < 768) height = undefined;

    useEffect(() => {
        if (!values) setValues(convertFieldValueToList(field.value));
    }, [values, field.value]);

    const setValue = (e, i) => {
        var newValues = [...values];
        newValues[i].x = e.target.value;
        setValues(newValues);
    };

    const deleteFilter = (xIndex) => {
        if (values.length <= 1) setValues([null]);
        else {
            var newValues = [...values];
            newValues.splice(xIndex, 1);
            setValues(newValues);
        }
    };
    const okClick = () => {
        const list = [];
        for (let i = 0; i < values.length; i++) {
            const v = values[i];
            if (v.rop === "x...y") list.push(`${v.x}...${v.y}`);
            else list.push(v.rop.replace("x", v.x));
        }
        helper.setValue(list);
        hide();
    };

    const onChangeROP = (e, i) => {
        const list = [...values];
        list[i].rop = e.target.value;
        setValues(list);
    };

    return (
        <Modal show={show} onHide={hide} dialogClassName="modal-1024 px-md-4" centered fullscreen="md-down" backdrop="static">
            <bd.Panel title={title} style={{ height: 40 }}></bd.Panel>

            {checkTable && (
                <bd.TabStrip className="border-bottom p-s-2" size="sm" style={{ height: 44 }}>
                    <bd.TabStripItem>
                        <Text>search-and-select</Text>
                    </bd.TabStripItem>

                    <bd.TabStripItem>
                        <Text>define-conditions</Text>
                    </bd.TabStripItem>
                </bd.TabStrip>
            )}

            <Modal.Body className={classNames("p-0 border-top bg-shade-3", { "mt-3": !checkTable })} style={{ height }}>
                <div className="h-100 d-flex flex-column overflow-auto nano-scroll">
                    <div className="p-3 flex-grow-1">
                        {values &&
                            values.map((item, itemIndex) => (
                                <div key={itemIndex} className="container-flluid">
                                    <div className="row mb-2 gx-2">
                                        <div className="mb-2 col-12 col-sm-2">
                                            <select
                                                className="form-select compact"
                                                style={{ lineHeight: 1 }}
                                                value={item.rop}
                                                onChange={(e) => onChangeROP(e, itemIndex)}
                                            >
                                                <TOptGroup labelCode="include">
                                                    {ROPs.map(
                                                        (r) =>
                                                            (!isNumber || !r.ignoreNumbers) && (
                                                                <TOption key={r.id} value={r.id}>
                                                                    {r.title}
                                                                </TOption>
                                                            )
                                                    )}
                                                </TOptGroup>
                                                <TOptGroup labelCode="exclude">
                                                    {ROPs.map(
                                                        (r) =>
                                                            (!isNumber || !r.ignoreNumbers) && (
                                                                <TOption key={"!" + r.id} value={"!" + r.id}>
                                                                    {r.title}
                                                                </TOption>
                                                            )
                                                    )}
                                                </TOptGroup>
                                            </select>
                                            {item.rop}
                                        </div>
                                        <div className="mb-2 col-12 col-sm-9">
                                            <div className="d-flex">
                                                <input
                                                    className="form-control compact"
                                                    value={item.x || ""}
                                                    onChange={(e) => setValue(e, itemIndex)}
                                                />

                                                {(item.rop === "x...y" || item.rop === "!x...y") && (
                                                    <input
                                                        className="form-control compact m-s-2"
                                                        value={item.y || ""}
                                                        onChange={(e) => setValue(e, itemIndex)}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="mb-2 col-12 col-sm-1">
                                            <bd.Button
                                                variant="text"
                                                color="primary"
                                                className="compact"
                                                size="sm"
                                                onClick={() => deleteFilter(itemIndex)}
                                            >
                                                <icons.Close />
                                            </bd.Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        <div className="text-end mx-3">
                            <bd.Button color="primary" className="compact" onClick={() => setValues([...values, ""])}>
                                <Text>add</Text>
                            </bd.Button>
                        </div>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer className="py-2 px-4 border-top text-secondary-text d-flex">
                <T count={values ? values.length : 1}>@count filter(s)</T>
                <div className="flex-grow-1"></div>
                <bd.Button color="secondary" onClick={okClick} className0="compact">
                    <Text>ok</Text>
                </bd.Button>

                <bd.Button variant="text" onClick={hide} className0="compact">
                    <Text>cancel</Text>
                </bd.Button>
            </Modal.Footer>
        </Modal>
    );
};

function convertFieldValueToList(items) {
    console.log("items", items);
    if (!Array.isArray(items)) items = [];
    var list = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i]?.trim();
        const v = { rop: "", x: "", y: "" };
        list.push(v);

        if (item?.toUpperCase() === "<EMPTY>") {
            v.rop = "<EMPTY>";
        } else if (typeof item === "string") {
            var c0 = charAt(item, 0);
            switch (c0) {
                case "*":
                    if (charAt(item, -1) === "*") {
                        v.rop = "*x*";
                        v.x = item.substr(1, item.length - 2);
                    } else {
                        v.rop = "*x";
                        v.x = item.substr(1);
                    }
                    break;

                case "=":
                    v.rop = "=x";
                    v.x = item.substr(1);
                    break;

                case "<":
                case ">":
                    if (charAt(item, 1) === "=") {
                        v.rop = c0 + "=x";
                        v.x = item.substr(2);
                    } else {
                        v.rop = c0 + "x";
                        v.x = item.substr(1);
                    }
                    break;

                default:
                    if (charAt(item, -1) === "*") {
                        v.rop = "x*";
                        v.x = item.substr(0, item.length - 1);
                    } else {
                        const idx = item.indexOf("...");
                        if (idx >= 0) {
                            v.rop = "x...y";
                            v.x = item.substr(0, idx);
                            v.y = item.substr(idx + 3);
                        } else v.x = item;
                    }
                    break;
            }
        }
    }
    return list;
}

function charAt(s, i) {
    if (i < 0) i += s.length;
    return i >= 0 && i < s.length ? s[i] : null;
}