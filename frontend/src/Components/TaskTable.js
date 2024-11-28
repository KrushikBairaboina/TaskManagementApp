import React from 'react';
import { Link } from 'react-router-dom';
import { DeleteTaskById } from '../api';  
import { notify } from '../utils';

function TaskTable({
    tasks = [], pagination = { currentPage: 1, totalPages: 1 }, fetchTasks, handleUpdateTask
}) {
    const headers = ['Title', 'Description', 'Due Date', 'Status', 'Actions'];  
    const { currentPage, totalPages } = pagination;

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePagination(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePagination(currentPage - 1);
        }
    };

    const handlePagination = (page) => {
        fetchTasks('', page, 5);  
    };

    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeleteTaskById(id);  
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
            fetchTasks();  
        } catch (err) {
            console.error(err);
            notify('Failed to delete Task', 'error');
        }
    };

    const TableRow = ({ task }) => {
        return (
            <tr>
                <td>
                    <Link to={`/task/${task._id}`} className="text-decoration-none">
                        {task.title}  
                    </Link>
                </td>
                <td>{task.description}</td>  
                <td>{task.dueDate}</td>  
                <td>{task.status}</td>  
                <td>
                    <i
                        className='bi bi-pencil-fill text-warning me-4'
                        role="button"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Edit"
                        onClick={() => handleUpdateTask(task)}  
                    ></i>
                    <i
                        className='bi bi-trash-fill text-danger'
                        role="button"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Delete"
                        onClick={() => handleDeleteTask(task._id)}  
                    ></i>
                </td>
            </tr>
        );
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th key={i}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tasks.length === 0 ? <tr><td colSpan={5}>No tasks available</td></tr>  
                        : tasks.map((task) => (
                            <TableRow task={task} key={task._id} />  
                        ))
                    }
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center my-3">
                <span className="badge bg-primary">Page {currentPage} of {totalPages}</span>
                <div>
                    <button
                        className="btn btn-outline-primary me-2"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {pageNumbers.length > 1 && pageNumbers.map(page => (
                        <button
                            key={page}
                            className={`btn btn-outline-primary me-1 ${currentPage === page ? 'active' : ''}`}
                            onClick={() => handlePagination(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className="btn btn-outline-primary ms-2"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default TaskTable;
