import asyncHandler from "express-async-handler";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

// Get all jobs
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find().populate("employer", "name email");
  res.status(200).json(jobs);
});

export { getJobs };

// Controller for creating a job
const createJob = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    location,
    salaryRange,
    jobType,
    remote,
    applicationDeadline,
  } = req.body;

  const employer = req.user._id;

  const job = await Job.create({
    title,
    description,
    location,
    salaryRange,
    jobType,
    remote,
    applicationDeadline,
    employer,
  });

  res.status(201).json(job);
});

// Controller for updating a job
const updateJob = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    location,
    salaryRange,
    jobType,
    remote,
    applicationDeadline,
  } = req.body;

  const job = await Job.findById(id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  if (job.employer.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized action" });
  }

  job.title = title || job.title;
  job.description = description || job.description;
  job.location = location || job.location;
  job.salaryRange = salaryRange || job.salaryRange;
  job.jobType = jobType || job.jobType;
  job.remote = remote || job.remote;
  job.applicationDeadline = applicationDeadline || job.applicationDeadline;

  const updatedJob = await job.save();
  res.status(200).json(updatedJob);
});

// Controller for deleting a job
const deleteJob = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  if (job.employer.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized action" });
  }

  await Job.deleteOne({ _id: id });

  res.status(200).json({ message: "Job deleted successfully" });
});

// Controller for getting applications for a job
const getJobApplications = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  if (job.employer.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized action" });
  }

  const applications = await Application.find({ job: id });

  res.status(200).json(applications);
});

// Export the functions
export { createJob, updateJob, deleteJob, getJobApplications };
