import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./FormStyles.css";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobseeker");
  const [contact, setContact] = useState("");
  const [skills, setSkills] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userData = {
      name,
      email,
      password,
      role,
      profile: {
        contact,
        skills: skills.split(",").map((skill) => skill.trim()),
      },
    };

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to sign up");
      }

      toast.success("Sign up successful!");
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Full error:", error);
      toast.error(error.message || "Failed to sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="form-container"
      style={{ textAlign: "center", padding: "20px" }}
    >
      <h1 style={{ color: "#333" }}>Sign Up</h1>
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
          className="form-input"
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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={inputStyle}
        >
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          style={inputStyle}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200 disabled:bg-indigo-300"
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  margin: "10px 0",
  padding: "10px",
  width: "300px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

export default SignUpPage;
