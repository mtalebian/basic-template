import { useField } from "formik";
import React, { useState } from "react";
import * as bd from "react-basic-design";
import { Modal } from "react-bootstrap";
import * as icons from "../../assets/icons";
import { Text } from "../basic/text";
import { FormikInput } from "../forms";

export const FilterLookup = ({ name, title, show, setShow, ...props }) => {
    const hide = () => setShow(false);
    var minHeight = window.innerHeight - 250;
    console.log(minHeight);
    if (minHeight < 0) minHeight = 0;
    if (minHeight > 500) minHeight = 500;

    const [field, meta, helper] = useField({ name });
    const values = field.value ? field.value : [];

    return (
        <Modal show={show} onHide={hide} size="xl" dialogClassName="my-0 py-lg-4 h-100" centered>
            <bd.Panel title={title} style={{ height: 40 }}></bd.Panel>
            <bd.TabStrip className="border-bottom p-s-2" size="sm" style={{ height: 44 }}>
                <bd.TabStripItem>
                    <Text>search-and-select</Text>
                </bd.TabStripItem>

                <bd.TabStripItem>
                    <Text>define-conditions</Text>
                </bd.TabStripItem>
            </bd.TabStrip>
            <div className="bg-shade-3 flex-grow-1 flex-shrink-0 d-flex flex-column overflow-auto" style={{ maxHeight: minHeight + 50 }}>
                <div className="bg-shade-3 p-3 overflow-hidden" style={{ minHeight }}>
                    {values.map((x) => (
                        <div className="container-flluid">
                            <div className="row mb-3 gx-30">
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
                            <Text>add</Text>
                        </bd.Button>
                    </div>
                </div>
                AAAAAAAAAAA
                <div className="bg-shade-3 ">
                    <div className="mx-4 mb-1">
                        <Text>selected-items-and-conditions</Text>
                    </div>
                    <div className="mx-4 mb-3 border px-2 pt-1 bg-default rounded d-flex flex-wrap" style={{ height: "auto" }}>
                        {values.map((x) => (
                            <div className="border rounded px-2 m-e-2 mb-1 d-flex align-items-center cur-pointer hover-shade-5">
                                {x}
                                <icons.Close className="size-sm m-s-2" style={{ fontSize: 14 }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-2 px-4 border-top text-end">
                <bd.Button color="secondary" onClick={hide} className="compact">
                    <Text>ok</Text>
                </bd.Button>

                <bd.Button variant="text" onClick={hide} className="compact">
                    <Text>cancel</Text>
                </bd.Button>
            </div>
        </Modal>
    );
};
