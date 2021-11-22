import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";

import { FieldArray, useField } from "formik";
import { BasicInput } from "../../../components/basic-form/basic-input";

/*
 *
 *
 */
export const RenderAuthorizations = ({ role }) => {
    const inputStyle = { maxWidth: 250 };
    const [field, _, helper] = useField({ name: "authorizations" });
    const deleteObjectAt = (index) => {
        var list = [...field.value];
        list.splice(index, 1);
        helper.setValue(list);
    };

    return (
        <FieldArray name="authorization">
            <div className="container p-2">
                {role.authorizations.map((azObject, index) => {
                    return (
                        <div className="pt-4 border-left-1 border-primary" key={index}>
                            <div className="col-7">
                                <bd.Toolbar className="container">
                                    <h4 className="p-e-2">{azObject.title}</h4>
                                    <bd.Button color="secondary" variant="icon" onClick={() => deleteObjectAt(index)} type="button">
                                        <icons.Delete className="size-md" />
                                    </bd.Button>
                                </bd.Toolbar>
                            </div>

                            <dl className="pt-2">
                                {azObject.fields.map((azFiled, indexField) => {
                                    return (
                                        <dd key={indexField}>
                                            <BasicInput
                                                name={`authorizations[${index}].fields[${indexField}].value`}
                                                label={azFiled.title}
                                                placeholder="Value"
                                                labelSize="1"
                                                autoComplete="off"
                                                style={inputStyle}
                                            />
                                        </dd>
                                    );
                                })}
                            </dl>
                        </div>
                    );
                })}
            </div>
        </FieldArray>
    );
};
