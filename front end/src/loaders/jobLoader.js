export const jobLoader = async ({ params }) => {
  try {
    const response = await fetch(`http://localhost:5000/api/jobs/${params.id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch job data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching job data:", error);
    throw error;
  }
};
