import React, { useEffect, useState } from "react";

const AnalyticsPage = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/analytics",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch analytics: ${await response.text()}`
          );
        }

        const data = await response.json();
        setMetrics(data); // Update state with fetched metrics
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading analytics...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center mb-6">
        Platform Analytics
      </h1>

      {/* Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div className="text-gray-700">
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="text-3xl font-bold">{metrics.totalUsers}</p>
          </div>
          <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
            <svg
              className="w-12 h-12"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 8v4l4 2" />
            </svg>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div className="text-gray-700">
            <h3 className="text-xl font-semibold">Total Jobs</h3>
            <p className="text-3xl font-bold">{metrics.totalJobs}</p>
          </div>
          <div className="bg-green-100 text-green-600 p-4 rounded-full">
            <svg
              className="w-12 h-12"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 8v4l4 2" />
            </svg>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div className="text-gray-700">
            <h3 className="text-xl font-semibold">Total Applications</h3>
            <p className="text-3xl font-bold">{metrics.totalApplications}</p>
          </div>
          <div className="bg-red-100 text-red-600 p-4 rounded-full">
            <svg
              className="w-12 h-12"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 8v4l4 2" />
            </svg>
          </div>
        </div>
      </div>

      {/* More details or charts can go here */}
    </div>
  );
};

export default AnalyticsPage;
