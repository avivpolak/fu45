import {Handler} from 'express';

import {
  IdRequest,
  AuthIdRequest,
  AddBlogRequest,
  UpdateBlogRequest,
  UpdateBlogQuery,
} from '../types';

import Blog from '../models/Blogs';
import {UpdateQuery} from 'mongoose';

export const getAllBlogs: Handler = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.send(blogs);
  } catch (error) {
    next(error);
  }
};

export const getBlogById: Handler = async (req: IdRequest, res, next) => {
  try {
    if (!req.validated) throw Error('No validated obj');
    const {id} = req.validated;
    const blog = await Blog.findById(id);
    if (!blog) res.sendStatus(404);
    res.send(blog);
  } catch (error) {
    next(error);
  }
};

export const addBlog: Handler = async (req: AddBlogRequest, res, next) => {
  try {
    if (!req.validated) throw Error('No validated obj');
    if (!req.user) throw Error('No jwt payload  obj');
    let {title, author, url, likes} = req.validated;
    const blog = await Blog.create({
      title,
      author,
      url,
      likes,
      user: req.user.id,
    });
    res.send(blog);
  } catch (error) {
    next(error);
  }
};

export const deleteBlogById: Handler = async (
  req: AuthIdRequest,
  res,
  next,
) => {
  try {
    if (!req.validated) throw Error('No validated obj');
    if (!req.user) throw Error('No jwt payload obj');
    const {id} = req.validated;
    const {id: userId} = req.user;
    const blog = await Blog.findOneAndRemove({ _id:id, user: userId});
    if (!blog) res.sendStatus(404);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const updateBlogById: Handler = async (
  req: UpdateBlogRequest,
  res,
  next,
) => {
  try {
    if (!req.validated) throw Error('No validated obj');
    const {id, title, likes, url} = req.validated;
    const blog = await Blog.findByIdAndUpdate(id, {
      title,
      likes,
      url,
    } as UpdateQuery<UpdateBlogQuery>);
    if (!blog) res.sendStatus(404);
    res.send(blog);
  } catch (error) {
    next(error);
  }
};
