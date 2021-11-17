import React from "react";
import * as icons from "../../assets/icons";

export const FilterX = ({ count, ...props }) => {
    switch (count) {
        case 0:
            return <icons.FilterNone {...props} />;
        case 1:
            return <icons.Filter1 {...props} />;
        case 2:
            return <icons.Filter2 {...props} />;
        case 3:
            return <icons.Filter3 {...props} />;
        case 4:
            return <icons.Filter4 {...props} />;
        case 5:
            return <icons.Filter5 {...props} />;
        case 6:
            return <icons.Filter6 {...props} />;
        case 7:
            return <icons.Filter7 {...props} />;
        case 8:
            return <icons.Filter8 {...props} />;
        case 9:
            return <icons.Filter9 {...props} />;

        default:
            return <icons.Filter9Plus {...props} />;
    }
};
