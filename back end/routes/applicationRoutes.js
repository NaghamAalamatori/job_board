import express from "express";
import multer from "multer";
import path from "path";
import Application from "../models/Application.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Job application management
 */

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Submit a new job application
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - birthday
 *               - reason
 *               - resume
 *               - jobId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the applicant
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the applicant
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Applicant's date of birth
 *               reason:
 *                 type: string
 *                 description: Reason for applying
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: Resume file
 *               jobId:
 *                 type: string
 *                 description: ID of the job being applied for
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       400:
 *         description: Missing required fields or invalid data
 *       500:
 *         description: Server error
 */
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, birthday, reason, jobId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const application = new Application({
      name,
      email,
      birthday,
      reason,
      jobId,
      resume: req.file.path,
    });

    await application.save();
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error saving application:", error);
    res.status(500).json({ message: "Error submitting application" });
  }
});

/**
 * @swagger
 * /api/applications/job/{jobId}:
 *   get:
 *     summary: Get all applications for a specific job
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of applications
 *       404:
 *         description: No applications found
 *       500:
 *         description: Server error
 */
router.get("/job/:jobId", async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId });
    if (!applications.length) {
      return res.status(404).json({ message: "No applications found" });
    }
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications" });
  }
});

/**
 * @swagger
 * /api/applications/{id}:
 *   get:
 *     summary: Get a specific application by ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application details
 *       404:
 *         description: Application not found
 *       500:
 *         description: Server error
 */
router.get("/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: "Error fetching application" });
  }
});

export default router;
