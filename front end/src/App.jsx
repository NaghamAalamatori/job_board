import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobPage, { jobLoader } from "./pages/JobPage";
import NotFoundPage from "./pages/NotFoundPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ApplyForJobPage from "./pages/ApplyForJobPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import UsersPage from "./pages/UsersPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobsPage, { jobsLoader } from "./pages/JobsPage";

const App = () => {
  const addJob = async (newJob) => {
    const res = await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    if (res.ok) {
      console.log("Job added successfully!");
    } else {
      console.error("Failed to add job");
    }
  };

  const deleteJob = async (id) => {
    const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      console.log("Job deleted successfully!");
    } else {
      console.error("Failed to delete job");
    }
  };

  const updateJob = async (job) => {
    const res = await fetch(`http://localhost:5000/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    if (res.ok) {
      console.log("Job updated successfully!");
    } else {
      console.error("Failed to update job");
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} loader={jobsLoader} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader} // Use jobLoader for fetching job data
        />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader} // Fetch job data using jobLoader
          errorElement={<NotFoundPage />} // Display NotFoundPage in case of error
        />
        <Route path="/apply/:id" element={<ApplyForJobPage />} />
        <Route path="/admin/analytics" element={<AnalyticsPage />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />{" "}
      {/* ToastContainer is here for displaying notifications */}
    </AuthProvider>
  );
};

export default App;
