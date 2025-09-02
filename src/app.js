require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");

const connectDB = require("./config/database");
const initializeSocket = require("./utils/socket");

// Import routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const chatRouter = require("./routes/chat");

const app = express();
const port = process.env.PORT || 7777;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", authRouter);
app.use("/api", profileRouter);
app.use("/api", requestRouter);
app.use("/api", userRouter);
app.use("/api", paymentRouter);
app.use("/api", chatRouter);

// Server + Socket
const server = http.createServer(app);
initializeSocket(server);

// Connect DB and start server
connectDB()
  .then(() => {
    console.log("Database connected...");
    server.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error("DB connection error:", err));
