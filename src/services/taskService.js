const Task = require("../models/Task");
const createTask = async (taskData) => {
  try {
    const task = await Task.create(taskData);
    return task;
  } catch (error) {
    throw error;
  }
};
const getAllTasks = async (userId) => {
  try {
    const tasks = await Task.find({ userId: userId });
    return tasks;
  } catch (error) {
    throw error;
  }
};
const getTaskById = async (userId, taskId) => {
  try {
    const task = await Task.findOne({ userId: userId, _id: taskId });

    return task;
  } catch (error) {
    throw error;
  }
};
const updateTask = async (userId, taskId, updatedData) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { userId: userId, _id: taskId },
      { $set: updatedData },
      { new: true }
    );

    return updatedTask;
  } catch (error) {
    throw error;
  }
};
const deleteTask = async (userId, taskId) => {
  try {
    const deletedTask = await Task.findByIdAndDelete({ userId, _id: taskId });
    return deletedTask;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
