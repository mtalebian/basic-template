import React from "react";
import * as bd2 from "./index.js";
import * as bd from "react-basic-design";
import * as icons from "../../assets/icons";
import { FormRow } from "./form-row.jsx";
import { Filter } from "../filters/filter.jsx";
import { FilterX } from "../filters/filter-x.jsx";
//import { useField } from "formik";

function alert() {}

export function FormikTest() {
    return (
        <>
            <bd2.FormikForm
                initialValues={{ status: 1, firstName: "Mahdi", lastName: "Talebian", age: 10, comments: "this is textarea" }}
                onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
                flex
                dense
                className="pt-3 p-s-3"
            >
                <FormDemo />
            </bd2.FormikForm>

            <hr />

            <bd2.FormikForm
                initialValues={{ name: "Mahdi", age: 10, status: [2], filter: ["=1", ">2", "<3", "1...2", "*a", "bb*"] }}
                onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
                flex
                dense
                className="pt-3 p-s-3"
            >
                <FilterDemo />
            </bd2.FormikForm>

            <hr />

            <bd2.FormikForm
                initialValues={{ status: 1, firstName: "Mahdi", lastName: "Talebian", age: 10 }}
                onSubmit={(values) => alert("submited")}
                flex
                dense
                className="pt-3 p-s-3"
            >
                <DropDownTest />
            </bd2.FormikForm>
        </>
    );
}

const FilterDemo = () => {
    return (
        <>
            <Filter type="text" label="filter" name="filter" width="12rem" />

            <bd2.FormikInput label="Name" name="name" width="10rem" />
            <bd2.FormikInput label="Age" name="age" width="10rem" type="number" />
            <bd2.FormikInput
                label="Status"
                name="status"
                width="10rem"
                items={[
                    { id: 1, title: "SINGLE" },
                    { id: 2, title: "MARRIED" },
                ]}
                type="select"
            />

            <bd2.FormikInput
                type="select"
                multiSelect
                showValues
                filterable
                //autoGrow
                label="plants"
                name="plants"
                width="12rem"
                items={[
                    { id: 1101, title: "IKCO Tehran, KM 14 Karaj" },
                    { id: 1201, title: "IKCO Tondar" },
                    { id: 1401, title: "PLANT 1401" },
                    { id: 1501, title: "PLANT 1501" },
                    { id: 1601, title: "PLANT 1601" },
                    { id: 1701, title: "PLANT 1701" },
                    { id: 1801, title: "PLANT 1801" },
                    { id: 1901, title: "PLANT 1901" },
                    { id: 2001, title: "PLANT 2001" },
                ]}
            />

            <bd2.FormikSwitch label="I Agree" name="agree" width="auto" className="p-e-3" dense size="sm" />

            <FormRow label="" className="flex-grow-1 text-end">
                <div>
                    <bd.Button color="primary" type="submit">
                        GO
                    </bd.Button>

                    <bd.Button variant="text" color="primary" type="button">
                        Filters (1)
                    </bd.Button>
                </div>
            </FormRow>
        </>
    );
};

const FormDemo = () => {
    return (
        <>
            <bd2.FormikInput label="First Name" name="firstName" width="12rem" />
            <bd2.FormikInput label="Last Name" name="lastName" width="12rem" />
            <bd2.FormikInput label="Age" name="age" width="5rem" type="number" />
            <bd2.FormikInput
                trace
                label="Status"
                name="status"
                width="7rem"
                items={[
                    { id: 1, title: "SINGLE" },
                    { id: 2, title: "MARRIED" },
                ]}
                type="select"
            />
            <bd2.FormikSwitch label="I Agree" name="agree" width="auto" className="p-e-3" dense size="sm" />
            <bd2.FormikToggle label="readOnly" name="remember" width="auto" size="sm" className="p-e-0" dense readOnly />
            <bd2.FormikInput label="type = label" name="firstName" width="9rem" type="label" inputClassName="bg-transparent" />
            <bd2.FormikTextArea label="comments" name="comments" width="12rem" height="5rem" type="label" />

            <bd2.FormikInput
                type="text"
                label="company"
                name="company"
                width="12rem"
                //menuTitle={<span title="22 more condition exists">+(22)</span>}
                menuTitle={<FilterX count={5} style={{ fontSize: "1.125rem" }} />}
                buttonTitle={<icons.OpenInNew style={{ fontSize: "1.125rem" }} />}
                buttonOnClick={() => alert("clicked")}
                items={[
                    { id: 110, title: "one" },
                    { id: 120, title: "two" },
                    { id: 130, title: "three" },
                ]}
                menu={[
                    { id: 10, title: "value 10" },
                    { id: 20, title: "value 20" },
                    { id: 30, title: "value 30" },
                    { id: 40, title: "value 40" },
                    { id: 50, title: "value 50" },
                ].map((x) => (
                    <div
                        key={x.id}
                        className="bd-dropdown-item d-flex "
                        onClick={(e) => {
                            alert(x.id);
                        }}
                    >
                        <span className="flex-grow-1">{x.title}</span>
                        <bd.Button
                            type="button"
                            variant="text"
                            size="sm"
                            color="primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                alert(`close ${x.id}`);
                            }}
                            className="my-n1 m-e-n2"
                        >
                            <icons.Close className="size-sm" />
                        </bd.Button>
                    </div>
                ))}
            />

            <FormRow label="">
                <div>
                    <bd.Button color="primary" type="button">
                        SAVE
                    </bd.Button>
                </div>
            </FormRow>
            <FormRow label="" className="flex-grow-1 text-end">
                <div>
                    <bd.Button variant="outline" color="secondary" type="button">
                        DELETE
                    </bd.Button>
                </div>
            </FormRow>
        </>
    );
};

