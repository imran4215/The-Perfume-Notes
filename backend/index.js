// Import packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Import local modules
import { connectDB } from "./db/db.js";
import perfumeBlogRoutes from "./routes/perfumeBlog.route.js";
import designerRoutes from "./routes/designers.route.js";
import perfumerRoutes from "./routes/perfumers.route.js";
import categoryRoutes from "./routes/category.route.js";
import noteRoutes from "./routes/note.route.js";
import feedbackRoutes from "./routes/feedback.route.js";
import commentsRoutes from "./routes/comments.route.js";
import authorRoutes from "./routes/author.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";

// Configuration
dotenv.config();

// Variables
const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = [
  "http://localhost:5173",
  "https://theperfumenotes.com",
  "https://www.theperfumenotes.com",
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Routes
app.use("/api/perfumeBlog", perfumeBlogRoutes);
app.use("/api/designer", designerRoutes);
app.use("/api/perfumer", perfumerRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/comment", commentsRoutes);
app.use("/api/author", authorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

// Server Setup
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectDB();
});
