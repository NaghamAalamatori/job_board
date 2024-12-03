import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createJob,
  updateJob,
  deleteJob,
  getJobs,
  getJobApplications,
} from "../controllers/jobController.js";

const router = express.Router();

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all job listings
 *     description: This endpoint allows an authenticated user to retrieve all job listings.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of jobs retrieved successfully
 *       401:
 *         description: Unauthorized (invalid token)
 *       500:
 *         description: Server error
 */
router.get("/", getJobs);

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Add a new job
 *     description: This endpoint allows an authenticated user to add a new job listing.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Job title
 *               description:
 *                 type: string
 *                 description: Job description
 *               location:
 *                 type: string
 *                 description: Job location
 *               salaryRange:
 *                 type: string
 *                 description: Salary range (e.g., "50000-80000")
 *               jobType:
 *                 type: string
 *                 description: Job type (e.g., "Full-time", "Part-time")
 *               remote:
 *                 type: boolean
 *                 description: Is the job remote?
 *               applicationDeadline:
 *                 type: string
 *                 format: date
 *                 description: Application deadline
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Bad request (invalid input)
 *       401:
 *         description: Unauthorized (invalid token)
 *       500:
 *         description: Server error
 */
router.post("/", protect, createJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Update a job listing
 *     description: This endpoint allows an authenticated user to update an existing job listing.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the job to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               salaryRange:
 *                 type: string
 *               jobType:
 *                 type: string
 *               remote:
 *                 type: boolean
 *               applicationDeadline:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       400:
 *         description: Bad request (invalid input)
 *       401:
 *         description: Unauthorized (invalid token)
 *       403:
 *         description: Forbidden (not authorized to update)
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.put("/:id", protect, updateJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Delete a job listing
 *     description: This endpoint allows an authenticated user to delete a job listing.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the job to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       401:
 *         description: Unauthorized (invalid token)
 *       403:
 *         description: Forbidden (not authorized to delete)
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", protect, deleteJob);

/**
 * @swagger
 * /api/jobs/{id}/applications:
 *   get:
 *     summary: Get applications for a job
 *     description: This endpoint allows an authenticated user to view applications for a job they posted.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the job to view applications for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Applications retrieved successfully
 *       401:
 *         description: Unauthorized (invalid token)
 *       403:
 *         description: Forbidden (not authorized to view applications)
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.get("/:id/applications", protect, getJobApplications);

export default router;
