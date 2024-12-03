import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const AddJobPage = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("full-time");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState(50000);
  const [remote, setRemote] = useState(false);
  const [deadline, setDeadline] = useState(
    new Date().toISOString().split("T")[0]
  );
  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();

    const jobData = {
      title,
      description,
      location,
      salaryRange: salary,
      jobType: type,
      remote,
      applicationDeadline: deadline,
    };

    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add job: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Job added successfully!");
      navigate("/jobs");
    } catch (error) {
      toast.error(`Error adding job: ${error.message}`);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
        <h2>Please log in to add a job.</h2>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitForm}
      style={{
        margin: "0 auto",
        maxWidth: "600px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add Job</h2>
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <textarea
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        required
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <label>
        Remote:
        <input
          type="checkbox"
          checked={remote}
          onChange={(e) => setRemote(e.target.checked)}
          style={{ marginLeft: "10px" }}
        />
      </label>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <button
        type="submit"
        style={{
          margin: "10px 0",
          padding: "10px",
          width: "100%",
          backgroundColor: "#4F46E5",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default AddJobPage;
