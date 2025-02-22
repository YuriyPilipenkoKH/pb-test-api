import express from 'express';
import { delContact } from "../controllers/contact/delContact.js";
import { editContact } from "../controllers/contact/editContact.js";
import { newContact } from "../controllers/contact/newContact.js";
import { authenticate } from "../middleware/authenticate.js";


const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Contacts route is working!" });
});

router.get("/grab", authenticate, grabContacts );

router.post("/new", authenticate, newContact );

router.delete("/:id", authenticate, delContact );

router.patch("/:id", authenticate, editContact );


export default router;
