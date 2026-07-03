# CineVerse - Backend

This is the Node.js/Express backend for the CineVerse movie streaming platform. It handles user authentication, custom movie management for admins, and user-specific data like watchlists and favorites.

## Features
- RESTful API architecture
- JWT (JSON Web Token) authentication via HTTP-only cookies
- MongoDB integration using Mongoose
- Role-based access control (User vs. Admin)
- Secure password hashing with bcrypt

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Database (Atlas or local instance)

### Configuration

Create a `.env` file in the root of the `server` directory and configure the following variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/cineverse?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
```

To connect to MongoDB:
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/atlas) (or use a local instance).
2. Get your connection string.
3. Replace `<username>` and `<password>` with your database user credentials.
4. Ensure the database name (e.g., `cineverse`) is specified in the URI right before the query parameters `?retryWrites...` so collections are grouped properly.

### Installation & Running

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server (uses nodemon for auto-restarts):
   ```bash
   npm run dev
   ```
   *Alternatively, start for production using `npm start`.*

3. The server will run on `http://localhost:5000`.

### Connecting with the Frontend
The backend is configured with CORS to accept requests from `http://localhost:5173`. If you run the frontend on a different port, you must update the `cors` origin setting in `server/index.js`.