const DropDownTest = () => {
    return (
        <>
            <bd2.FormikInput
                label="array if {id, title}"
                name="status"
                items={[
                    { id: 1, title: "one" },
                    { id: 2, title: "tow" },
                    { id: 3, title: "three" },
                    { id: 4, title: "four" },
                    { id: 5, title: "five" },
                ]}
                width="12rem"
                type="number"
                menuTitle="+2"
                buttonTitle={<icons.MoreHoriz />}
            />

            <bd2.FormikInput label="array of numbers" name="status" items={[1, 2, 3, 4, 5]} width="12rem" type="number" />
            <bd2.FormikInput label="array of strings" name="status" items={["1", "2", "3", "4"]} width="12rem" />

            <bd2.FormikInput
                label="readOnly"
                name="status"
                items={[
                    { id: 1, title: "one" },
                    { id: 2, title: "tow" },
                    { id: 3, title: "three" },
                ]}
                width="12rem"
                type="number"
                readOnly
            />

            <bd2.FormikInput
                type="label"
                label="type = label"
                name="status"
                items={[
                    { id: 1, title: "one" },
                    { id: 2, title: "tow" },
                    { id: 3, title: "three" },
                ]}
                width="12rem"
            />

            <bd2.FormikInput
                type="select"
                label="type = select"
                name="status"
                items={[
                    { id: 1, title: "one" },
                    { id: 2, title: "tow" },
                    { id: 3, title: "three" },
                ]}
                width="12rem"
            />

            <bd2.FormikInput
                type="select"
                label="type = select & readOnly"
                name="status"
                items={[
                    { id: 1, title: "one" },
                    { id: 2, title: "tow" },
                    { id: 3, title: "three" },
                ]}
                width="12rem"
                readOnly
                trace
            />

            <bd2.FormikInput
                label="type = select & custom menu"
                name="status"
                menuTitle="more"
                menu={[
                    { id: 10, title: "one" },
                    { id: 20, title: "tow" },
                    { id: 30, title: "three" },
                    { id: 40, title: "four" },
                    { id: 50, title: "five" },
                ].map((x) => (
                    <div key={x.id} className="bd-dropdown-item d-flex " onClick={(e) => {}}>
                        <span className="flex-grow-1">{x.title}</span>
                        <icons.Close className="size-sm" />
                    </div>
                ))}
                width="12rem"
                type="select"
            />

            <bd2.FormikInput
                label="type = text & custom menu"
                name="status"
                menuTitle="more"
                menu={[
                    { id: 10, title: "one" },
                    { id: 20, title: "tow" },
                    { id: 30, title: "three" },
                    { id: 40, title: "four" },
                    { id: 50, title: "five" },
                ].map((x) => (
                    <div key={x.id} className="bd-dropdown-item d-flex " onClick={(e) => {}}>
                        <span className="flex-grow-1">{x.title}</span>
                        <icons.Close className="size-sm" />
                    </div>
                ))}
                width="12rem"
            />

            <hr />

            <select className="form-select">
                {[
                    { id: 10, title: "one" },
                    { id: 20, title: "tow" },
                    { id: 30, title: "three" },
                    { id: 40, title: "four" },
                    { id: 50, title: "five" },
                ].map((x) => (
                    <option key={x.id} value={x.id}>
                        {x.title}
                    </option>
                ))}
            </select>
        </>
    );
};
