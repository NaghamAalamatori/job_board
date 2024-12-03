# Job Board Application

A full-stack job board application with user authentication, job posting, and application features.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd job-board-api
   ```

2. **Install Dependencies**

   ```bash
   cd back end
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the backend directory and add:

   ```
   JWT_SECRET=your_jwt_secret
   DB_URI=your_mongo_database_url
   PORT=5000
   ```

4. **Start the Backend Server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install Frontend Dependencies**

   ```bash
   cd front end
   npm install
   ```

2. **Start the Frontend Development Server**
   ```bash
   npm run dev
   ```

## Features

- User authentication (signup/login)
- Job posting and management
- Job search and filtering
- Job applications
- User profiles

## API Documentation

### Authentication Endpoints

- POST `/api/users/signup` - Register a new user
- POST `/api/users/login` - User login
- GET `/api/users/profile` - Get user profile

### Job Endpoints

- GET `/api/jobs` - Get all jobs
- POST `/api/jobs` - Create a new job posting
- GET `/api/jobs/:id` - Get specific job
- PUT `/api/jobs/:id` - Update job posting
- DELETE `/api/jobs/:id` - Delete job posting

## Testing

Use Postman or any API testing tool to test the endpoints. Import the provided Postman collection for easy testing.

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
