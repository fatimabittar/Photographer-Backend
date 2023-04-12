// server/index.js
import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorMiddleware.js";
const port = process.env.PORT || 8000;
import serviceRoutes from "./routes/serviceRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
const app = express();

//you use these inorder to use the body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/services", serviceRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
