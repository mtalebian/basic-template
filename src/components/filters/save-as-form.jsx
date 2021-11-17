import React from "react";
import * as bd from "react-basic-design";
import * as bd2 from "../../components/forms";
import { Text, translate } from "../../components/basic/text";
import { Modal } from "react-bootstrap";
import { gridsApi } from "../../api/grids-api";
import { notify } from "../basic/notify";

export const SaveAsForm = ({ grid, formRef, currentVariant, show, setShow }) => {
    const onSave = (variant) => {
        var filters = formRef.current.values;
        variant.filtersData = JSON.stringify(filters);
        gridsApi
            .saveVaraint(grid.id, variant)
            .then((x) => {
                grid.variants.push(x);
                setShow(false);
                notify.success(<Text>saved</Text>);
            })
            .catch(notify.error);
    };

    const validate = (values) => {
        const errors = {};

        if (!values.title) errors.title = translate("required");
        else if (values.title.length > 100) errors.title = translate("too-long");
        else if (grid.variants.find((x) => x.title.toLowerCase() === values.title.toLowerCase())) errors.title = translate("duplicate");

        return errors;
    };

    return (
        <Modal show={show} fullscreen="md-down" onHide={() => setShow(false)} className="bd-form-compact" dialogClassName="shadow-5">
            <bd2.FormikForm initialValues={{ ...(currentVariant ?? {}), serial: 0 }} onSubmit={onSave} validate={validate}>
                <Modal.Header>
                    <Modal.Title>
                        <Text>save-view</Text>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <bd2.FormikInput name="title" label={<Text>title</Text>} autoFocus />
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
