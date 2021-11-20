import React, { useRef, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import * as bd from "react-basic-design";
import * as bd2 from "../../../components/forms";
import * as icons from "../../../assets/icons";
import { T, Text } from "../../../components/basic/text";
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
            <div className="bg-default border-bottom">
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

            <div className="container" style={{ marginBottom: 70 }}>
                <div className="pb-3">
                    <bd2.FormikForm
                        initialValues={column}
                        validationSchema={yup.object({
                            name: yup.string().max(50).required("Required"),
                            title: yup.string().max(50).required("Required"),
                        })}
                        onSubmit={onSaveClick}
                        innerRef={formRef}
                        compact
                    >
                        {canShowTab("general") && (
                            <div className="p-s-3 pt-3">
                                <div className="bd-form-flex">
                                    <bd2.FormikInput name="name" label={<Text>name</Text>} readOnly={!insertMode} autoFocus width="12rem" />
                                    <bd2.FormikInput name="title" label={<Text>title</Text>} width="12rem" />
                                    <bd2.FormikToggle name="isPK" label={<Text>isPK</Text>} size="sm" compact />
                                    <bd2.FormikToggle name="isNull" label={<Text>isNull</Text>} size="sm" compact />
                                </div>
                                <div className="bd-form-flex">
                                    <bd2.FormikInput name="defaultValue" label={<Text>default-value</Text>} width="12rem" />
                                    <bd2.FormikInput name="maxLen" label={<Text>max-length</Text>} type="number" />
                                    <bd2.FormikInput name="width" label={<Text>width</Text>} type="number" width="7rem" />
                                    <bd2.FormikInput name="ordinalPosition" label={<Text>position</Text>} type="number" width="7rem" />
                                </div>
                            </div>
                        )}

                        {canShowTab("filter") && (
                            <bd.Panel title={<T>filter</T>} size="md" expanded titleClassName="text-primary">
                                <div className="bd-form-flex p-s-3">
                                    <bd2.FormikInput
                                        name="filter"
                                        label={<Text>filter</Text>}
                                        type="select"
                                        items={[
                                            { id: "", title: "NO-FILTER" },
                                            { id: "simple", title: "Simple" },
                                            { id: "complex", title: "Complex" },
                                        ]}
                                        width="12rem"
                                    />
                                    <bd2.FormikToggle name="filterRequired" label={<Text>filter-required</Text>} size="sm" compact />
                                </div>
                            </bd.Panel>
                        )}

                        {canShowTab("relation") && (
                            <bd.Panel title={<T>relation</T>} size="md" expanded titleClassName="text-primary">
                                <div className="bd-form-flex p-s-3">
                                    <bd2.FormikInput name="checkGrid" label={<Text>check-grid</Text>} width="12rem" />
                                    <bd2.FormikInput name="checkField" label={<Text>check-field</Text>} width="12rem" />
                                </div>
                            </bd.Panel>
                        )}

                        {canShowTab("list") && (
                            <bd.Panel title={<T>list</T>} size="md" titleClassName="text-primary">
                                <div className="bd-form-flex p-s-3">
                                    <bd2.FormikToggle name="showInList" label={<Text>show-in-list</Text>} size="sm" compact />
                                    <bd2.FormikInput name="cellClassName" label={<Text>cell-css</Text>} width="12rem" />
                                </div>
                            </bd.Panel>
                        )}

                        {canShowTab("editor") && (
                            <bd.Panel title={<T>editor</T>} size="md" titleClassName="text-primary">
                                <div className="bd-form-flex p-s-3">
                                    <bd2.FormikToggle
                                        name="showInEditor"
                                        label={<Text>show-in-editor</Text>}
                                        size="sm"
                                        compact
                                        width="6rem"
                                    />
                                    <bd2.FormikToggle name="isReadOnly" label={<Text>readonly</Text>} size="sm" compact width="5rem" />
                                    <bd2.FormikInput
                                        name="display"
                                        label={<Text>display</Text>}
                                        width="12rem"
                                        items={[
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
                                        ]}
                                    />

                                    <bd2.FormikInput name="controlClassName" label={<Text>control-css</Text>} width="12rem" />
                                    <bd2.FormikInput name="category" label={<Text>category</Text>} width="12rem" />
                                    <bd2.FormikInput name="validValues" label={<Text>valid-values</Text>} width="100%" />
                                </div>
                            </bd.Panel>
                        )}

                        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1 }}>
                            <div className="container text-end p-2 bg-default border rounded-pill mb-2 shadow-3">
                                <bd.Button color="secondary" type="submit">
                                    <Text>apply</Text>
                                </bd.Button>
                                <bd.Button variant="text" onClick={onGoBack} className="m-s-2 me-3">
                                    <Text>cancel</Text>
                                </bd.Button>
                            </div>
                        </div>
                    </bd2.FormikForm>
                </div>
            </div>
        </>
    );
};
