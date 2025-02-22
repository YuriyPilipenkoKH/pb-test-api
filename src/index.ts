import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Hello World from Express API with TypeScript!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
