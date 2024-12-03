// src/pages/JobPage.jsx
import { useLoaderData, Link } from "react-router-dom";
import { FaMapMarker } from "react-icons/fa";

export const jobLoader = async ({ params }) => {
  try {
    const response = await fetch(`http://localhost:5000/api/jobs/${params.id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch job data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching job data:", error);
    throw new Error("Error fetching job data");
  }
};

const JobPage = ({ deleteJob }) => {
  const job = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-md p-6 mb-16">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        <div className="text-gray-600 mb-6">{job.type}</div>
        <p className="mb-4">{job.description}</p>
        <div className="text-indigo-500 mb-4">{job.salary} / Year</div>
        <div className="text-orange-700">
          <FaMapMarker className="inline text-lg mb-1 mr-1" />
          {job.location}
        </div>
      </div>
      <Link
        to={`/apply/${job._id}`}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-center font-semibold shadow-lg transition-colors duration-200"
      >
        Apply Now
      </Link>
    </div>
  );
};

export default JobPage;
