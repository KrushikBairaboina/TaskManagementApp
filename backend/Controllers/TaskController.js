const Task = require("../Models/Task");
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      status: status || "Pending",
    });

    await task.save();
    res.status(201).json({
      message: "Task Created Successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    let { page, limit, status, search } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const skip = (page - 1) * limit;

    let searchCriteria = {};
    if (status) {
      searchCriteria.status = status;
    }
    if (search) {
      searchCriteria.title = {
        $regex: search,
        $options: "i",
      };
    }

    const totalTasks = await Task.countDocuments(searchCriteria);
    const tasks = await Task.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const totalPages = Math.ceil(totalTasks / limit);

    res.status(200).json({
      message: "All Tasks Fetched",
      success: true,
      data: {
        tasks,
        pagination: {
          totalTasks,
          currentPage: page,
          totalPages,
          pageSize: limit,
        },
      },
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};
const getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Task Details",
      success: true,
      data: task,
    });
  } catch (err) {
    console.error("Error fetching task by ID:", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task Not Found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Task Deleted Successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate, status, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task Not Found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Task Updated Successfully",
      success: true,
      data: updatedTask,
    });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};

const toggleTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
        success: false,
      });
    }

    task.status = task.status === "Pending" ? "Completed" : "Pending";
    await task.save();

    res.status(200).json({
      message: `Task status updated to ${task.status}`,
      success: true,
      data: task,
    });
  } catch (err) {
    console.error("Error toggling task status:", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
  toggleTaskStatus,
};
