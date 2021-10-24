import classNames from "classnames";
import React from "react";

export const Input = ({ icon, btnIcon, onBtnClick, type, className, ...props }) => {
    if (!type) type = "text";
    return (
        <div className={classNames(className, "bd-input")}>
            {icon && <span className="bd-input-icon">{icon}</span>}
            <input tyep={type} {...props} />
            <span className="bd-input-btn" onClick={onBtnClick}>
                {btnIcon}
            </span>
        </div>
    );
};
