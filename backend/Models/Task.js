const mongoose = require('mongoose');

// Task Schema
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  dueDate: {
    type: String, 
    required: true,
    set: (value) => {
      
      const date = new Date(value);

      return date.toISOString().split('T')[0]; 
    }
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending'
  }
}, {
  timestamps: true 
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
