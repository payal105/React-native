import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(port, () => console.log(`Connected to DB`)))
  .catch((error) => console.log(error.message));

app.listen(port, () => console.log(`Server running on port ${port}`));
