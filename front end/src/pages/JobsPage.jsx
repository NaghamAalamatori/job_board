import { useLoaderData, Link } from "react-router-dom";
import { FaMapMarker, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

export const jobsLoader = async () => {
  try {
    const [jobsResponse, userResponse] = await Promise.all([
      fetch("http://localhost:5000/api/jobs"),
      fetch("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    ]);

    const jobs = await jobsResponse.json();
    let user = null;

    if (userResponse.ok) {
      user = await userResponse.json();
    }

    return { jobs, user };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { jobs: [], user: null };
  }
};

const JobsPage = () => {
  const { jobs, user } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");

  console.log("Current user:", user);
  console.log("Jobs:", jobs);

  const handleClear = () => {
    setSearchTerm("");
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete job");

      toast.success("Job deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      {user && (
        <div className="mb-4 p-2 bg-gray-100 rounded">
          Logged in as: {user.role} (ID: {user._id})
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search jobs by title, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Job Listings */}
      {filteredJobs.length === 0 ? (
        <div className="text-center text-gray-600 mt-8">
          No jobs found matching your search.
        </div>
      ) : (
        filteredJobs.map((job) => (
          <div key={job._id} className="bg-white rounded-xl shadow-md p-6 mb-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
                <div className="text-gray-600 mb-6">{job.jobType}</div>
                <p className="mb-4">{job.description}</p>
                <div className="text-indigo-500 mb-4">{job.salaryRange}</div>
                <div className="text-orange-700">
                  <FaMapMarker className="inline text-lg mb-1 mr-1" />
                  {job.location}
                </div>
              </div>
              {/* Show edit/delete buttons for employer */}
              {user &&
                user.role === "employer" &&
                job.employer.toString() === user._id.toString() && (
                  <div className="flex gap-2 ml-4">
                    <Link
                      to={`/edit-job/${job._id}`}
                      className="p-2 text-blue-500 hover:text-blue-600 bg-blue-50 rounded-full"
                      title="Edit Job"
                    >
                      <FaEdit size={20} />
                    </Link>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="p-2 text-red-500 hover:text-red-600 bg-red-50 rounded-full"
                      title="Delete Job"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                )}
            </div>
            {/* Show Apply button for job seekers */}
            {(!user || user.role === "jobseeker") && (
              <Link
                to={`/apply/${job._id}`}
                className="mt-4 inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg text-center font-semibold transition-colors duration-200"
              >
                Apply Now
              </Link>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default JobsPage;
