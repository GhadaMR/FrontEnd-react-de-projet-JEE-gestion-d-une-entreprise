import React, { useState, useEffect } from 'react';
import { createTask } from '../../../services/taskService';
import { getAllProjects } from '../../../services/projectService';
import { useNavigate } from 'react-router-dom';
import './FormCreateTask.css';

const FormCreateTask = () => {
    const [Task, setTask] = useState({
        code: '',
        description: '',
        startDate: '',
        endDate: '',
        project: '',
    });

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

    const changeHandler = (event) => {
        const { name, value } = event.target;

        // Check if the input is the date input
        if (name === 'startDate' || name === 'endDate') {
            // Parse the current date value to a Date object
            const currentDate = new Date(value);

            // Ensure proper formatting of the date
            const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

            // Update the state with the formatted date
            setTask((prevTask) => ({
                ...prevTask,
                [name]: formattedDate,
            }));

            if (name === 'endDate' && new Date(formattedDate) < new Date(startDate)) {

                console.error('End Date must be after the start date : ' + startDate);
                alert('End Date must be after the start date : ' + startDate);

            }
        } else if (name === 'project') {

            // Find the selected project based on the project code
            const selectedProject = projects.find((proj) => proj.code === value);

            // Update the state with the selected project
            setTask((prevTask) => ({
                ...prevTask,
                project: selectedProject,
            }));
        } else {

            // For other inputs, update the state directly
            setTask((prevTask) => ({
                ...prevTask,
                [name]: value,
            }));
        }
    };


    const createTaskHandler = async (event) => {
        event.preventDefault();

        if (new Date(Task.endDate) < new Date(Task.startDate)) {

            alert('End Date must be after the start date : ' + startDate);
            return; // Exit the function and prevent further execution
        }

        // Find the selected project based on the project code
        const selectedProject = projects.find((proj) => proj.code === Task.project.code);

        // Check if the task's start date is after the project's start date
        if (new Date(Task.startDate) < new Date(selectedProject.startDate)) {
            alert('Task Start Date must be after the start date of '+ selectedProject.code +' : ' + selectedProject.startDate);
            return; // Exit the function and prevent further execution
        }


        try {
            // Call the createTask function from TaskService
            await createTask(Task, (error, data) => {
                if (!error) {
                    console.log('Task created successfully');
                    console.log('Request Payload:', JSON.stringify(Task));

                    // Redirect to the "/list" route
                    navigate('../list');
                } else {
                    console.error('Error creating Task:', error);
                }
            });
        } catch (error) {
            console.error('Error creating Task:', error);
        }
    };

    const { code, description, startDate, endDate } = Task;

    return (
        <div>
            <h1>Creation d'une tache</h1>

            <form onSubmit={createTaskHandler}>
                <label>
                    Code de tache:
                    <input type="text" name="code" required value={code} onChange={changeHandler} />
                </label>
                <label>
                    Description de tache:
                    <input type="text" name="description" required value={description} onChange={changeHandler} />
                </label>
                <label>
                    Date de debut de tache:
                    <input type="date" name="startDate" required value={startDate} onChange={changeHandler} />
                </label>
                <label>
                    Date de fin de tache:
                    <input type="date" name="endDate" required value={endDate} onChange={changeHandler} />
                </label>
                <label>
                    Projet :
                    <select name="project" required value={Task.project ? Task.project.code : ''} onChange={changeHandler}>
                        <option value="" disabled>Select a project</option>
                        {projects.map((proj) => (
                            <option key={proj.code} value={proj.code}>
                                {proj.code}
                            </option>
                        ))}
                    </select>

                </label>
                <button type="submit">
                    Creer tache
                </button>
            </form>
        </div>
    );
};

export default FormCreateTask;
