import React from "react";

export const FilterBox = ({ className, maxWidth, children }) => {
    return (
        <div className={className} style={{ maxWidth }}>
            {children}
        </div>
    );
};
