import React, { useEffect, useState } from 'react';
import TaskTable from './TaskTable';  
import AddTask from './AddTask';  
import { GetAllTasks } from '../api';  
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';

const TaskManagementApp = () => {
    const [showModal, setShowModal] = useState(false);
    const [taskObj, setTaskObj] = useState(null);  
    const [tasksData, setTasksData] = useState({
        tasks: [],  
        pagination: {
            currentPage: 1,
            pageSize: 5,
            totalTasks: 0,  
            totalPages: 0,
        },
    });

    const fetchTasks = async (search = '', page = 1, limit = 5) => {
        console.log('Called fetchTasks');
        try {
            const data = await GetAllTasks(search, page, limit);  
            console.log(data);
            setTasksData(data);
        } catch (err) {
            notify('Error fetching tasks', 'error'); // Display error message using toast
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTasks();  // Fetch tasks when the component mounts
    }, []);

    const handleSearch = (e) => {
        fetchTasks(e.target.value);
    };

    const handleUpdateTask = async (task) => {
        setTaskObj(task);
        setShowModal(true);
    };

    // Separate tasks into Pending and Completed
    const pendingTasks = tasksData.tasks.filter(task => task.status === 'Pending');
    const completedTasks = tasksData.tasks.filter(task => task.status === 'Completed');

    return (
        <div className='d-flex flex-column justify-content-center align-items-center w-100 p-3'>
            <h1>Task Management App</h1>
            <div className='w-100 d-flex justify-content-center'>
                <div className='w-80 border bg-light p-3' style={{ width: '80%' }}>
                    <div className='d-flex justify-content-between mb-3'>
                        <button className='btn btn-primary' onClick={() => setShowModal(true)}>
                            Add Task
                        </button>
                        <input
                            onChange={handleSearch}
                            type='text'
                            placeholder='Search Tasks...'
                            className='form-control w-50'
                        />
                    </div>

                    {/* Display Pending Tasks */}
                    <h3>Pending Tasks</h3>
                    <TaskTable
                        tasks={pendingTasks}  
                        pagination={tasksData.pagination}
                        fetchTasks={fetchTasks}  
                        handleUpdateTask={handleUpdateTask}  
                    />

                    {/* Display Completed Tasks */}
                    <h3>Completed Tasks</h3>
                    <TaskTable
                        tasks={completedTasks}  
                        pagination={tasksData.pagination}
                        fetchTasks={fetchTasks}  
                        handleUpdateTask={handleUpdateTask}  
                    />

                    <AddTask
                        fetchTasks={fetchTasks}  
                        showModal={showModal}
                        setShowModal={setShowModal}
                        taskObj={taskObj}  
                    />
                </div>
            </div>
            <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} />
        </div>
    );
};

export default TaskManagementApp;
