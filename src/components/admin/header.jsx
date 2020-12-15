import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo192.png";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar light expand="md" className="shadow-sm fixed-top bg-white">
            <NavbarBrand>
                <Link to="/">
                    <img src={logo} alt="Logo" width="30" height="30" />
                </Link>
            </NavbarBrand>
            <h5 className="mb-0">User Profiles</h5>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="#">
                            <i className="far fa-bell mr-md-3"></i>
                        </NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            <i className="fas fa-user mr-1"></i> Admin
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>Logout</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default Header;
