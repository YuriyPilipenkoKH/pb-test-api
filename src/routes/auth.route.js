import express from 'express';
import { login } from '../controllers/auth/login.js';
import { signup } from '../controllers/auth/signup.js';
import { logout } from '../controllers/auth/logout.js';
import { authenticate } from '../middleware/authenticate.js';
import { getCurrent } from '../controllers/auth/getCurrent.js';
import { upload } from '../lib/multer.js';
import { uploadAvatar } from '../controllers/auth/uploadAvatar.js';

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Auth route is working!" });
});

router.post('/signup', signup );

router.post('/login', login );

router.post('/logout',   logout );

router.get("/current", authenticate,  getCurrent);

router.put('/upload-avatar', authenticate, upload.single('file'), uploadAvatar );

export default router;