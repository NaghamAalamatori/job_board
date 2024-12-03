import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const JobListings = ({ isHome, limit }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const jobList = Array.isArray(jobs) ? jobs : [];

  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-2xl font-bold text-center">Recent Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          {jobList.slice(0, limit).map((job) => (
            <div key={job._id || job.id} className="border p-4 rounded-lg">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p>{job.description}</p>
              <Link
                to={`/jobs/${job._id || job.id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
