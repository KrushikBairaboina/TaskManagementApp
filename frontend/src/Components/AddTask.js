import React, { useEffect, useState } from 'react';
import { notify } from '../utils';
import { CreateTask, UpdateTaskById } from '../api'; 

function AddTask({ showModal, setShowModal, fetchTasks, taskObj }) {
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: 'Pending'  
    });
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        if (taskObj) {
            setTask(taskObj);
            setUpdateMode(true);
        }
    }, [taskObj]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const resetTaskStates = () => {
        setTask({
            title: '',
            description: '',
            dueDate: '',
            status: 'Pending',
        });
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            const { success, message } = updateMode ?
                await UpdateTaskById(task, task._id) : await CreateTask(task);
            console.log('create OR update ', success, message);
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
            setShowModal(false);
            resetTaskStates();
            fetchTasks();
            setUpdateMode(false);
        } catch (err) {
            console.error(err);
            notify('Failed to create/update task', 'error');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setUpdateMode(false);
        resetTaskStates();
    };

    return (
        <div className={`modal ${showModal ? 'd-block' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {updateMode ? 'Update Task' : 'Add Task'}
                        </h5>
                        <button type="button" className="btn-close" onClick={handleModalClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAddTask}>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={task.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={task.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Due Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dueDate"
                                    value={task.dueDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Status</label>
                                <select
                                    className="form-control"
                                    name="status"
                                    value={task.status}
                                    onChange={handleChange}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                {updateMode ? 'Update Task' : 'Save Task'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTask;
