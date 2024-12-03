import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a job title"],
    },
    description: {
      type: String,
      required: [true, "Please add a job description"],
    },
    location: {
      type: String,
      required: [true, "Please add a job location"],
    },
    salaryRange: {
      type: String,
      required: [true, "Please add a salary range"],
    },
    jobType: {
      type: String,
      required: [true, "Please specify the job type"],
    },
    remote: {
      type: Boolean,
      default: false,
    },
    applicationDeadline: {
      type: Date,
      required: [true, "Please specify the application deadline"],
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
