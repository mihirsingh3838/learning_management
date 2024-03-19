import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./router/userRoutes.js";
import courseRoutes from "./router/courseRoutes.js";
import errorMiddleWare from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// for cross origin request issues
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// for parsing the cookies
app.use(cookieParser());

// middleware dev dependency to see log of server
app.use(morgan("dev"));

// Route to just test the server
app.use("/ping", (req, res) => {
  res.send("Pong");
});

// Routing for all user options
app.use("/api/v1/user", userRoutes);

//Routing for course options
app.use("api/v1/courses", courseRoutes)

// Routing for all other non existing routes
app.all("*", (req, res) => {
  res.status(404).send("OOPS!! 404 PAGE NOT FOUND");
});

app.use(errorMiddleWare);

export default app;
