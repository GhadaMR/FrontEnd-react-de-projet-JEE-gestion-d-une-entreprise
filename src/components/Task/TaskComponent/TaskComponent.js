import React, { Component } from 'react';
import FormCreateTask from "../CreateTaskForm/FormCreateTask";
import FormUpdateTask from "../UpdateTaskForm/FormUpdateTask";
import ListTasks from "../ListTasks/ListTasks";
import { Routes, Route, NavLink } from 'react-router-dom';
import './TaskStyle.css';

class TaskComponent extends Component {
    render() {

        return (
            <div>
                <div>
                    <NavLink to="./list" className="buttonLinks">
                        List des taches
                    </NavLink>
                    <NavLink to="./create" className="buttonLinks">
                        Creation des taches
                    </NavLink>
                </div>
                <div>
                    <Routes>
                        <Route path="list/*" element={<ListTasks />} />
                        <Route path="create" element={<FormCreateTask />} />
                        <Route path="update/*" element={<FormUpdateTask />} />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default TaskComponent;