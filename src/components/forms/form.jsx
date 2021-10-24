import React from "react";
import classNames from "classnames";

export const Form = ({ className, children }) => {
    return <div className={classNames(className, "bd-form row g-3")}>{children}</div>;
};
