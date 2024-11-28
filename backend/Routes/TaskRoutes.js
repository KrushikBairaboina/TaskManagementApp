const { 
    createTask, 
    getAllTasks, 
    getTaskById, 
    deleteTaskById, 
    updateTaskById, 
    toggleTaskStatus 
} = require('../Controllers/TaskController'); 

const router = require('express').Router();

router.get('/', getAllTasks);

router.get('/:id', getTaskById);

router.post('/', createTask);

router.put('/:id', updateTaskById);

router.delete('/:id', deleteTaskById);

router.patch('/:id/status', toggleTaskStatus);

module.exports = router;
