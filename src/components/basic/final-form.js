import React from "react";
import classNames from "classnames";
import { Field } from "react-final-form";

const cssFormGroup = (size) => (size === "sm" ? "mb-2" : "mb-3");
const cssColFormLabel = (size) => (size === "sm" ? "col-form-label col-form-label-sm" : "col-form-label");
const cssFormLabel = (size) => (size === "sm" ? "form-label form-label-sm" : "form-label");
const cssFormSelect = (size) => (size === "sm" ? "form-select form-select-sm" : "form-select");
const cssFormControl = (size, readonly) =>
    readonly
        ? size === "sm"
            ? "form-control-plaintext form-control-plaintext-sm"
            : "form-control-plaintext"
        : size === "sm"
        ? "form-control form-control-sm"
        : "form-control";

const settings = {
    displayErrorsInTitle: true,
};

function toFormControlClassNames(size, readonly, controlClassName, { input, meta }) {
    return classNames(cssFormControl(size, readonly), controlClassName, final_from_classes(input, meta));
}

function toSelectControlClassNames(size, readonly, controlClassName, { input, meta }) {
    return classNames(cssFormSelect(size), controlClassName, final_from_classes(input, meta));
}

function final_from_classes(input, meta) {
    return {
        filled: !!input.value,
        touched: !!meta.invalid,
        invalid: !!meta.invalid,
        valid: !!meta.valid,
        modified: !!meta.modified,
        pristine: !!meta.pristine,
        dirty: !!meta.dirty,
        visited: !!meta.visited,
        submitFailed: !!meta.submitFailed,
    };
}

export const FinalField = ({
    label,
    labelSize,
    name,
    renderLabel,
    renderInput,
    children,
    type,
    defaultValue,
    labelClassName,
    controlClassName,
    size,
    readonly,
    ...props
}) => {
    var c1 = labelSize * 1;
    var c2 = 12 - c1;
    var has_columns = !!c1 && c1 > 1;
    var cnLabelColumn = `col-md-${c1} ${cssColFormLabel(size)}`;
    var cnControlColumn = `col-md-${c2}`;

    const convertToNumber = (value) => (isNaN(parseFloat(value)) ? null : parseFloat(value));

    function doRenderLabel({ input, meta }) {
        if (!!renderLabel) {
            if (!has_columns) return renderLabel({ input, meta });
            return <div className={`col-md-${c1}`}>{renderLabel({ input, meta })}</div>;
        }
        var cn = classNames(labelClassName, has_columns ? cnLabelColumn : cssFormLabel(size));
        return !has_columns && !label ? null : <label className={cn}>{label}</label>;
    }

    function doRenderInput({ input, meta }) {
        if (!!renderInput) {
            if (!has_columns) return renderInput({ input, meta });
            return <div className={cnControlColumn}>{renderInput({ input, meta })}</div>;
        }
        var cn = toFormControlClassNames(size, readonly, controlClassName, {
            input,
            meta,
        });
        var args = settings.displayErrorsInTitle ? { ...props, title: meta.error } : props;
        if (readonly) args = { ...args, readOnly: true };
        var inp = <input type={type} className={cn} {...input} {...args} data-meta={1 && JSON.stringify(meta, null, 2)} />;
        return has_columns ? <div className={cnControlColumn}>{inp}</div> : inp;
    }

    function doRenderValidationError({ input, meta }) {
        return (
            meta.touched &&
            meta.error && (
                <span
                    className={classNames("validation-error", {
                        "col-12": has_columns,
                    })}
                >
                    {meta.error}
                </span>
            )
        );
    }

    var attr = !!defaultValue ? { defaultValue } : {};
    if (type === "number") attr = { ...attr, parse: convertToNumber };
    return (
        <Field name={name} component="input" type={type} {...attr}>
            {({ input, meta }) => (
                <div
                    className={classNames(cssFormGroup(size), {
                        row: has_columns,
                    })}
                >
                    {!!children ? (
                        children({ input, meta })
                    ) : (
                        <>
                            {doRenderLabel({ input, meta })}
                            {doRenderInput({ input, meta })}
                            {doRenderValidationError({ input, meta })}
                        </>
                    )}
                </div>
            )}
        </Field>
    );
};

