import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { setUser: setAuthUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the token in localStorage
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);

  const handleSignOut = () => {
    setAuthUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      {user ? (
        <div className="flex items-center mb-4">
          <FaUserCircle className="text-4xl mr-2" />
          <div>
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-600">Role: {user.role}</p>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
      <button
        onClick={handleSignOut}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Sign Out
      </button>
    </div>
  );
};

export default ProfilePage;
