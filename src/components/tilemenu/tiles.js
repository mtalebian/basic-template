import classNames from "classnames";
import React from "react";

export function Tiles({ className, children, ...props }) {
    var cn = classNames("tilemenu", className);
    return (
        <ul className={cn} {...props}>
            {children}
        </ul>
    );
}

export function Tile({ className, title, icon, selected, onClick, isBusy, children, ...props }) {
    const is_folder = !!children;
    var cn = classNames({ "mi-folder": is_folder, "mi-menu": !is_folder });

    if (icon) icon = <i className="size-md m-e-1">{icon}</i>;
    if (title) title = <span className="mi-text">{title}</span>;

    return (
        <li className={cn}>
            <div className={classNames("mi-item", { "mi-selected": selected })}>
                {!is_folder && (
                    <div onClick={onClick} className={className}>
                        {icon}
                        {title}

                        {isBusy && (
                            <div className="busy">
                                <span className="m-e-2 spinner-grow text-info spinner-grow-sm animation-delay--0s"></span>
                                <span className="m-e-2 spinner-grow text-info spinner-grow-sm animation-delay--1s"></span>
                                <span className="m-e-2 spinner-grow text-info spinner-grow-sm animation-delay--2s"></span>
                            </div>
                        )}
                    </div>
                )}

                {is_folder && (
                    <div onClick={onClick}>
                        {icon}
                        {title}
                    </div>
                )}
            </div>

            {is_folder && <Tiles>{children}</Tiles>}
        </li>
    );
}
