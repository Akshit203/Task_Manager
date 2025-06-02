import React, { useEffect, useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from '../api/taskService';
import { notify } from '../utils/apiConfig';

function TaskManager() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);

  // Handle adding or updating task
  const handleTask = () => {
    if (updateTask && title && description) {
      const updatedObj = {
        title,
        description,
        _id: updateTask._id,
      };
      handleUpdateItem(updatedObj);
    } else if (!updateTask && title && description) {
      handleAddTask();
    }
    setTitle('');
    setDescription('');
    setUpdateTask(null);
  };

  // Populate input fields when selecting a task to update
  useEffect(() => {
    if (updateTask) {
      setTitle(updateTask.title);
      setDescription(updateTask.description);
    }
  }, [updateTask]);

  // Create new task
  const handleAddTask = async () => {
    const obj = { title, description };
    try {
      const { success, message } = await CreateTask(obj);
      if (success) notify(message, 'success');
      else notify(message, 'error');
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify('Failed to create task', 'error');
    }
  };

  // Fetch all tasks
  const fetchAllTasks = async () => {
    try {
      const { data, success, message } = await GetAllTasks();
      if (success) {
        setTasks(data);
        setCopyTasks(data);
      } else {
        notify(message, 'error');
      }
    } catch (err) {
      console.error(err);
      notify('Failed to fetch tasks', 'error');
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  // Delete task
  const handleDeleteTask = async (id) => {
    try {
      const { success, message } = await DeleteTaskById(id);
      if (success) notify(message, 'success');
      else notify(message, 'error');
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify('Failed to delete task', 'error');
    }
  };

  // Update task
  const handleUpdateItem = async (task) => {
    const { _id, title, description } = task;
    try {
      const { success, message } = await UpdateTaskById(_id, { title, description });
      if (success) notify(message, 'success');
      else notify(message, 'error');
      fetchAllTasks();
      setUpdateTask(null);
    } catch (err) {
      console.error(err);
      notify('Failed to update task', 'error');
    }
  };

  // Search tasks
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = copyTasks.filter((task) =>
      task.title.toLowerCase().includes(term) || task.description.toLowerCase().includes(term)
    );
    setTasks(filtered);
  };

  return (
    <div className="container w-50 mt-5">

  <h1 className="mb-4 text-center text-5xl">TASK MANAGER APP</h1>

  <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="form-control me-2 border p-2"
      placeholder="Task Title"
      style={{ maxWidth: "200px" }}
    />
    
    <input
      type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="form-control me-2 border p-2"
      placeholder="Task Description"
      style={{ maxWidth: "300px" }}
    />
    
    <button onClick={handleTask} className="btn btn-success me-3 border p-2 bg-blue-400 text-white">
      <FaPlus />
    </button>

    <div className="input-group" style={{ maxWidth: "250px" }}>
      <span className="input-group-text">
        <FaSearch />
      </span>
      <input
        type="text"
        onChange={handleSearch}
        className="form-control p-2 border"
        placeholder="Search tasks"
      />
    </div>
  </div>

  <div className="d-flex flex-column w-100">
    {tasks.map((task) => (
      <div
        key={task._id}
        className="m-2 p-3 border bg-light rounded d-flex justify-content-between align-items-center"
      >
        <div>
          <strong>{task.title}</strong>
          <p className="mb-0">{task.description}</p>
        </div>

        <div>
          <button
            onClick={() => setUpdateTask(task)}
            className="btn btn-primary btn-sm me-2"
            type="button"
          >
            <FaPencilAlt />
          </button>
          <button
            onClick={() => handleDeleteTask(task._id)}
            className="btn btn-danger btn-sm"
            type="button"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    ))}
  </div>

  <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

</div>

 

  );
}

export default TaskManager;  