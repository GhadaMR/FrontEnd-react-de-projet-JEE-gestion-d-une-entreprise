import React, { useState } from 'react';
import { createProject } from '../../../services/projectService';
import { useNavigate } from 'react-router-dom';
import './FormCreateProject.css';

const FormCreateProject = () => {
    const [project, setProject] = useState({
        code: '',
        description: '',
        startDate: '',
    });

    const navigate = useNavigate();

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
                [name]: formattedDate,
            }));
        } else {
            // For other inputs, update the state directly
            setProject((prevProject) => ({
                ...prevProject,
                [name]: value,
            }));
        }
    };


    const createProjectHandler = async (event) => {
        event.preventDefault();

        try {
            // Call the createProject function from projectService
            await createProject(project, (error, data) => {
                if (!error) {
                    console.log('Project created successfully');
                    console.log('Request Payload:', JSON.stringify(project));

                    // Redirect to the "/list" route
                    navigate('../list');
                } else {
                    console.error('Error creating project:', error);
                }
            });
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const { code, description, startDate } = project;

    return (
        <div>
            <h1>Creation d'un Projet</h1>

            <form onSubmit={createProjectHandler}>
                <label>
                    Code de Projet :
                    <input type="text" name="code" required value={code} onChange={changeHandler} />
                </label>
                <label>
                    Description de Projet :
                    <input type="text" name="description" required value={description} onChange={changeHandler} />
                </label>
                <label>
                    Date de debut:
                    <input type="date" name="startDate" required value={startDate} onChange={changeHandler} />
                </label>
                <button type="submit">
                    Creer un Projet
                </button>
            </form>
        </div>
    );
};

export default FormCreateProject;
