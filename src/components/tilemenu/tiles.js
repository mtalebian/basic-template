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

export function Tile({ title, icon, className, selected, onClick, children, ...props }) {
    const is_folder = !!children;
    var cn = classNames("", className, { "mi-folder": is_folder, "mi-menu": !is_folder });

    if (icon) icon = <i className="size-md">{icon}</i>;
    if (title) title = <span className="mi-text">{title}</span>;

    return (
        <li className={cn}>
            <div className="mi-item">
                {!is_folder && (
                    <a href="#/" onClick={onClick} className={classNames("", { "mi-selected": selected })}>
                        {icon}
                        {title}
                    </a>
                )}

                {is_folder && (
                    <div>
                        {icon}
                        {title}
                    </div>
                )}
            </div>

            {is_folder && <Tiles>{children}</Tiles>}
        </li>
    );
}
