import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavItem, NavLink } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import settings from '../../app/settings';


export class LandingHeader extends Component {

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = { collapsed: true };
    }

    toggleNavbar() {
        this.setState({ collapsed: !this.state.collapsed });
    }

    onToggleClick = () => {
        this.props.onToggle();
        this.props.onCollapse();
    }

    render = () => {
        return <Navbar className="navbar-expand-sm navbar-toggleable-sm" light>
            <div className="container">
                <NavbarBrand tag={Link} to="/" onClick={this.onToggleClick}>
                    {settings.title}
                </NavbarBrand>
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/about">About</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/contact">Contact</NavLink>
                        </NavItem>
                    </ul>
                </Collapse>
            </div>
        </Navbar>
    }
}


export default LandingHeader;