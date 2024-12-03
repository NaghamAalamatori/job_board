import mongoose from "mongoose";
import dotenv from "dotenv";
import faker from "faker"; // Optional for random data
import bcrypt from "bcryptjs"; // For hashing passwords
import User from "./models/User.js"; // Assuming you have a User model
import Job from "./models/Job.js"; // Assuming you have a Job model

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Create an admin user if it doesn't already exist
const createAdminUser = async () => {
  const adminUserExists = await User.findOne({ email: "admin@example.com" });

  if (!adminUserExists) {
    const adminPassword = await bcrypt.hash("adminPassword123", 10); // Hashing the password
    const adminUser = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword, // Store hashed password
      role: "admin", // Set role to admin
    });

    await adminUser.save();
    console.log("Admin user created");
  } else {
    console.log("Admin user already exists");
  }
};

// Create unique user with random data
const createUniqueUser = async (role) => {
  let email = faker.internet.email();

  // Check if the generated email is unique
  while (await User.findOne({ email })) {
    email = faker.internet.email(); // Generate a new one if it already exists
  }

  const hashedPassword = await bcrypt.hash("password123", 10); // Hashing the password
  const user = new User({
    name:
      role === "job-seeker"
        ? faker.name.findName()
        : faker.company.companyName(),
    email,
    password: hashedPassword,
    role,
    profile: {
      contact: faker.phone.phoneNumber(),
      skills: faker.lorem.words(5),
      resume: faker.system.filePath(),
    },
  });

  return user;
};

// Seed users (job seekers and employers)
const seedUsers = async () => {
  const jobSeekers = [];
  const employers = [];

  // Generate job seekers
  for (let i = 0; i < 5; i++) {
    const user = await createUniqueUser("job-seeker");
    jobSeekers.push(user);
  }

  // Generate employers
  for (let i = 0; i < 3; i++) {
    const user = await createUniqueUser("employer");
    employers.push(user);
  }

  // Create admin user
  await createAdminUser();

  // Save job seekers and employers to DB
  const allUsers = [...jobSeekers, ...employers];
  const savedUsers = await User.insertMany(allUsers);
  console.log("Users seeded");

  // Return employer IDs for jobs
  return savedUsers
    .filter((user) => user.role === "employer")
    .map((user) => user._id);
};

// Seed jobs
const seedJobs = async (employerIds) => {
  const jobs = [];

  // Generate jobs for employers
  for (let i = 0; i < 10; i++) {
    const job = new Job({
      title: faker.name.jobTitle(),
      description: faker.lorem.paragraph(),
      employer: faker.random.arrayElement(employerIds), // Use real employer IDs
      location: faker.address.city(),
      salaryRange: `${faker.random.number({
        min: 30000,
        max: 120000,
      })}-${faker.random.number({ min: 120001, max: 200000 })}`, // Generate a salary range
      applicationDeadline: faker.date.future(), // Set a future date for application deadline
      jobType: faker.random.arrayElement(["full-time", "part-time", "remote"]),
      remote: faker.datatype.boolean(),
    });
    jobs.push(job);
  }

  // Save jobs to DB
  await Job.insertMany(jobs);
  console.log("Jobs seeded");
};

// Run the seeding process
const seedDatabase = async () => {
  await User.deleteMany({}); // Deletes all users to avoid duplicates
  await Job.deleteMany({}); // Deletes all jobs

  const employerIds = await seedUsers(); // Get the employer IDs
  await seedJobs(employerIds); // Seed jobs using employer IDs
  mongoose.connection.close();
};

seedDatabase().catch((error) => console.error(error));
