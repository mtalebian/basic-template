import React, { useRef, useState } from "react";
import * as bd from "react-basic-design";
import * as bd2 from "../../components/forms";
import { Text } from "../../components/basic/text";
import { Form, Formik } from "formik";
import classNames from "classnames";
import { Collapse } from "react-bootstrap";
import { FormRow } from "../forms/form-row";

export const FilterBox = ({
    initialFilters,
    fixed,
    expanded,
    showSettings,
    variants,
    systemIsBusy,
    validationSchema,
    onVariantChanged,
    onExecute,
    onOpenSettings,
    onSaveVariants,
    children,
    ...props
}) => {
    const formRef = useRef();
    const [isExpanded, setIsExpanded] = useState(expanded);
    const [filtersCount, setFiltersCount] = useState(Object.keys(initialFilters ?? {}).length);
    const [curentVariant, setCurentVariant] = useState(variants && variants.length > 0 ? variants[0] : null);

    const onSubmitHandler = (e) => {
        var filters = formRef.current.values;
        console.log("onSubmit:", filters);
        onExecute(filters);
    };

    const onVariantChangedHandler = (variant) => {
        console.log("onVariantChanged:", variant);
        if (onVariantChanged) onVariantChanged(variant);
        setCurentVariant(variant);
    };

    const variantsMenu = () => (
        <bd.Menu>
            <div style={{ minWidth: 300 }}>
                {variants &&
                    variants.map((x) => (
                        <bd.MenuItem key={x.title} onClick={() => onVariantChangedHandler(x)}>
                            {x.title}
                        </bd.MenuItem>
                    ))}
                <div className="text-end px-2 pt-2 border-top mt-2">
                    <bd.Button color="primary" className="m-s-2" variant="text">
                        <Text>manage</Text>
                    </bd.Button>
                    <bd.Button color="primary" onClick={onSaveVariants}>
                        <Text>save</Text>
                    </bd.Button>
                </div>
            </div>
        </bd.Menu>
    );

    return (
        <div className="">
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

                    <ApplyButton busy={systemIsBusy} formRef={formRef} />
                    <ToggleFilterButton fixed={fixed} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                    <SettingsButton visible={showSettings} count={filtersCount} onClick={onOpenSettings} />
                </bd.Toolbar>
            )}

            <Collapse in={isExpanded}>
                <div>
                    <Formik
                        initialValues={initialFilters}
                        // validationSchema={yup.object({
                        //     f1: yup.string().required(),
                        //     f2: yup.string().required(),
                        // })}
                        onSubmit={onSubmitHandler}
                        innerRef={formRef}
                        validate={(values) => {
                            var keys = Object.keys(values ?? {}).filter((x) => !!values[x]);
                            setFiltersCount(keys.length);
                        }}
                    >
                        <Form>
                            <bd2.Form dense className={classNames("mx-2 mt-2")}>
                                {children}
                                {!variants && (
                                    <FormRow label="" className="flex-grow-1 text-end" style={{ width: "auto" }}>
                                        <ApplyButton busy={systemIsBusy} formRef={formRef} />
                                        <SettingsButton visible={showSettings} count={filtersCount} onClick={onOpenSettings} />
                                    </FormRow>
                                )}
                            </bd2.Form>
                        </Form>
                    </Formik>
                </div>
            </Collapse>
        </div>
    );
};

const ApplyButton = ({ busy, formRef }) => (
    <bd.Button color="primary" size="md" disabled={busy} onClick={(e) => formRef.current.submitForm()} className="densed m-e-2">
        <Text>apply-filter</Text>
    </bd.Button>
);

const ToggleFilterButton = ({ fixed, isExpanded, setIsExpanded }) => {
    return (
        !fixed && (
            <bd.Button variant="text" color="primary" size="md" onClick={() => setIsExpanded(!isExpanded)} className="densed">
                <Text>{isExpanded ? "hide-filters" : "show-filters"}</Text>
            </bd.Button>
        )
    );
};

const SettingsButton = ({ visible, count, onClick }) =>
    visible && (
        <bd.Button variant="text" color="primary" size="md" onClick={onClick} className="densed" edge="end">
            <Text count={count}>filters (@count)</Text>
        </bd.Button>
    );