export const FinalTextArea = ({ name, label, labelSize, labelClassName, controlClassName, size, readonly, ...props }) => {
    var c1 = labelSize * 1;
    var c2 = 12 - c1;
    var has_columns = !!c1 && c1 > 1;
    var cnLabelColumn = `col-md-${c1} ${cssColFormLabel(size)}`;
    var cnControlColumn = `col-md-${c2}`;

    function doRenderLabel({ input, meta }) {
        var cn = classNames(labelClassName, has_columns ? cnLabelColumn : cssFormLabel(size));
        return !has_columns && !label ? null : <label className={cn}>{label}</label>;
    }

    function doRenderInput({ input, meta }) {
        var cn = toFormControlClassNames(size, readonly, controlClassName, {
            input,
            meta,
        });
        var args = settings.displayErrorsInTitle ? { ...props, title: meta.error } : props;
        var inp = <textarea className={cn} {...input} {...args}></textarea>;
        return has_columns ? <div className={cnControlColumn}>{inp}</div> : inp;
    }

    function doRenderValidationError({ input, meta }) {
        return (
            meta.touched &&
            meta.error && (
                <span
                    className={classNames("validation-error", {
                        "col-12": has_columns,
                    })}
                >
                    {meta.error}
                </span>
            )
        );
    }

    return (
        <Field name={name} component="textarea">
            {({ input, meta }) => (
                <div
                    className={classNames(cssFormGroup(size), {
                        row: has_columns,
                    })}
                >
                    {doRenderLabel({ input, meta })}
                    {doRenderInput({ input, meta })}
                    {doRenderValidationError({ input, meta })}
                </div>
            )}
        </Field>
    );
};

export const FinalSelect = ({
    label,
    labelSize,
    className,
    name,
    values,
    labelClassName,
    controlClassName,
    placeholder,
    size,
    readonly,
    ...props
}) => {
    var c1 = labelSize * 1;
    var c2 = 12 - c1;
    var has_columns = !!c1 && c1 > 1;
    var cnLabelColumn = `col-md-${c1} ${cssColFormLabel(size)}`;
    var cnControlColumn = `col-md-${c2}`;

    function my_control({ input, meta }) {
        var options = !placeholder ? null : (
            <option value="" disabled>
                {placeholder}
            </option>
        );
        for (var i = 0; i < values.length; i++) {
            var v = values[i];
            var option = typeof v === "string" ? <option>{v}</option> : <option value={v.code}>{v.title}</option>;
            options = options ? (
                <>
                    {options}
                    {option}
                </>
            ) : (
                option
            );
        }
        var cn = toSelectControlClassNames(size, readonly, controlClassName, {
            input,
            meta,
        });
        var args = settings.displayErrorsInTitle ? { ...props, title: meta.error } : props;
        return (
            <select className={cn} {...input} {...args}>
                {options}
            </select>
        );
    }

    function doRenderLabel({ input, meta }) {
        var cn = classNames(labelClassName, has_columns ? cnLabelColumn : cssFormLabel(size));
        return !has_columns && !label ? null : <label className={cn}>{label}</label>;
    }

    function doRenderInput({ input, meta }) {
        var inp = my_control({ input, meta });
        return has_columns ? <div className={cnControlColumn}>{inp}</div> : inp;
    }

    function doRenderValidationError({ input, meta }) {
        return (
            meta.touched &&
            meta.error && (
                <span
                    className={classNames("validation-error", {
                        "col-12": has_columns,
                    })}
                >
                    {meta.error}
                </span>
            )
        );
    }

    return (
        <Field name={name} component="select">
            {({ input, meta }) => (
                <div
                    className={classNames(cssFormGroup(size), {
                        row: has_columns,
                    })}
                >
                    {doRenderLabel({ input, meta })}
                    {doRenderInput({ input, meta })}
                    {doRenderValidationError({ input, meta })}
                </div>
            )}
        </Field>
    );
};

