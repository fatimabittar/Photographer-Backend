// server/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/errorMiddleware.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 8000;
connectDB();
const app = express();
app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

//you use these inorder to use the body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/services", serviceRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
