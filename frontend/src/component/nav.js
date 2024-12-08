import React from 'react';
import { NavLink } from 'react-router';

const Nav = () => {
    return (
        <nav>
            <NavLink to="/">Home </NavLink>
            <NavLink to="/dashboard"> Dashboard </NavLink>
            <NavLink to="/register"> Register New User</NavLink>
            <NavLink to="/login">Login User</NavLink>
        </nav>
    );
};

export default Nav;