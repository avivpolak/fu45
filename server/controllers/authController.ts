import {Handler} from 'express';
import {isValidObjectId} from 'mongoose';

import User from '../models/Users';

// TODO extract all validations to validate midleware
export const login: Handler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const register: Handler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
