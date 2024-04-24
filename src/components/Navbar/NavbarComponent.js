import React from 'react';
import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import './NavbarStyle.css';
import ProjectComponent from '../Project/ProjectComponent/ProjectComponent';
import TaskComponent from '../Task/TaskComponent/TaskComponent';

const NavbarComponent = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-elements">
                    <ul>
                        <li>
                            <NavLink to="/">Accueil</NavLink>
                        </li>
                        <li>
                            <NavLink to="/projects">Projets</NavLink>
                        </li>
                        <li>
                            <NavLink to="/tasks">Taches</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects/*" element={<ProjectComponent />} />
                    <Route path="/tasks/*" element={<TaskComponent />} />
                </Routes>
            </div>
        </nav>
    );
};

export default NavbarComponent;
