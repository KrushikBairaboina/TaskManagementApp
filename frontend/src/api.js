const BASE_URL = 'http://localhost:8080';

// Get all tasks with optional search, pagination (page, limit), and status filter
export const GetAllTasks = async (search = '', page = 1, limit = 5, status = '') => {
    const url = `${BASE_URL}/api/tasks?search=${search}&page=${page}&limit=${limit}${status ? `&status=${status}` : ''}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const { data } = await result.json();
        return data;
    } catch (err) {
        console.error('Error fetching tasks:', err);
        return { error: 'Error fetching tasks' }; // Return error message
    }
};


// Get task details by task ID
export const GetTaskDetailsById = async (id) => {
    const url = `${BASE_URL}/api/tasks/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            throw new Error('Failed to fetch task details');
        }
        const { data } = await result.json();
        return data;
    } catch (err) {
        console.error('Error fetching task details:', err);
        return { error: 'Error fetching task details' }; // Return error message
    }
};

// Delete task by task ID
export const DeleteTaskById = async (id) => {
    const url = `${BASE_URL}/api/tasks/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            throw new Error('Failed to delete task');
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Error deleting task:', err);
        return { error: 'Error deleting task' }; // Return error message
    }
};

// Create a new task
export const CreateTask = async (taskObj) => {
    const url = `${BASE_URL}/api/tasks`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskObj)
    };
    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            throw new Error('Failed to create task');
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Error creating task:', err);
        return { error: 'Error creating task' }; // Return error message
    }
};

// Update task by task ID
export const UpdateTaskById = async (taskObj, id) => {
    const url = `${BASE_URL}/api/tasks/${id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskObj)
    };
    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            throw new Error('Failed to update task');
        }
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Error updating task:', err);
        return { error: 'Error updating task' }; // Return error message
    }
};
