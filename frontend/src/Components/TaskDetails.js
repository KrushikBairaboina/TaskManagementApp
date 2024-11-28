import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { GetTaskDetailsById } from "../api";

const TaskDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState(null); // Start with null to handle loading state.

  // Define fetchTaskDetails using useCallback to prevent unnecessary re-creations.
  const fetchTaskDetails = useCallback(async () => {
    try {
      const data = await GetTaskDetailsById(id);
      if (data) {
        setTask(data); // Set task data when fetched successfully
      }
    } catch (err) {
      console.error("Error fetching task details:", err);
      alert("Error fetching task details");
    }
  }, [id]); // Depend on id because it can change based on route.

  useEffect(() => {
    fetchTaskDetails(); // Fetch task details when component mounts or id changes.
  }, [fetchTaskDetails]);

  if (!task) {
    return <div>Loading task details...</div>; // Show loading state while fetching
  }

  if (task.error) {
    return <div>Error fetching task details: {task.error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Task Details</h2>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-12">
              <h4>{task.title}</h4>
              <p>
                <strong>Description:</strong> {task.description}
              </p>
              <p>
                <strong>Due Date:</strong> {task.dueDate}
              </p>
              <p>
                <strong>Status:</strong> {task.status}
              </p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => navigate("/task")}>
            Back to Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
