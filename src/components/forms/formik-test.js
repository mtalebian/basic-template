import React from "react";
import * as bd2 from "./index.js";
import * as icons from "../../assets/icons";

export function FormikTest() {
    return (
        <bd2.FormikForm initialValues={{ status: 1 }} onSubmit={(values) => alert("submited")} dense>
            <bd2.FormikInput className="m-3" label="text" name="status" width="12rem" />

            <bd2.FormikInput
                className="m-3"
                label="custom menu"
                name="status"
                menu={[
                    { id: 10, title: "one" },
                    { id: 20, title: "tow" },
                    { id: 30, title: "three" },
                    { id: 40, title: "four" },
                    { id: 50, title: "five" },
                ].map((x) => (
                    <div key={x.id} className="bd-dropdown-item d-flex " onclick={(e) => {}}>
                        <span className="flex-grow-1">{x.title}</span>
                        <icons.Close />
                    </div>
                ))}
                width="12rem"
            />

            <bd2.FormikInput
                className="m-3"
                label="array if {id, title}"
                name="status"
                menu={[
                    { id: 1, title: "one" },
                    { id: 2, title: "tow" },
                    { id: 3, title: "three" },
                    { id: 4, title: "four" },
                    { id: 5, title: "five" },
                ]}
                width="12rem"
            />

            <bd2.FormikInput className="m-3" label="array of numbers" name="status" menu={[1, 2, 3, 4, 5]} width="12rem" />
            <bd2.FormikInput className="m-3" label="array of strings" name="status" menu={["1", "2", "3", "4"]} width="12rem" />
            <bd2.FormikInput className="m-3" label="readOnly" name="status" menu={["1", "2", "3", "4"]} width="12rem" readOnly />

            <bd2.FormikInput type="label" className="m-3" label="type = label" name="status" menu={["1", "2", "3", "4"]} width="12rem" />

            <bd2.FormikInput type="select" className="m-3" label="type = select" name="status" menu={["1", "2", "3", "4"]} width="12rem" />
        </bd2.FormikForm>
    );
}
