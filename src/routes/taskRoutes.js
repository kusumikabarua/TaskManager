const express= require("express");
const authenticateToken = require("../middleware/authenticateToken");
const taskContoller = require("../controllers/taskController")
const router = express.Router();
router.post("/",authenticateToken,taskContoller.createTask) ;
router.get("/",authenticateToken,taskContoller.getAllTasks);
router.get("/:id",authenticateToken,taskContoller.getTaskById);
router.put("/:id",authenticateToken,taskContoller.updateTask);
router.delete("/:id",authenticateToken,taskContoller.deleteTask);

module.exports =router;