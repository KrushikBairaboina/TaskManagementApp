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
    type: String, // Store as a String in 'YYYY-MM-DD' format
    required: true,
    set: (value) => {
      // If the user provides a date with time, convert it to 'YYYY-MM-DD' format
      const date = new Date(value);
      // Format the date as 'YYYY-MM-DD'
      return date.toISOString().split('T')[0]; // This will return the date part only
    }
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending'
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Model creation
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
