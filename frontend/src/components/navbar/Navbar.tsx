import React from "react";
import "./Navbar.css";
import Home from "../home/Home";
import Users from "../users/Users";
import {BrowserRouter, Link, Route, Router, Routes} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">Notifications</div>
            <ul className="navbar-menu">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <Link to={item.route}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const menuItems = [
    { id: 1, title: "Home", route: '/' },
    { id: 2, title: "Users" , route: '/users'},
    { id: 3, title: "Message" , route: '/message'},
    { id: 4, title: "Logs" , route: '/logs'},
];

export default Navbar;
