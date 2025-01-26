import express from "express";
import {
  addNotes,
  editNotes,
  notesById,
  notesDeleteById,
  notesGetAll,
} from "../controller/notes-controller.js";

const router = express.Router();

router.route("/insert").post(addNotes);
router.route("/update/:id").put(editNotes);
router.route("/get/:id").get(notesById);
router.route("/delete/:id").delete(notesDeleteById);
router.route("/get").get(notesGetAll);

export default router;
