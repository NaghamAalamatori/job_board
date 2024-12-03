import React, { useState } from "react";
import "./FormStyles.css"; // Import the shared CSS file
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useAuth } from "../context/AuthContext"; // Import AuthContext

const LoginPage = () => {
  const { setUser } = useAuth(); // Access setUser from AuthContext
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login request data:", { usernameOrEmail, password });

    const userData = { usernameOrEmail, password };

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to log in");
      }

      const data = await response.json();
      console.log("User logged in:", data);

      setUser(data); // Update user in AuthContext
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
    }
  };

  const handleSignUp = () => {
    navigate("/signup"); // Redirect to sign-up page
  };

  return (
    <div
      className="form-container"
      style={{ textAlign: "center", padding: "20px" }}
    >
      <h1 style={{ color: "#333" }}>Login</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
          placeholder="Username or Email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          required
          style={{
            margin: "10px 0",
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            margin: "10px 0",
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            margin: "10px 0",
            padding: "10px 20px",
            width: "300px",
            borderRadius: "5px",
            backgroundColor: "#4F46E5",
            color: "#fff",
            border: "none",
          }}
        >
          Login
        </button>
      </form>
      <button
        onClick={handleSignUp}
        className="signup-button"
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          width: "300px",
          borderRadius: "5px",
          backgroundColor: "#4F46E5",
          color: "#fff",
          border: "none",
        }}
      >
        Sign Up
      </button>
    </div>
  );
};

export default LoginPage;
