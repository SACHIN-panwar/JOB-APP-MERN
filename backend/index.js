import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173', // update this to your frontend domain on deploy
  credentials: true
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// ✅ Root route to avoid "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Backend server is live 🎉");
});

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
