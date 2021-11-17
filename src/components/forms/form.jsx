import React from "react";
import classNames from "classnames";

export const Form = ({ className, dense, children }) => {
    return (
        <div
            className={classNames(className, "bd-form row gx-3", {
                "bd-form-dense": dense,
            })}
        >
            {children}
        </div>
    );
};
