import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./FormStyles.css";

const ApplyForJobPage = () => {
  const { id } = useParams(); // Retrieve job ID from URL
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [reason, setReason] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("birthday", birthday);
    formData.append("reason", reason);
    formData.append("resume", resume);
    formData.append("jobId", id);

    // Log formData to verify all fields
    console.log(...formData);

    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      const data = await response.json();
      toast.success("Application submitted successfully!");

      setTimeout(() => {
        navigate("/jobs");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit application. Please try again.");
    }
  };

  return (
    <div
      className="form-container"
      style={{ textAlign: "center", padding: "20px" }}
    >
      <h1 style={{ color: "#333" }}>Apply for Job</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
          style={inputStyle}
        />
        <textarea
          placeholder="Why do you need this job?"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="file"
          onChange={(e) => setResume(e.target.files[0])}
          required
          style={inputStyle}
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  margin: "10px",
  width: "300px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

export default ApplyForJobPage;
