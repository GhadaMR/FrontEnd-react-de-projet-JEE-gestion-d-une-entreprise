import React, { useState, useEffect } from 'react';
import { getAllProjects, removeProject } from '../../../services/projectService';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import './ListProjects.css';

const ListProjects = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of projects when the component mounts
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            // Call getAllProjects from your projectService
            const projectsData = await getAllProjects();
            setProjects(projectsData);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const redirectToUpdateForm = (project) => {
        navigate(`../update/${project.code}`, { state: { project } });
    };

    const deleteProject = (project) => {
        removeProject(project.code, (error, data) => {
            if (!error) {
                console.log('Project deleted successfully');
        
                fetchProjects();
            } else {
                console.error('Error deleting project:', error);
            }
        });
    }


    return (
        <div>
            <h1>List de Projets</h1>

            <Table id='listProjects'>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Date de debut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.code}>
                            <td>{project.code}</td>
                            <td>{project.description}</td>
                            <td>{project.startDate}</td>
                            <td className='actionButtons'>
                                <button id='updateButton' className='listButtons' onClick={() => redirectToUpdateForm(project)}>Mise a jour</button>
                                <button id='deleteButton' className='listButtons' onClick={() => deleteProject(project)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ListProjects;
