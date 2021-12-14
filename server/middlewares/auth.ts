import {Handler} from 'express';
import jwt from 'jsonwebtoken';

import {AuthRequest, AuthPayload} from '../types/index';

import {JWT_SECRET} from '../utils/config';

export const authPublic: Handler = async (req: AuthRequest, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.sendStatus(403);

    if (!JWT_SECRET) throw Error('No JWT_SECRET');

    const user = await jwt.verify(token, JWT_SECRET);
	 //TODO add joi validation
    req.user = user as AuthPayload;
    next();
  } catch (error) {
    next(error);
  }
};
