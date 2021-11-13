import React, { useRef, useState } from "react";
import * as bd from "react-basic-design";
import * as bd2 from "../../components/forms";
import { Text } from "../../components/basic/text";
import { Collapse, Modal } from "react-bootstrap";
import { FormRow } from "../forms/form-row";
import { useReactTable } from "../table/use-react-table";

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
    children,
    ...props
}) => {
    const formRef = useRef();
    const [isExpanded, setIsExpanded] = useState(expanded);
    const [filtersCount, setFiltersCount] = useState(Object.keys(initialFilters ?? {}).length);
    const [currentVariant, setCurrentVariant] = useState(variants && variants.length > 0 ? variants[0] : { title: "test" });
    const [showSaveAs, setShowSaveAs] = useState(false);
    const [showManage, setShowManage] = useState(false);
    const [editVariant, setEditVariant] = useState(null);

    const isChanged = !currentVariant || currentVariant.filters !== "";

    const onSubmitHandler = (e) => {
        var filters = formRef.current.values;
        onExecute(filters);
    };

    const onVariantChangedHandler = (variant) => {
        if (onVariantChanged) onVariantChanged(variant);
        setCurrentVariant(variant);
    };

    const onSave = (variant) => {
        console.log("onsave", variant);
        var s = JSON.stringify(variant, null, 2);
        alert(s);
    };

    const onManageSave = (variant) => {
        console.log("onsave", variant);
        var s = JSON.stringify(variant, null, 2);
        alert(s);
    };

    const onMnageDelete = (variant) => {
        console.log("onsave", variant);
        var s = JSON.stringify(variant, null, 2);
        alert(s);
    };

    const manageVariants = () => {};

    const variantsMenu = () => (
        <bd.Menu>
            <div style={{ minWidth: 320 }}>
                <div style={{ minHeight: 180 }}>
                    {variants.map((x) => (
                        <bd.MenuItem key={x.title} onClick={() => onVariantChangedHandler(x)}>
                            {x.title}
                        </bd.MenuItem>
                    ))}
                </div>
                <div className="px-2 pt-2 border-top mt-2 d-flex justify-content-end gap-x-2 bd-form-compact">
                    <bd.Button color="primary" variant="text" onClick={() => setShowManage(true)}>
                        <Text>manage</Text>
                    </bd.Button>
                    <bd.Button color="primary" variant={isChanged ? "text" : null} onClick={(e) => setShowSaveAs(true)}>
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

    return (
        <div className="">
            {variants && (
                <bd.Toolbar>
                    <bd.Button
                        variant="text"
                        className="btn-lg p-s-0 bg-transparent edge-start"
                        color="primary"
                        menu={variantsMenu()}
                        disableRipple
                    >
                        {currentVariant?.title}
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
                        {!variants && (
                            <FormRow label="" className="flex-grow-1 text-end" style={{ width: "auto" }}>
                                <ApplyButton busy={systemIsBusy} formRef={formRef} />
                                <SettingsButton visible={showSettings} count={filtersCount} onClick={onOpenSettings} />
                            </FormRow>
                        )}
                    </bd2.FormikForm>
                </div>
            </Collapse>

            <SaveAsForm currentVariant={currentVariant} show={showSaveAs} setShow={setShowSaveAs} onSave={onSave} />
            <ManageForm variants={variants} show={showManage} setShow={setShowManage} onSave={onManageSave} onDelete={onMnageDelete} />
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
            <bd2.FormikForm initialValues={currentVariant} onSubmit={onSave}>
                <Modal.Header>
                    <Modal.Title>
                        <Text>save-view</Text>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <bd2.FormikInput name="title" label={<Text>view</Text>} autoFocus />
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

const ManageForm = ({ variants, show, setShow, onSave, onDelete }) => {
    const [data, setData] = useState(variants);
    const columns = [];

    const updateData = (rowIndex, columnId, value) => {
        const new_row = { ...data[rowIndex], [columnId]: value };
        setData(data.map((row, index) => (index === rowIndex ? new_row : row)));
    };
    const tableApi = useReactTable({ columns: [], data: [], updateData, flexLayout: true });

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
            <Modal.Body></Modal.Body>
            <Modal.Footer className="d-flex justify-content-end gap-x-2 bd-form-compact">
                <bd.Button color="primary" type="submit">
                    <Text>save</Text>
                </bd.Button>
                <bd.Button color="primary" type="button" variant="text" onClick={(e) => setShow(false)}>
                    <Text>cancel</Text>
                </bd.Button>
            </Modal.Footer>
        </Modal>
    );
};
