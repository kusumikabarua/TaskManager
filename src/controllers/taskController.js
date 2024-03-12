const taskService = require("../services/taskService");
const createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const userId = req.user.id;
    console.log("userId", userId);
    const task = await taskService.createTask({
      title,
      description,
      priority,
      userId,
    });
    return res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks(req.user.id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskService.getTaskById(req.user.id, id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData =req.body;

    const updatedTask = await taskService.updateTask(req.user.id, id,updatedData);
    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteTask = async(req,res)=>{
    try {
    const {id} =req.params;
    const deletedTask = await taskService.deleteTask(req.user.id,id);
    if(!deleteTask){
        res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send();
} catch (error) {
    res.status(500).json({ message: error.message });
  }

}
module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};
