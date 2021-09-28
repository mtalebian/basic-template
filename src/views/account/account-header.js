import React from "react";
import { Navbar, NavbarBrand } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";

export default function AccountHeader({ className, dark, light, ...props }) {
    return (
        <Navbar className={classNames("navbar-expand-sm navbar-toggleable-sm", className)} light={light} dark={dark}>
            <NavbarBrand tag={Link} to="/">
                My App
            </NavbarBrand>
        </Navbar>
    );
}
