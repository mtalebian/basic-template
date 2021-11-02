import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { FormikInput } from ".";
import * as icons from "../../assets/icons";

export const Dropdown = ({ title, multiSelect, list, isSelect, onToggle, ...props }) => {
    const [state, setState] = useState({ isOpen: false, headerTitle: title });

    const toggleList = () => setState({ ...state, isOpen: !state.isOpen });

    const selectItem = (item) => {
        setState({ headerTitle: title, isOpen: false });
        ontoggle(item);
    };

    const close = () => state.isOpen && setState({ ...state, isOpen: false });

    useEffect(() => {
        if (!state.isOpen) return;
        window.addEventListener("click", close);
        return () => {
            window.removeEventListener("click", close);
        };
    });

    return (
        <div className="bd-dropdown">
            <FormikInput label="label" button1={{ icon: <icons.ArrowDropDown />, action: toggleList }} />

            {state.isOpen && (
                <div className="bd-dropdown-list">
                    {list.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className={classNames("bd-dropdown-item", { selected: item.selected })}
                            onClick={(e) => {
                                e.stopPropagation();
                                selectItem(item);
                            }}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
