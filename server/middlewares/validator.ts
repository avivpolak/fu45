import Joi from 'joi';
import {Handler} from 'express';
import {isValidObjectId} from 'mongoose';
import {
  AddBlogRequest,
  IdRequest,
  UpdateBlogRequest,
  LoginRequest,
  RegisterRequest,
} from '../types';

export const validateId: Handler = (req: IdRequest, res, next) => {
  const {id} = req.params;
  if (!isValidObjectId(id)) return res.sendStatus(400);
  req.validated = {id};

  next();
};

export const validateLogin: Handler = (req: LoginRequest, res, next) => {
  let {username, password} = req.body;
  if (!(username && username.trim() && password && password.trim()))
    return res.sendStatus(400);

  req.validated = {username, password};
  next();
};

export const validateRegister: Handler = (req: RegisterRequest, res, next) => {
  let {username, name, password} = req.body;
  if (
    !(
      username &&
      username.trim() &&
      name &&
      name.trim() &&
      password &&
      password.trim()
    )
  )
    return res.sendStatus(400);

  req.validated = {username, name, password};
  next();
};

export const validateAddBlog: Handler = (req: AddBlogRequest, res, next) => {
  let {title, author, url, likes} = req.body;
  if (!likes) likes = 0;
  if (!(title && title.trim() && url && url.trim() && author && author.trim()))
    return res.sendStatus(400);

  req.validated = {title, author, url, likes};
  next();
};

export const validateUpdateBlog: Handler = (
  req: UpdateBlogRequest,
  res,
  next,
) => {
  let {title, url, likes} = req.body;
  const {id} = req.params;
  if (!isValidObjectId(id)) return res.sendStatus(400);
  if (
    !(title && title.trim()) &&
    !(url && url.trim()) &&
    !(likes && likes.trim())
  )
    return res.sendStatus(400);

  req.validated = {title, url, likes, id};

  next();
};
