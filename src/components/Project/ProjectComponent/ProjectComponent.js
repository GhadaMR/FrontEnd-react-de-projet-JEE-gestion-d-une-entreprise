import React, { Component } from 'react';
import FormCreateProject from "../CreateProjForm/FormCreateProject";
import FormUpdateProject from "../UpdateProjForm/FormUpdateProject";
import ListProjects from "../ListProjects/ListProjects";
import { Routes, Route, NavLink } from 'react-router-dom';
import './ProjectStyle.css';

class ProjectComponent extends Component {
    render() {

        return (
            <div>
                <div>
                    <NavLink to="list" className="buttonLinks">
                        List des Projets
                    </NavLink>
                    <NavLink to="create" className="buttonLinks">
                        Creer un Project
                    </NavLink>
                </div>
                <div>
                    <Routes>
                        <Route path="list/*" element={<ListProjects />} />
                        <Route path="create" element={<FormCreateProject />} />
                        <Route path="update/*" element={<FormUpdateProject />} />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default ProjectComponent;