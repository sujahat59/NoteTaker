import express from "express";
import { deleteNote, getAllNotes, updateNote, createNote, getNotesById } from "../controllers/notesController.js";

const router = express.Router();



router.get("/", getAllNotes);
router.get("/:id", getNotesById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);


export default router;







