import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "./lib/cors.js";
import connectDB from "./lib/mongo.js";
import authRoutes from './routes/auth.route.js'
import contactsRoutes from './routes/contact.route.js'


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample route
app.get("/", (req, res) => {
  res.send("Hello World from Express API");
});

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
  connectDB()
} );
