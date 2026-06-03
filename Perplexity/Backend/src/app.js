import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data (e.g., from forms)
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))


app.use(morgan("dev")) // morgan is a popular HTTP request logger middleware for Node.js. The "dev" format provides concise output colored by response status for development use. It includes method, URL, status code, response time, and more. You can change the format to "combined" for more detailed logs in production or customize it as needed.
// loggers is a custom middleware that logs the HTTP method and URL of each incoming request to the console. It helps in monitoring and debugging by providing insights into the requests being made to the server.
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });


// Health check
app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

app.use("/api/auth", authRouter);

export default app;