import {Handler} from 'express';
import {isValidObjectId} from 'mongoose';

import User from '../models/Users';

// TODO extract all validations to validate midleware
export const getAllUsers: Handler = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById: Handler = async (req, res, next) => {
  try {
    const {id} = req.params;
    if (!isValidObjectId(id)) res.sendStatus(400);
    const user = await User.findById(id);
    if (!user) res.sendStatus(404);
    res.send(user);
  } catch (error) {
    next(error);
  }
};
