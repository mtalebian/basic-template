import React, { useRef } from "react";
import * as bd from "react-basic-design";
import * as bd2 from "../../components/forms";
import * as icons from "../../assets/icons";
import { Text, translate } from "../../components/basic/text";
import { Modal } from "react-bootstrap";
import { gridsApi } from "../../api/grids-api";
import { notify } from "../basic/notify";
import { useAccount } from "../../app/account-context";

export const ManageForm = ({ grid, show, setShow }) => {
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

    const validate = (values) => {
        var err = {};
        function set_err(i, msg) {
            if (!err.variants) err.variants = {};
            err.variants[i] = { title: msg };
        }

        for (let i = 0; i < values.variants.length; i++) {
            const v = values.variants[i];
            var msg = validateTitle(
                v,
                values.variants.filter((x) => x !== v)
            );
            if (msg) set_err(i, msg);
        }
        return err;
    };

    function validateTitle(v, variants) {
        if (!v.title) return translate("required");
        else if (v.title.length > 100) return translate("too-long");
        else if (variants.find((x) => x.title.toLowerCase() === v.title.toLowerCase())) return translate("duplicate");
        return null;
    }

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
                <bd2.FormikForm initialValues={{ variants: grid.variants }} onSubmit={onSave} validate={validate} innerRef={formRef}>
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
