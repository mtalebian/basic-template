import { useField } from "formik";
import React, { useEffect, useState } from "react";
import * as bd from "react-basic-design";
import { Modal } from "react-bootstrap";
import * as icons from "../../assets/icons";
import { Text } from "../basic/text";
import { FormikInput } from "../forms";

export const FilterLookup = ({ name, title, show, setShow, ...props }) => {
    const [values, setValues] = useState(null);
    const [field, meta, helper] = useField({ name });
    const setValue = (e, i) => {
        setValues([...values.filter((z, zIndex) => zIndex < i), e.target.value, ...values.filter((z, zIndex) => zIndex > i)]);
    };

    const hide = () => setShow(false);
<<<<<<< HEAD
    var height = window.innerHeight - 200;
=======
    let height = window.innerHeight - 200;
>>>>>>> 35046d8007fa9479a8d1976331159469bad72ecd
    if (height < 0) height = 0;
    if (height > 500) height = 500;
    if (window.innerWidth < 768) height = undefined;

    useEffect(() => {
        if (!values) setValues(!Array.isArray(field.value) ? [] : field.value);
    }, [values, field.value]);

    return (
        <Modal show={show} onHide={hide} dialogClassName="modal-1024 px-md-4" centered fullscreen="md-down">
            <bd.Panel title={title} style={{ height: 40 }}></bd.Panel>
            <bd.TabStrip className="border-bottom p-s-2" size="sm" style={{ height: 44 }}>
                <bd.TabStripItem>
                    <Text>search-and-select</Text>
                </bd.TabStripItem>

                <bd.TabStripItem>
                    <Text>define-conditions</Text>
                </bd.TabStripItem>
            </bd.TabStrip>

            <Modal.Body className="p-0" style={{ height }}>
                <div className="h-100 d-flex flex-column overflow-auto nano-scroll">
                    <div className="p-3 flex-grow-1">
<<<<<<< HEAD
                        {values.map((x) => (
                            <div className="container-flluid">
                                <div className="row mb-2 gx-30">
                                    <div className="mb-2 col-12 col-sm-3">
                                        <select className="form-select compact">
                                            {["=", ">=", "<="].map((x) => (
                                                <option value={x}>{x}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-2 col-12 col-sm-8">
                                        <input className="form-control compact" value={x} />
                                    </div>
                                    <div className="mb-2 col-12 col-sm-1">
                                        <bd.Button variant="text" color="primary" className="compact" size="sm">
                                            <icons.Close />
                                        </bd.Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="text-end mx-3">
                            <bd.Button color="primary" className="compact" onClick={() => values.push()}>
=======
                        {values &&
                            values.map((x, xIndex) => (
                                <div key={xIndex} className="container-flluid">
                                    <div className="row mb-2 gx-30">
                                        <div className="mb-2 col-12 col-sm-3">
                                            <select className="form-select compact">
                                                {["=", ">=", "<="].map((op) => (
                                                    <option key={op} value={op}>
                                                        {op}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-2 col-12 col-sm-8">
                                            <input className="form-control compact" value={x || ""} onChange={(e) => setValue(e, xIndex)} />
                                        </div>
                                        <div className="mb-2 col-12 col-sm-1">
                                            <bd.Button
                                                variant="text"
                                                color="primary"
                                                className="compact"
                                                size="sm"
                                                onClick={() =>
                                                    setValues([
                                                        ...values.filter((z, zIndex) => zIndex < xIndex),
                                                        ...values.filter((z, zIndex) => zIndex > xIndex),
                                                    ])
                                                }
                                            >
                                                <icons.Close />
                                            </bd.Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        <div className="text-end mx-3">
                            <bd.Button color="primary" className="compact" onClick={() => setValues([...values, ""])}>
>>>>>>> 35046d8007fa9479a8d1976331159469bad72ecd
                                <Text>add</Text>
                            </bd.Button>
                        </div>
                    </div>

                    <div>
                        <div className="mx-4 mb-1">
                            <Text>selected-items-and-conditions</Text>
                        </div>
<<<<<<< HEAD
                        <div className="mx-4 mb-3 border px-2 pt-1 bg-default rounded d-flex flex-wrap">
                            {values.map((x) => (
                                <div className="border rounded px-2 m-e-2 mb-1 d-flex align-items-center cur-pointer hover-shade-5">
                                    {x}
                                    <icons.Close className="size-sm m-s-2" style={{ fontSize: 14 }} />
                                </div>
                            ))}
=======
                        <div className="form-control mx-4 mb-3 px-2 pt-1 pb-0 d-flex flex-wrap w-auto">
                            {values &&
                                values.map((x, xIndex) => (
                                    <div
                                        key={xIndex}
                                        className="border rounded px-2 m-e-2 mb-1 d-flex align-items-center cur-pointer hover-shade-5"
                                    >
                                        {x}
                                        <icons.Close className="size-sm m-s-2" style={{ fontSize: 14 }} />
                                    </div>
                                ))}
>>>>>>> 35046d8007fa9479a8d1976331159469bad72ecd
                        </div>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer className="py-2 px-4 border-top text-end">
                <bd.Button color="secondary" onClick={hide} className="compact">
                    <Text>ok</Text>
                </bd.Button>

                <bd.Button variant="text" onClick={hide} className="compact">
                    <Text>cancel</Text>
                </bd.Button>
            </Modal.Footer>

            {/* 

            <div className="bg-shade-3 d-flex flex-column overflow-auto" style={{ minHeight: minHeight }}>
                
            </div>
*/}
        </Modal>
    );
};
