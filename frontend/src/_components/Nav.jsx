import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Product</NavLink>
                <NavLink exact to="/checkout" className="nav-item nav-link">Checkout</NavLink>
            </div>
        </nav>
    );
}

export { Nav }; 