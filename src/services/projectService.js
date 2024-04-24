import axios from 'axios'

export const getAllProjects = async () => {
    try {
        const response = await axios.get('http://localhost:8000/projetjee/project/all');
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export const createProject = (project, callback) => {
    axios.post(`http://localhost:8000/projetjee/project/create`, project)
        .then((res) => callback(null, res.data))
        .catch((err) => callback(err.response.data || "Error creating project"));
}

export const updateProject = (project, callback) => {
    axios.put(`http://localhost:8000/projetjee/project/update`, project)
        .then((res) => callback(null, res.data))
        .catch((err) => callback(err.response.data || "Error updating project"));
}

export const removeProject = (code, callback) => {
    axios.delete(`http://localhost:8000/projetjee/project/remove/${code}`)
        .then((res) => callback(null, res.data))
        .catch((err) => callback(err.response.data || "Error deleting project"));
}