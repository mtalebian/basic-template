import React, { useState, useContext } from "react";
import classNames from "classnames";

import "./index.scss";
import { ThemeContext } from "../../app/theme-context";
import { themeManager } from "../../app/theme-manager";

export default function BasicLayout({
    layout,
    className,
    breakPoint,
    header,
    content,
    sidebar,
    footer,
    scrollableContent,
    rtl,
    ...props
}) {
    const [toggled, setToggled] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [theme] = useContext(ThemeContext);

    function print(element) {
        if (!element) return null;
        if (typeof element === "string") return element;
        const Component = element;
        return (
            <Component
                toggled={toggled}
                onToggle={toggle}
                collapsed={collapsed}
                onCollapse={collapse}
                rtl={rtl}
                scrollableContent={scrollableContent}
                breakPoint={breakPoint}
                {...props}
            />
        );
    }

    const toggle = () => {
        setToggled(!toggled);
        //var p = e.target.parentNode.parentNode.parentNode;
        //var s = p.getElementsByClassName("sidebar")[0];
        //s && s.classList.toggle("toggled");
    };

    const collapse = () => {
        setCollapsed(!collapsed);
        //e.target.parentNode.classList.toggle("collapsed");
    };

    if (breakPoint) breakPoint = "break-point-" + breakPoint;

    var cn_theme = themeManager.getCss(theme).join(" ");
    var h = <div className="header">{print(header)}</div>;
    var m = <main className="content">{print(content)}</main>;
    var s = (
        <>
            <aside
                className={classNames(`sidebar ${breakPoint}`, {
                    collapsed: collapsed,
                    toggled: toggled,
                })}
            >
                {print(sidebar)}
            </aside>
        </>
    );
    var f = <footer className="footer">{print(footer)}</footer>;

    switch (layout) {
        case "hmf":
            return (
                <>
                    <div
                        className={classNames(className, "layout", cn_theme, {
                            "scrollable-content": scrollableContent,
                            rtl,
                        })}
                    >
                        {h}
                        {m}
                        {f}
                    </div>
                    <div className="background-layer"></div>
                    <div className="notif-container"></div>
                </>
            );

        case "h.sm.f":
            return (
                <>
                    <div
                        className={classNames(className, "layout", {
                            "scrollable-content": scrollableContent,
                            rtl,
                        })}
                    >
                        {h}
                        <div className="layout has-sidebar">
                            {s}
                            {m}
                            <div className="overlay" onClick={toggle}></div>
                        </div>
                        {f}
                    </div>
                    <div className="notif-container"></div>
                </>
            );

        case "s.hm.f":
            return (
                <>
                    <div
                        className={classNames(className, "layout", cn_theme, {
                            "scrollable-content": scrollableContent,
                            rtl,
                        })}
                    >
                        <div className="layout has-sidebar">
                            {s}
                            <div className="layout">
                                {h}
                                {m}
                            </div>
                            <div className="overlay" onClick={toggle}></div>
                        </div>
                        {f}
                    </div>
                    <div className="notif-container"></div>
                </>
            );

        case "h.s.mf":
            return (
                <>
                    <div
                        className={classNames(className, "layout", cn_theme, {
                            "scrollable-content": scrollableContent,
                            rtl,
                        })}
                    >
                        {h}
                        <div className="layout has-sidebar">
                            {s}
                            <div className="layout">
                                {m}
                                {f}
                            </div>
                            <div className="overlay" onClick={toggle}></div>
                        </div>
                    </div>
                    <div className="notif-container"></div>
                </>
            );

        case "s.hmf":
            return (
                <>
                    <div
                        className={classNames(
                            className,
                            "layout has-sidebar",
                            cn_theme,
                            { "scrollable-content": scrollableContent, rtl }
                        )}
                    >
                        {s}
                        <div className="layout">
                            {h}
                            {m}
                            {f}
                        </div>
                        <div className="overlay" onClick={toggle}></div>
                    </div>
                    <div className="notif-container"></div>
                </>
            );

        default:
            return null;
    }
}
