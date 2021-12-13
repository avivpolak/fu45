import express from 'express';

import {
	allNotes,
	singleNoteById,
	addNewNote,
	deleteSingleNoteById,
	updateSingleNoteById
} from '../controllers/notes';

const notesRouter = express.Router();

notesRouter.get('/', allNotes);
notesRouter.get('/:id', singleNoteById);
notesRouter.post('/', addNewNote);
notesRouter.delete('/:id', deleteSingleNoteById);
notesRouter.put('/:id', updateSingleNoteById);

export default notesRouter;
