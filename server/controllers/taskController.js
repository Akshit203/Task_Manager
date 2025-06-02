const TaskModel = require("../models/task");


const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "Title and description are required",
      success: false
    });
  }

  try {
    const newTask = new TaskModel({ title, description });
    await newTask.save();
    res.status(201).json({
      message: "Task created successfully",
      success: true,
      data: newTask
    });
  } catch (err) {
    console.error("Error creating task:", err.message);
    res.status(500).json({
      message: "Failed to create task",
      success: false,
      error: err.message
    });
  }
}


const fetchAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({});
    res.status(200).json({ message: "All Tasks", success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ message: "Failed to get all tasks", success: false, error: err.message });
  }
};


const updateTaskById = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    await TaskModel.findByIdAndUpdate(id, { $set: updates }, { new: true });
    res.status(200).json({ message: "Task updated", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to update task", success: false, error: err.message });
  }
};


const deleteTaskById = async (req, res) => {
  const id = req.params.id;

  try {
    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Task is deleted", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task", success: false, error: err.message });
  }
};

module.exports = {
  createTask,
  fetchAllTasks,
  updateTaskById,
  deleteTaskById,
};
