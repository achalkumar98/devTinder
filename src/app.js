const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();
const port = 5000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


connectDB()
  .then(() => {
    console.log("Database connection Established...");
    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected", err);
  });
