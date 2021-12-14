import Joi from "joi";
import { Handler } from "express";
import { isValidObjectId } from "mongoose";
import { AddBlogRequest, IdRequest, UpdateBlogRequest } from "../types";

export const validateId: Handler = (req: IdRequest, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) res.sendStatus(400);
  req.validated = { id };

  next();
};

export const validateAddBlog: Handler = (req: AddBlogRequest, res, next) => {
  let { title, author, url, likes } = req.body;
  if (!likes) likes = 0;
  if (!(title && title.trim() && url && url.trim() && author && author.trim()))
    res.sendStatus(400);

  req.validated = { title, author, url, likes };
  next();
};

export const validateUpdateBlog: Handler = (
  req: UpdateBlogRequest,
  res,
  next
) => {
  let { title, url, likes } = req.body;
  const { id } = req.params;
  if (!isValidObjectId(id)) res.sendStatus(400);
  if (
    !(title && title.trim()) &&
    !(url && url.trim()) &&
    !(likes && likes.trim())
  )
    res.sendStatus(400);

  req.validated = { title, url, likes, id };

  next();
};
