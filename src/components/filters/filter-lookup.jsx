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
        <Modal show={show} onHide={hide} size="lg" fullscreen="lg-down" dialogClassName="my-0 py-lg-4 h-100" centered>
            <bd.Panel title={title} style={{ height: 40 }}></bd.Panel>
            <bd.TabStrip className="border-bottom p-s-2" size="sm" style={{ height: 44 }}>
                <bd.TabStripItem>
                    <Text>search-and-select</Text>
                </bd.TabStripItem>

                <bd.TabStripItem>
                    <Text>define-conditions</Text>
                </bd.TabStripItem>
            </bd.TabStrip>
            <div className="bg-shade-3 flex-grow-1 flex-shrink-0 d-flex flex-column ">
                <div className="bg-shade-3" style={{ minHeight }}>
                    <h1>111</h1>
                </div>
                <div className="bg-shade-3 ">
                    <div className="mx-4 mb-1 d-flex flex-wrap">
                        <Text>selected items and conditions</Text>
                    </div>
                    <div className="mx-4 mb-3 border px-2 py-1">{values}</div>
                </div>
            </div>

            <Modal.Footer className="py-2 px-4">
                <bd.Button color="secondary" onClick={hide} className="btn-compact">
                    <Text>ok</Text>
                </bd.Button>

                <bd.Button variant="text" onClick={hide} className="btn-compact">
                    <Text>cancel</Text>
                </bd.Button>
            </Modal.Footer>
        </Modal>
    );
};
