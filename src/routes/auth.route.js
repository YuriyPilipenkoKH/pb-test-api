import express from 'express';
import { login } from '../controllers/auth/login.js';

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Auth route is working!" });
});

router.post('/login', login );

export default router;