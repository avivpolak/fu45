import {Handler} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {SALT_ROUNDS, JWT_SECRET} from '../utils/config';

import {LoginRequest, RegisterRequest} from '../types/index';

import User from '../models/Users';

export const login: Handler = async (req: LoginRequest, res, next) => {
  try {
    if (!req.validated) throw Error('No validated obj');
    const {username, password} = req.validated;
    const user = await User.findOne({username});
    if (!user) return res.status(400).send('No such username');
    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).send('Bad password');

    const token = await jwt.sign(
      {username, name: user.name, id: user.id},
      JWT_SECRET,
    );

    res.send({token});
  } catch (error) {
    next(error);
  }
};

export const register: Handler = async (req: RegisterRequest, res, next) => {
  try {
    if (!req.validated) throw Error('No validated obj');
    const {name, username, password} = req.validated;
    const exists = await User.findOne({username});
    if (exists) return res.status(400).send('User already exists');

    const salt = await bcrypt.genSalt(+SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      name,
      salt,
      password: hashedPassword,
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
};
