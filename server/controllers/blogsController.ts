import {Handler} from 'express';

import Note from '../models/notes';

export const allNotes: Handler = async (req, res, next) => {
  try {
    const notes = await Note.find({});
    res.send(notes);
  } catch (error) {
    next(error);
  }
};

export const singleNoteById: Handler = async (req, res, next) => {
  try {
    const {id} = req.params;
    const note = await Note.findById(id);
    if (!note) res.send(404);
    res.send(note);
  } catch (error) {
    next(error);
  }
};

export const addNewNote: Handler = async (req, res, next) => {
  try {
    const {content, important, date} = req.body;
    const note = await Note.create({
      content,
      important,
      date: new Date(date),
    });
    res.send(note);
  } catch (error) {
    next(error);
  }
};

export const deleteSingleNoteById: Handler = async (req, res, next) => {
  try {
    const {id} = req.params;
    const note = await Note.findByIdAndDelete(id);
    if (!note) res.send(404);
    res.send(204);
  } catch (error) {
    next(error);
  }
};

export const updateSingleNoteById: Handler = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {important, content} = req.body;
    const note = await Note.findByIdAndUpdate(id, {important, content});
    if (!note) res.send(404);
    res.send(note);
  } catch (error) {
    next(error);
  }
};
