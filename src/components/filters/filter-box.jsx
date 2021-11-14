import React, { useRef, useState } from "react";
import * as bd from "react-basic-design";
import * as bd2 from "../../components/forms";
import * as icons from "../../assets/icons";
import { Text } from "../../components/basic/text";
import { Collapse, Modal } from "react-bootstrap";
import { FormRow } from "../forms/form-row";
import { gridsApi } from "../../api/grids-api";
import { notify } from "../basic/notify";
import classNames from "classnames";
import { useAccount } from "../../app/account-context";

export const FilterBox = ({
    grid,
    initialFilters,
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
    const [filtersCount, setFiltersCount] = useState(Object.keys(initialFilters ?? {}).length);
    const [currentVariant, setCurrentVariant] = useState(grid.getDefaultVariant());
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

    const onSubmitHandler = (e) => {
        var filters = formRef.current.values;
        onExecute(filters);
    };

    const onVariantChangedHandler = (variant) => {
        if (onVariantChanged) onVariantChanged(variant);
        setCurrentVariant(variant);
        let filters = variant?.filtersData ?? "{}";
        filters = JSON.parse(filters);
        formRef.current.setValues(filters);
    };

    const onSaveAs = (variant) => {
        var filters = formRef.current.values;
        variant.filtersData = JSON.stringify(filters);
        gridsApi
            .saveVaraint(grid.id, variant)
            .then((x) => {
                grid.variants.push(x);
                setShowSaveAs(false);
                notify.success(<Text>saved</Text>);
            })
            .catch(notify.error);
    };

    const onSave = (variant) => {
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
            <div style={{ minWidth: 320 }}>
                <div style={{ minHeight: 180 }}>
                    {grid.variants.map((x) => (
                        <bd.MenuItem
                            key={x.title}
                            onClick={() => onVariantChangedHandler(x)}
                            className={classNames({ active: x.serial === currentVariant?.serial })}
                        >
                            {x.title}
                        </bd.MenuItem>
                    ))}
                </div>
                <div className="px-2 pt-2 border-top mt-2 d-flex justify-content-end gap-x-2 bd-form-compact">
                    <bd.Button
                        color="primary"
                        variant="text"
                        onClick={() => {
                            closeAllDropdowns();
                            setShowManage(true);
                        }}
                    >
                        <Text>manage</Text>
                    </bd.Button>
                    <bd.Button
                        color="primary"
                        variant={isChanged ? "text" : null}
                        onClick={(e) => {
                            closeAllDropdowns();
                            setShowSaveAs(true);
                        }}
                    >
                        <Text>save-as</Text>
                    </bd.Button>
                    {isChanged && (
                        <bd.Button
                            color="primary"
                            onClick={(e) => {
                                closeAllDropdowns();
                                onSave(currentVariant);
                            }}
                        >
                            <Text>save</Text>
                        </bd.Button>
                    )}
                </div>
            </div>
        </bd.Menu>
    );

    /****************************/
    return (
        <div className="">
            {grid.variants && (
                <bd.Toolbar>
                    <bd.Button
                        variant="text"
                        className="btn-lg p-s-0 bg-transparent edge-start"
                        color="primary"
                        menu={variantsMenu()}
                        disableRipple
                    >
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
                        initialValues={initialFilters}
                        validationSchema={validationSchema}
                        onSubmit={onSubmitHandler}
                        innerRef={formRef}
                        validate={(values) => {
                            var keys = Object.keys(values ?? {}).filter((x) => !!values[x]);
                            setFiltersCount(keys.length);
                        }}
                        flex
                        compact
                        className="mt-2"
                    >
                        {children}
                        {!grid.variants && (
                            <FormRow label="" className="flex-grow-1 text-end" style={{ width: "auto" }}>
                                <ApplyButton busy={systemIsBusy} formRef={formRef} />
                                <SettingsButton visible={showSettings} count={filtersCount} onClick={onOpenSettings} />
                            </FormRow>
                        )}
                    </bd2.FormikForm>
                </div>
            </Collapse>

            <SaveAsForm currentVariant={currentVariant} show={showSaveAs} setShow={setShowSaveAs} onSave={onSaveAs} />
            <ManageForm grid={grid} show={showManage} setShow={setShowManage} />
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

const SaveAsForm = ({ currentVariant, show, setShow, onSave }) => {
    return (
        <Modal show={show} fullscreen="md-down" onHide={() => setShow(false)} className="bd-form-compact" dialogClassName="shadow-5">
            <bd2.FormikForm initialValues={{ ...(currentVariant ?? {}), serial: 0 }} onSubmit={onSave}>
                <Modal.Header>
                    <Modal.Title>
                        <Text>save-view</Text>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <bd2.FormikInput name="title" label={<Text>view</Text>} autoFocus />
                    <bd2.FormikToggle size="sm" name="isDefault" toggleLabel={<Text>default</Text>} className="d-block" />
                    <bd2.FormikToggle size="sm" name="isPublic" toggleLabel={<Text>public</Text>} className="d-block" />
                    <bd2.FormikToggle size="sm" name="autoApply" toggleLabel={<Text>apply-automatically</Text>} />
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-end gap-x-2 bd-form-compact">
                    <bd.Button color="primary" type="submit">
                        <Text>save</Text>
                    </bd.Button>
                    <bd.Button color="primary" type="button" variant="text" onClick={(e) => setShow(false)}>
                        <Text>cancel</Text>
                    </bd.Button>
                </Modal.Footer>
            </bd2.FormikForm>
        </Modal>
    );
};

const ManageForm = ({ grid, show, setShow }) => {
    const formRef = useRef();
    const account = useAccount();

    const canChange = (x) => account.userName === x.createdBy; // || account.userName === "admin";

    const onDelete = (variant) => {
        gridsApi
            .deleteVariant(variant.serial)
            .then(() => {
                const list = formRef.current.values.variants.filter((x) => x.serial !== variant.serial);
                grid.variants = list;
                formRef.current.setFieldValue("variants", list);
                notify.dark(<Text>variant-is-deleted</Text>);
            })
            .catch(notify.error);
    };

    const onSave = (values) => {
        gridsApi
            .updateVaraints(grid.id, values.variants)
            .then(() => {
                grid.variants = values.variants;
                setShow(false);
                notify.success(<Text>variant-is-updated</Text>);
            })
            .catch(notify.error);
    };

    return (
        <Modal
            show={show}
            fullscreen="lg-down"
            onHide={() => setShow(false)}
            className="bd-form-compact"
            dialogClassName="shadow-5"
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <Text>manage-views</Text>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-0 bd-table-border-row">
                <bd2.FormikForm initialValues={{ variants: grid.variants }} onSubmit={onSave} innerRef={formRef}>
                    {({ values }) => (
                        <table className="bd-table w-100">
                            <thead>
                                <tr>
                                    <th>
                                        <Text>default</Text>
                                    </th>
                                    <th className="w-50">
                                        <Text>title</Text>
                                    </th>
                                    <th>
                                        <Text>public</Text>
                                    </th>
                                    <th>
                                        <Text>auto-apply</Text>
                                    </th>
                                    <th>
                                        <Text>created-by</Text>
                                    </th>

                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {values.variants.map((x, xIndex) => (
                                    <React.Fragment key={x.serial}>
                                        {canChange(x) && (
                                            <tr style={{ verticalAlign: "middle" }}>
                                                <td>
                                                    <bd2.FormikToggle
                                                        name={`variants[${xIndex}].isDefault`}
                                                        color="primary"
                                                        size="sm"
                                                        disableRipple
                                                    />
                                                </td>
                                                <td className="p-1">
                                                    <bd2.FormikInput name={`variants[${xIndex}].title`} />
                                                </td>
                                                <td>
                                                    <bd2.FormikToggle
                                                        name={`variants[${xIndex}].isPublic`}
                                                        color="primary"
                                                        size="sm"
                                                        disableRipple
                                                    />
                                                </td>
                                                <td>
                                                    <bd2.FormikToggle
                                                        name={`variants[${xIndex}].autoApply`}
                                                        color="primary"
                                                        size="sm"
                                                        disableRipple
                                                    />
                                                </td>
                                                <td>{x.createdBy.toUpperCase()}</td>
                                                <td className="p-1">
                                                    <bd.Button
                                                        variant="icon"
                                                        type="button"
                                                        size="md"
                                                        color="primary"
                                                        onClick={() => onDelete(x)}
                                                    >
                                                        <icons.Delete />
                                                    </bd.Button>
                                                </td>
                                            </tr>
                                        )}
                                        {!canChange(x) && (
                                            <tr>
                                                <td>
                                                    <bd.Toggle model={x.isDefault} size="sm" disableRipple disabled />
                                                </td>
                                                <td>{x.title}</td>
                                                <td>
                                                    <bd.Toggle model={x.isPublic} size="sm" disableRipple disabled />
                                                </td>
                                                <td>
                                                    <bd.Toggle model={x.autoApply} size="sm" disableRipple disabled />
                                                </td>
                                                <td className="text-secondary-text">{x.createdBy.toUpperCase()}</td>
                                                <td></td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    )}
                </bd2.FormikForm>
            </Modal.Body>

            <Modal.Footer className="border-0 d-flex justify-content-end gap-x-2 bd-form-compact">
                <bd.Button color="primary" onClick={() => formRef.current.submitForm()}>
                    <Text>save</Text>
                </bd.Button>
                <bd.Button color="primary" type="button" variant="text" onClick={(e) => setShow(false)}>
                    <Text>cancel</Text>
                </bd.Button>
            </Modal.Footer>
        </Modal>
    );
};
