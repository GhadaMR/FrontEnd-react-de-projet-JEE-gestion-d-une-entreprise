import React, { useState, useEffect } from 'react';
import { updateProject } from '../../../services/projectService';
import { useNavigate, useLocation } from 'react-router-dom';
import './FormUpdateProject.css';

const FormUpdateProject = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Retrieve the project data from the route state
    const { project: initialProject } = location.state || { project: {} };

    // Set the initial state with the project data
    const [project, setProject] = useState({
        code: initialProject.code || '',
        description: initialProject.description || '',
        startDate: initialProject.startDate || '',
    });

    useEffect(() => {
        // Update the state if the project data changes
        setProject({
            code: initialProject.code || '',
            description: initialProject.description || '',
            startDate: initialProject.startDate || '',
        });
    }, [initialProject]);

    const changeHandler = (event) => {
        const { name, value } = event.target;

        // Check if the input is the date input
        if (name === 'startDate') {
            // Parse the current date value to a Date object
            const currentDate = new Date(value);

            // Ensure proper formatting of the date
            const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

            // Update the state with the formatted date
            setProject((prevProject) => ({
                ...prevProject,
                startDate: formattedDate,
            }));
        } else {
            // For other inputs, update the state directly
            setProject((prevProject) => ({
                ...prevProject,
                [name]: value,
            }));
        }
    };

    const updateProjectHandler = async (event) => {
        event.preventDefault();

        try {
            // Call the updateProject function from projectService
            await updateProject(project, (error, data) => {
                if (!error) {
                    console.log('Project updated successfully');
                    console.log('Request Payload:', JSON.stringify(project));

                    // Redirect to the "/list" route
                    navigate('../list');
                } else {
                    console.error('Error updating project:', error);
                }
            });
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    const { code, description, startDate } = project;

    return (
        <div className="update-project-container"> 
            <h1>Mise a jour de Projet</h1>

            <form onSubmit={updateProjectHandler}>
                <label>
                    Code de projet:
                    <input type="text" name="code" required value={code} onChange={changeHandler} />
                </label>
                <label>
                    Description de projet:
                    <input type="text" name="description" required value={description} onChange={changeHandler} />
                </label>
                <label>
                    Date de debut de projet:
                    <input type="date" name="startDate" required value={startDate} onChange={changeHandler} />
                </label>
                <button type="submit">
                    Mise a jour Projet
                </button>
            </form>
        </div>
    );
};

export default FormUpdateProject;
