import React, { useRef } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import { Text } from "../../../components/basic/text";
import { BasicTextArea } from "../../../components/basic-form/basic-textarea";
import { BasicSwitch } from "../../../components/basic-form/basic-switch";
import { BasicInput } from "../../../components/basic-form/basic-input";

export const EditColumn = ({ column, table, onGoBack, onChanged }) => {
    const insertMode = !column.id;
    const formRef = useRef();

    const onSaveClick = () => {
        var values = formRef.current.values;
        onChanged(values, column);
    };

    return (
        <>
            <bd.Toolbar className="container">
                <bd.Button variant="icon" onClick={onGoBack} size="md" edge="start" className="m-e-2">
                    <icons.ArrowBackIos className="rtl-rotate-180" />
                </bd.Button>

                <h5>
                    <Text>{insertMode ? "insert-column" : "edit-column"}</Text>
                </h5>
            </bd.Toolbar>

            <div className="container" style={{ marginBottom: 70 }}>
                <div className="mt-4" style={{ maxWidth: 1000 }}>
                    <Formik
                        initialValues={column || { name: "", title: "", singularTitle: "" }}
                        validationSchema={yup.object({
                            id: yup.string().max(50).required("Required"),
                            title: yup.string().max(50).required("Required"),
                            tableName: yup.string().max(50).required("Required"),
                        })}
                        onSubmit={onSaveClick}
                        innerRef={formRef}
                    >
                        <form>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <BasicInput name="id" label={<Text>grid-id</Text>} labelSize="4" readOnly={!insertMode} autoFocus />
                                    <BasicInput name="title" label={<Text>title</Text>} labelSize="4" />
                                    <BasicSwitch name="flexLayout" label={<Text>flex-layout</Text>} labelSize="4" />
                                </div>
                                <div className="col-md-6">
                                    <BasicTextArea name="description" label={<Text>description</Text>} className="h-100" />
                                </div>
                            </div>

                            <bd.AppBar position="bottom">
                                <bd.Toolbar className="container">
                                    <div className="flex-grow-1" />

                                    <bd.Button color="primary" onClick={() => formRef.current.submitForm()}>
                                        <Text>save</Text>
                                    </bd.Button>
                                </bd.Toolbar>
                            </bd.AppBar>
                        </form>
                    </Formik>
                </div>
            </div>
        </>
    );
};
