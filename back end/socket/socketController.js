import { io } from "../server.js";

// Send a notification to the employer when a job application is made
export const sendApplicationNotification = (employerId, applicantId) => {
  io.emit("application-notification", {
    employerId,
    applicantId,
    message: "A new application has been submitted to your job.",
  });
};