const _Final_Check = ({ type, label, labelSize, name, values, inline, labelClassName, controlClassName, size, readonly, ...props }) => {
    var c1 = labelSize * 1;
    var c2 = 12 - c1;
    var has_columns = !!c1 && c1 > 1;
    var cnLabelColumn = `col-md-${c1} ${cssColFormLabel(size)}`;
    var cnControlColumn = `col-md-${c2}`;

    function doRenderLabel() {
        var title = values ? label : null;
        if (has_columns) return <span className={classNames(labelClassName, cnLabelColumn, "pt-0")}>{title}</span>;
        return !title ? null : <span className={classNames(labelClassName, "pe-2")}>{title}</span>;
    }

    function doRenderControls() {
        var c = null;
        if (!values) {
            c = (
                <label
                    className={classNames("form-check form-check-label", {
                        "form-check-inline": inline,
                    })}
                >
                    <Field name={name} component="input" type={type} className="form-check-input" {...props} />
                    <span className="form-check-label">{label}</span>
                </label>
            );
        } else {
            for (var i = 0; i < values.length; i++) {
                var item = values[i];
                var code = typeof item === "string" ? item : item.code;
                var title = typeof item === "string" ? item : item.title;
                var x = (
                    <label
                        className={classNames("form-check form-check-label", {
                            "form-check-inline": inline,
                        })}
                    >
                        <Field name={name} component="input" type={type} value={code} className="form-check-input" {...props} />
                        <span className="form-check-label">{title}</span>
                    </label>
                );
                c = !c ? (
                    x
                ) : (
                    <>
                        {c}
                        {x}
                    </>
                );
            }
        }
        return has_columns ? <div className={cnControlColumn}>{c}</div> : c;
    }

    return (
        <div className={classNames(cssFormGroup(size), { row: has_columns })}>
            {doRenderLabel()}
            {doRenderControls()}
        </div>
    );
};

//export const FinalCheck = ({ label, labelSize, name, values, inline, labelClassName, controlClassName, ...props }) => {
export const FinalCheck = ({ ...props }) => {
    return _Final_Check({ type: "checkbox", ...props });
};

export const FinalRadio = ({ ...props }) => {
    return _Final_Check({ type: "radio", ...props });
};

//
//
export const FinalSwitch = ({ type, label, labelSize, name, values, inline, labelClassName, controlClassName, size, readonly, ...props }) => {
    var c1 = labelSize * 1;
    var c2 = 12 - c1;
    var has_columns = !!c1 && c1 > 1;
    var cnLabelColumn = `col-md-${c1} ${cssColFormLabel(size)}`;
    var cnControlColumn = `col-md-${c2}`;

    function doRenderLabel() {
        var title = values ? label : null;
        if (has_columns) return <span className={classNames(labelClassName, cnLabelColumn, "pt-0")}>{title}</span>;
        return !title ? null : <span className={classNames(labelClassName, "pe-2")}>{title}</span>;
    }

    function doRenderControls() {
        var c = null;
        if (!values) {
            c = (
                <label
                    className={classNames("form-check form-check-label", {
                        "form-check-inline": inline,
                    })}
                >
                    <Field name={name} component="input" type={type} className="form-check-input" {...props} />
                    <span className="form-check-label">{label}</span>
                </label>
            );
        } else {
            for (var i = 0; i < values.length; i++) {
                var item = values[i];
                var code = typeof item === "string" ? item : item.code;
                var title = typeof item === "string" ? item : item.title;
                var x = (
                    <label
                        className={classNames("form-check form-check-label", {
                            "form-check-inline": inline,
                        })}
                    >
                        <Field name={name} component="input" type={type} value={code} className="form-check-input" {...props} />
                        <span className="form-check-label">{title}</span>
                    </label>
                );
                c = !c ? (
                    x
                ) : (
                    <>
                        {c}
                        {x}
                    </>
                );
            }
        }
        return has_columns ? <div className={cnControlColumn}>{c}</div> : c;
    }

    return (
        <div className={classNames(cssFormGroup(size), { row: has_columns })}>
            {doRenderLabel()}
            {doRenderControls()}
        </div>
    );
};
