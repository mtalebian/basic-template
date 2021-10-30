import React, { useRef, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import { Text } from "../../../components/basic/text";
import { BasicSwitch } from "../../../components/basic-form/basic-switch";
import { BasicInput } from "../../../components/basic-form/basic-input";
import { BasicSelect } from "../../../components/basic-form/basic-select";

export const EditColumn = ({ column, onGoBack, onChanged }) => {
    const insertMode = column.id === undefined;
    const formRef = useRef();
    const [tab, setTab] = useState();
    const canShowTab = (t) => !tab || tab === t;

    const onSaveClick = () => {
        var values = formRef.current.values;
        onChanged(values, column);
    };

    return (
        <>
            <div className="bg-default">
                <bd.Toolbar className="container">
                    <bd.Button variant="icon" onClick={onGoBack} size="md" edge="start" className="m-e-2">
                        <icons.ArrowBackIos className="rtl-rotate-180" />
                    </bd.Button>

                    <h5>
                        <Text>{insertMode ? "insert-column" : "edit-column"}</Text>
                        {!insertMode && <b className="m-s-2">(# {column.id})</b>}
                    </h5>
                </bd.Toolbar>
            </div>

            <div className="position-sticky pb-2 overflow-hidden" style={{ top: 0, zIndex: 1 }}>
                <div className="bg-default border-bottom shadow-4 " style={{ top: 0, zIndex: 1 }}>
                    <bd.TabStrip textColor="primary" indicatorColor="primary" className="container">
                        <bd.TabStripItem eventKey="general" onClick={(e) => setTab("general")}>
                            <Text>general</Text>
                        </bd.TabStripItem>
                        <bd.TabStripItem eventKey="filter" onClick={(e) => setTab("filter")}>
                            <Text>filter</Text>
                        </bd.TabStripItem>
                        <bd.TabStripItem eventKey="relation" onClick={(e) => setTab("relation")}>
                            <Text>relation</Text>
                        </bd.TabStripItem>
                        <bd.TabStripItem eventKey="list" onClick={(e) => setTab("list")}>
                            <Text>list</Text>
                        </bd.TabStripItem>
                        <bd.TabStripItem eventKey="editor" onClick={(e) => setTab("editor")}>
                            <Text>editor</Text>
                        </bd.TabStripItem>
                    </bd.TabStrip>
                </div>
            </div>

            <div className="container" style={{ marginBottom: 70 }}>
                <div className="mt-3 pb-3" style={{ maxWidth: 500 }}>
                    <Formik
                        initialValues={column}
                        validationSchema={yup.object({
                            name: yup.string().max(50).required("Required"),
                            title: yup.string().max(50).required("Required"),
                        })}
                        onSubmit={onSaveClick}
                        innerRef={formRef}
                    >
                        <Form>
                            {canShowTab("general") && (
                                <>
                                    <BasicInput name="name" label={<Text>name</Text>} labelSize="4" readOnly={!insertMode} autoFocus />
                                    <BasicInput name="title" label={<Text>title</Text>} labelSize="4" />
                                    <BasicSwitch name="isPK" label={<Text>isPK</Text>} labelSize="4" />
                                    <BasicSwitch name="isNull" label={<Text>isNull</Text>} labelSize="4" />
                                    <BasicInput name="maxLen" label={<Text>max-length</Text>} labelSize="4" type="number" />
                                    <BasicInput name="defaultValue" label={<Text>default-value</Text>} labelSize="4" />
                                    <BasicInput name="width" label={<Text>width</Text>} labelSize="4" type="number" />
                                </>
                            )}

                            {canShowTab("filter") && (
                                <>
                                    <h5>
                                        <Text>filter</Text>
                                    </h5>
                                    <BasicSelect name="filter" label={<Text>filter</Text>} labelSize="4">
                                        <option></option>
                                        <option value="simple">Simple</option>
                                        <option value="complex">Complex</option>
                                    </BasicSelect>
                                    <BasicSwitch name="useInFilterVariant" label={<Text>use-in-variant</Text>} labelSize="4" />
                                </>
                            )}

                            {canShowTab("relation") && (
                                <>
                                    <h5>
                                        <Text>relation</Text>
                                    </h5>
                                    <BasicInput name="checkGrid" label={<Text>check-grid</Text>} labelSize="4" />
                                    <BasicInput name="checkField" label={<Text>check-field</Text>} labelSize="4" />
                                </>
                            )}

                            {canShowTab("list") && (
                                <>
                                    <h5>
                                        <Text>list</Text>
                                    </h5>
                                    <BasicSwitch name="showInList" label={<Text>show-in-list</Text>} labelSize="4" />
                                    <BasicInput name="cellClassName" label={<Text>cell-css</Text>} labelSize="4" />
                                </>
                            )}

                            {canShowTab("editor") && (
                                <>
                                    <h5>
                                        <Text>editor</Text>
                                    </h5>
                                    <BasicSwitch name="showInEditor" label={<Text>show-in-editor</Text>} labelSize="4" />
                                    <BasicSwitch name="isReadOnly" label={<Text>readonly</Text>} labelSize="4" />
                                    <BasicSelect name="display" label={<Text>display</Text>} labelSize="4">
                                        {[
                                            "",
                                            "text",
                                            "email",
                                            "url",
                                            "number",
                                            "amount",
                                            "textarea",
                                            "check",
                                            "switch",
                                            "select",
                                            "shamsi",
                                        ].map((x) => (
                                            <option key={x} value={x}>
                                                {x}
                                            </option>
                                        ))}
                                    </BasicSelect>
                                    <BasicInput name="validValues" label={<Text>valid-values</Text>} labelSize="4" />
                                    <BasicInput name="controlClassName" label={<Text>control-css</Text>} labelSize="4" />
                                    <BasicInput name="category" label={<Text>category</Text>} labelSize="4" />
                                    <BasicInput name="ordinalPosition" label={<Text>position</Text>} labelSize="4" type="number" />
                                </>
                            )}

                            <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1 }}>
                                <div className="container text-end p-2 bg-default border border-secondary rounded-pill mb-2 shadow-3">
                                    <bd.Button color="secondary" type="submit">
                                        <Text>save</Text>
                                    </bd.Button>
                                    <bd.Button variant="text" onClick={onGoBack} className="m-s-2 me-3">
                                        <Text>cancel</Text>
                                    </bd.Button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
};
