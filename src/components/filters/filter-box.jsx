import React, { useRef, useState } from "react";
import * as bd from "react-basic-design";
import * as bd2 from "../../components/forms";
import { Text } from "../../components/basic/text";
import { Form, Formik } from "formik";
import classNames from "classnames";

export const FilterBox = ({ initialFilters, variants, systemIsBusy, onVariantChanged, onExecute, children, ...props }) => {
    const formRef = useRef();
    const [curentVariant, setCurentVariant] = useState(variants && variants.length > 0 ? variants[0] : null);

    const onSubmitHandler = (e) => {
        var filters = formRef.current.values;
        console.log("onSubmit:", filters);
        onExecute(filters);
    };

    const onVariantChangedHandler = (variant) => {
        console.log("onVariantChanged:", variant);
        if (onVariantChanged) onVariantChanged(variant);
    };

    const variantsMenu = () => (
        <bd.Menu>
            <div style={{ minWidth: 300 }}>
                {variants.map((x) => (
                    <bd.MenuItem key={x.title} onClick={() => onVariantChangedHandler(x)}>
                        {x.title}
                    </bd.MenuItem>
                ))}
                <div className="text-end px-2 pt-2 border-top mt-2">
                    <bd.Button color="primary" className="m-s-2" variant="text">
                        <Text>manage</Text>
                    </bd.Button>
                    <bd.Button color="primary">
                        <Text>save</Text>
                    </bd.Button>
                </div>
            </div>
        </bd.Menu>
    );

    return (
        <div>
            {curentVariant && (
                <bd.Toolbar>
                    <bd.Button
                        variant="text"
                        className="btn-lg p-s-0 bg-transparent edge-start"
                        color="primary"
                        menu={variantsMenu()}
                        disableRipple
                    >
                        {curentVariant.title}
                    </bd.Button>

                    <div className="flex-grow-1"></div>

                    <bd.Button
                        color="primary"
                        size="md"
                        disabled={systemIsBusy}
                        className="m-e-2"
                        onClick={(e) => formRef.current.submitForm()}
                    >
                        <Text>apply-filter</Text>
                    </bd.Button>

                    <bd.Button variant="outline" color="primary" size="md" disabled={systemIsBusy}>
                        <Text>filters</Text>
                    </bd.Button>
                </bd.Toolbar>
            )}

            <Formik
                initialValues={initialFilters}
                // validationSchema={yup.object({
                //     title: yup.string().min(3, t("msg-too-short")).max(100, t("msg-too-long")).required("Required"),
                // })}
                onSubmit={onSubmitHandler}
                innerRef={formRef}
            >
                <Form>
                    <bd2.Form className={classNames("mx-2", { "mt-0": !variants })}>{children}</bd2.Form>
                </Form>
            </Formik>
        </div>
    );
};
