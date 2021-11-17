import React, { useCallback, useEffect, useRef, useState } from "react";
import * as bd from "react-basic-design";
import * as bd2 from "../../components/forms";
import * as icons from "../../assets/icons";
import { Text, translate } from "../../components/basic/text";
import { Collapse } from "react-bootstrap";
import { FormRow } from "../forms/form-row";
import { gridsApi } from "../../api/grids-api";
import { notify } from "../basic/notify";
import classNames from "classnames";
import { useAccount } from "../../app/account-context";
import { ManageForm } from "./manage-form";
import { SaveAsForm } from "./save-as-form";
import { Filter } from "./filter";

export const FilterBox = ({
    grid,
    fixed,
    expanded,
    showSettings,
    systemIsBusy,
    validationSchema,
    onVariantChanged,
    onExecute,
    onOpenSettings,
    children,
    ...props
}) => {
    const formRef = useRef();
    const account = useAccount();
    const [isExpanded, setIsExpanded] = useState(expanded);
    const [filtersCount, setFiltersCount] = useState(0);
    const [currentVariant, setCurrentVariant] = useState();
    const [showSaveAs, setShowSaveAs] = useState(false);
    const [showManage, setShowManage] = useState(false);

    const isChanged = currentVariant && currentVariant.createdBy === account.userName;

    const closeAllDropdowns = () => {
        var elems = document.querySelectorAll(".dropdown.show");
        [].forEach.call(elems, function (el) {
            el.classList.remove("show");
        });
        [].forEach.call(document.querySelectorAll(".dropdown-menu.show"), function (el) {
            el.classList.remove("show");
        });
    };

    const saveAsClickHandler = (e) => {
        closeAllDropdowns();
        setShowSaveAs(true);
    };
    const manageClickHandler = (e) => {
        closeAllDropdowns();
        setShowManage(true);
    };

    const onSubmitHandler = (e) => {
        var filters = formRef.current.values;
        console.log("filters", filters);
        onExecute(filters);
    };

    const onVariantChangedHandler = useCallback(
        (variant) => {
            setCurrentVariant(variant);
            let filters = variant?.filtersData ?? "{}";
            filters = JSON.parse(filters);
            formRef.current.setValues(filters);
            if (variant.autoApply) {
                setTimeout(() => formRef.current.submitForm(), 0);
            }
            if (onVariantChanged) onVariantChanged(variant);
        },
        [onVariantChanged]
    );

    useEffect(() => {
        if (!!currentVariant) return;
        var v = grid.getDefaultVariant();
        if (!v) return;
        onVariantChangedHandler(v);
    }, [currentVariant, grid, onVariantChangedHandler]);

    const onSave = (variant) => {
        closeAllDropdowns();
        var filters = formRef.current.values;
        variant.filtersData = JSON.stringify(filters);
        gridsApi
            .saveVaraint(grid.id, variant)
            .then((x) => {
                setShowSaveAs(false);
                notify.success(<Text>saved</Text>);
            })
            .catch(notify.error);
    };

    const variantsMenu = () => (
        <bd.Menu>
            <div style={{ minWidth: 300 }}>
                <div style={{ minHeight: 150 }}>
                    {grid.variants.map((x) => (
                        <bd.MenuItem
                            key={x.serial}
                            onClick={() => onVariantChangedHandler(x)}
                            className={classNames("d-flex justify-content-between", {
                                active: x.serial === currentVariant?.serial,
                                "fw-bold": x.isDefault,
                            })}
                        >
                            {x.title}
                            {x.autoApply && <icons.Refresh className="m-s-3 size-md" style={{ opacity: 0.75 }} />}
                        </bd.MenuItem>
                    ))}
                </div>
                <div className="px-2 pt-2 border-top mt-2 d-flex justify-content-end gap-x-2 bd-form-compact">
                    <bd.Button color="primary" variant="text" onClick={manageClickHandler}>
                        <Text>manage</Text>
                    </bd.Button>

                    <bd.Button color="primary" variant={isChanged ? "text" : null} onClick={saveAsClickHandler}>
                        <Text>save-as</Text>
                    </bd.Button>

                    {isChanged && (
                        <bd.Button color="primary" onClick={(e) => onSave(currentVariant)}>
                            <Text>save</Text>
                        </bd.Button>
                    )}
                </div>
            </div>
        </bd.Menu>
    );

    function getInitialFilter() {
        var f = currentVariant?.filtersData;
        return !f ? {} : JSON.parse(f);
    }

    function hasFilter(v) {
        if (typeof v === "string") return !!v;
        if (Array.isArray(v)) {
            for (let i = 0; i < v.length; i++) {
                if (hasFilter(v[i])) return true;
            }
            return false;
        }
        return v !== undefined && v !== null;
    }

    function isString(col) {
        var d = col.display;
        return !d || d === "text" || d === "email" || d === "url" || d === "textarea";
    }

    console.log("grid.dataColumns", grid.dataColumns);

    /****************************/
    return (
        <div className="bd-form-compact pt-2">
            {grid.hasFilterVariant && (
                <bd.Toolbar className="px-0" size="sm">
                    <bd.Button variant="text" className="btn-lg p-s-0 bg-transparent" color="primary" menu={variantsMenu()} disableRipple>
                        {grid.variants.find((x) => x.serial === currentVariant?.serial)?.title}
                    </bd.Button>

                    <div className="flex-grow-1"></div>

                    <ApplyButton busy={systemIsBusy} formRef={formRef} />
                    <ToggleFilterButton fixed={fixed} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                    <SettingsButton visible={showSettings} count={filtersCount} onClick={onOpenSettings} />
                </bd.Toolbar>
            )}

            <Collapse in={isExpanded}>
                <div>
                    <bd2.FormikForm
                        initialValues={getInitialFilter()}
                        validationSchema={validationSchema}
                        onSubmit={onSubmitHandler}
                        innerRef={formRef}
                        validate={(values) => {
                            var keys = Object.keys(values).filter((x) => hasFilter(values[x]));
                            setFiltersCount(keys.length);
                            //---
                            let errors = {};
                            let filterColumns = grid.dataColumns.filter((x) => x.filter && x.filterRequired);
                            for (let i = 0; i < filterColumns.length; i++) {
                                const col = filterColumns[i];
                                if (!hasFilter(values[col.name])) {
                                    var err_required = translate("required");
                                    errors[col.name] = col.filter === "simple" ? err_required : [err_required];
                                }
                            }
                            return errors;
                        }}
                        flex
                        compact
                    >
                        {grid.dataColumns
                            .filter((x) => x.filter)
                            .map((x) => (
                                <Filter
                                    key={x.name}
                                    name={x.name}
                                    label={x.title}
                                    width="12rem"
                                    simple={x.filter === "simple"}
                                    isString={isString(x)}
                                    checkTable={x.checkGrid}
                                />
                            ))}
                        {children}
                        {!grid.hasFilterVariant && (
                            <FormRow label="" className="flex-grow-1 text-end" style={{ width: "auto" }}>
                                <ApplyButton busy={systemIsBusy} formRef={formRef} />
                                <SettingsButton visible={showSettings} count={filtersCount} onClick={onOpenSettings} />
                            </FormRow>
                        )}
                    </bd2.FormikForm>
                </div>
            </Collapse>

            <SaveAsForm grid={grid} formRef={formRef} currentVariant={currentVariant} show={showSaveAs} setShow={setShowSaveAs} />
            <ManageForm grid={grid} show={showManage} setShow={setShowManage} />
        </div>
    );
};

const ApplyButton = ({ busy, formRef }) => (
    <bd.Button color="primary" size="md" disabled={busy} className="densed m-e-2">
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
