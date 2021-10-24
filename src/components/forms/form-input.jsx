import classNames from "classnames";
import React from "react";
import * as bd from "react-basic-design";

export const FormInput = ({ className, label, labelSize, labelClassName, btnIcon, onBtnClick, type, inputClassName, ...props }) => {
    const cnInput = classNames("form-control", { "has-icon": btnIcon });
    const lbl = <label className="form-label">{label}</label>;
    //const inp = <Input className={inputClassName} icon={icon} btnIcon={btnIcon} />;
    const inp = (
        <div className="bd-input">
            {btnIcon && (
                <span className="icon size-md" onClick={onBtnClick}>
                    {btnIcon}
                </span>
            )}
            <input className={cnInput} type="text" />
        </div>
    );
    return (
        <div className={classNames(className, "bd-form-input col")}>
            {lbl}
            {inp}
        </div>
    );
};
