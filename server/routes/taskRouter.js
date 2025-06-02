const express = require("express");
const router = express.Router();

const {
  createTask,
  fetchAllTasks,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/taskController");


router.post("/", createTask);

router.get("/", fetchAllTasks);

router.put("/:id", updateTaskById);


router.delete("/:id", deleteTaskById);

module.exports = router;
