import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './css/AppNavbar.css';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand className="navbar-link" tag={Link} to="/">Home</NavbarBrand>
            <NavbarBrand className="navbar-link" tag={Link} to="/blogs">Blogs</NavbarBrand>
            <NavbarBrand className="navbar-link" tag={Link} to="/blogPosts">Blog posts</NavbarBrand>
            <NavbarBrand className="navbar-link" tag={Link} to="/blogPostComments">Comments</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="https://github.com/rgosik/Zespolowy_Blog">GitHub</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}