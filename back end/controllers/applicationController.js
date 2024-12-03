import Application from "../models/Application.js";

// Create a new application
export const createApplication = async (req, res) => {
  try {
    const { jobId, applicant, coverLetter } = req.body;
    const resume = req.file ? req.file.path : null;

    console.log({ jobId, applicant, resume, coverLetter }); // Log incoming data for debugging

    // Validate required fields
    if (!jobId || !applicant || !resume) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const application = new Application({
      job: jobId,
      applicant,
      resume,
      coverLetter,
    });

    await application.save();
    res
      .status(201)
      .json({ message: "Application created successfully", application });
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all applications for a job
export const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ job: jobId }).populate(
      "applicant",
      "name email"
    );

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single application by ID
export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id).populate(
      "job applicant",
      "title name email"
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res
      .status(200)
      .json({ message: "Application status updated", application });
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an application
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ message: "Server error" });
  }
};
