import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTooltip,
} from "mdb-react-ui-kit";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import styles from "./TaskDashboard.module.css";
import { API_BASE_URL } from "../../config";
import DatePickerValue from "./DatePicker";
import dayjs from "dayjs";

export default function Register() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formTask, setFormTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: dayjs(),
  });

  const isLoggedIn = localStorage.getItem("token") ? true : false;
  const [sortBy, setSortBy] = React.useState("");
  function sort_by_priority ( data ) {
    var prs = ['High', 'Medium', 'Low'];
     return data.sort(function ( a, b ) {
        var x = prs.indexOf(a.priority);
        var y = prs.indexOf(b.priority);

        if ( x < y ) return -1 ;
        if ( x > y ) return 1 ;
        return 0;
    });
}
  const handleChange = (event) => {
    let sortedTasks =[]
    setSortBy(event.target.value);
    if(event.target.value === "priority"){
      sortedTasks=sort_by_priority( [...tasks]);
 
    }else{
      sortedTasks= [...tasks];
      sortedTasks.sort((a,b)=> new Date(a.dueDate)- new Date(b.dueDate));
    }
    console.log(sortedTasks);
    setTasks(sortedTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response was not ok.");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const updateTaskStatus = async (taskId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompletedTask: true }),
      });
      if (!response.ok) throw new Error("Failed to update task.");
      fetchTasks(); // Refresh the tasks list to reflect changes
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete task.");
      fetchTasks(); // Refresh the tasks list to reflect changes
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  const handleFormDueDate = (newDate) => {
    setFormTask((prevTask) => ({
      ...prevTask,
      dueDate: newDate,
    }));
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formTask, isCompletedTask: false }),
      });
      if (!response.ok) throw new Error("Failed to create task.");
      setShowForm(false); // Hide form after task creation
      setFormTask({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: dayjs(),
      });
      fetchTasks(); // Refresh the tasks list to reflect the new task
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const renderTasksTable = (tasksArray, status) => (
    <MDBTable className="text-black mb-0">
      <MDBTableHead>
        <tr>
          <th scope="col">{status}</th>
          <th scope="col">Task</th>
          <th scope="col">Due Date</th>
          <th scope="col">Priority</th>
          <th scope="col">Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {tasksArray.map((task) => (
          <tr className="fw-normal" key={task._id}>
            <td className="align-middle">
              {task.isCompletedTask ? "Completed" : "In Progress"}
            </td>
            <td className="align-middle">
              <span style={{ fontWeight: "bold" }}>{task.title}</span>
              <br />
              <span style={{ fontSize: "small", color: "gray" }}>
                {task.description}
              </span>
            </td>
            <td className="align-middle">
              <span style={{ fontWeight: "bold" }}>{task.dueDate}</span>
            </td>
            <td className="align-middle">
              <h6 className="mb-0">
                <MDBBadge
                  className="mx-2"
                  color={
                    task.priority === "High"
                      ? "danger"
                      : task.priority === "Low"
                      ? "success"
                      : "warning"
                  }
                >
                  {task.priority} priority
                </MDBBadge>
              </h6>
            </td>
            <td className="align-middle">
              {!task.isCompletedTask && (
                <MDBTooltip tag="a" wrapperProps={{ href: "#!" }} title="Done">
                  <MDBIcon
                    fas
                    icon="check"
                    color="success"
                    size="lg"
                    className="me-3"
                    onClick={() => updateTaskStatus(task._id)}
                  />
                </MDBTooltip>
              )}
              <MDBTooltip tag="a" wrapperProps={{ href: "#!" }} title="Remove">
                <MDBIcon
                  fas
                  icon="trash-alt"
                  color="warning"
                  size="lg"
                  className="me-3"
                  onClick={() => deleteTask(task._id)}
                />
              </MDBTooltip>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );

  return (
    <section className={styles.gradient}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol md="12" xl="10">
            <MDBCard>
              {isLoggedIn && (
                <MDBBtn
                  style={{ position: "absolute", right: "10px", top: "10px" }}
                  color="danger"
                  onClick={() => {
                    localStorage.removeItem("token"); // Clear token from localStorage
                    window.location.reload(); // Reload the page
                  }}
                >
                  Logout
                </MDBBtn>
              )}
              <MDBCardBody className="p-4 text-black">
                <div className="text-center pt-3 pb-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                    alt="Check"
                    width="60"
                  />
                  <h2 className="my-4">Task List</h2>

                  {isLoggedIn && (
                    <MDBBtn onClick={() => setShowForm(!showForm)}>
                      Create Task
                    </MDBBtn>
                  )}
                </div>
                {showForm && (
                  <form onSubmit={handleCreateTask}>
                    <MDBInput
                      className="my-4 mx-4"
                      label="Title"
                      type="text"
                      name="title"
                      value={formTask.title}
                      onChange={handleFormChange}
                      required
                    />
                    <MDBInput
                      label="Description"
                      className="my-4 mx-4"
                      type="text"
                      name="description"
                      value={formTask.description}
                      onChange={handleFormChange}
                      required
                    />
                    <DatePickerValue
                      dueDate={formTask.dueDate}
                      handleDueDate={handleFormDueDate}
                    />
                    <select
                      className="browser-default custom-select mx-4 my-4 "
                      name="priority"
                      value={formTask.priority}
                      onChange={handleFormChange}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>

                    <MDBBtn type="submit" className="my-4 mx-4">
                      Save Task
                    </MDBBtn>
                    <MDBBtn
                      color="danger"
                      className="my-4 mx-4"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </MDBBtn>
                  </form>
                )}
                {!isLoggedIn && (
                  <div>
                    <h2>Welcome to the Task Management App</h2>
                    <p>
                      Manage your tasks efficiently with our professional task
                      management app.
                    </p>
                    <div>
                      <a href="/login" className="btn btn-primary mx-2">
                        Login
                      </a>
                      <a href="/register" className="btn btn-secondary mx-2">
                        Sign Up
                      </a>
                    </div>
                  </div>
                )}
                {isLoggedIn && tasks && tasks.length > 0 && (
                  <Box sx={{ minWidth: 500 }}>
                    <FormControl sx={{ minWidth: 200 }}>
                      <InputLabel id="sortBy-label">Sort By</InputLabel>
                      <Select
                        labelId="sortBy-label"
                        id="sortBy-select"
                        value={sortBy}
                        label="Sort By"
                        onChange={handleChange}
                      >
                        <MenuItem value="dueDate">Due Date</MenuItem>
                        <MenuItem value="priority">Priority</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                )}
                {isLoggedIn &&
                  tasks.filter((task) => !task.isCompletedTask).length > 0 && (
                    <div>
                      <h3>In Progress Tasks</h3>
                      {renderTasksTable(
                        tasks.filter((task) => !task.isCompletedTask),
                        "Task Status"
                      )}
                    </div>
                  )}

                {isLoggedIn &&
                  tasks.filter((task) => task.isCompletedTask).length > 0 && (
                    <div>
                      <h3 className="mt-4">Completed Tasks</h3>
                      {renderTasksTable(
                        tasks.filter((task) => task.isCompletedTask),
                        "Task Status"
                      )}
                    </div>
                  )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
