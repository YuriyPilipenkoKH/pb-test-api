import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './routes/auth.route.js'

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample route
app.get("/", (req, res) => {
  res.send("Hello World from Express API with TypeScript!");
});

app.use('/api/auth', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
