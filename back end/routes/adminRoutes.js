import express from "express";
const router = express.Router();
import {
  getAnalytics,
  getAllUsers,
  deleteUser,
} from "../controllers/adminController.js";

/**
 * @swagger
 * /admin/analytics:
 *   get:
 *     summary: View platform metrics
 *     description: Retrieves platform-wide metrics. Admin-only access.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Platform analytics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                 totalJobs:
 *                   type: integer
 *                 totalApplications:
 *                   type: integer
 *       403:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.get("/analytics", getAnalytics);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: List all users
 *     description: Retrieves a list of all registered users. Admin-only access.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.get("/users", getAllUsers);

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Manage user accounts
 *     description: Deletes a user by ID. Admin-only access.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       403:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.delete("/users/:id", deleteUser);

export default router;
