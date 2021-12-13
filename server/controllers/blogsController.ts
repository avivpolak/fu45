import {Handler} from 'express';

import Blog from '../models/Blogs';

export const getAllBlogs: Handler = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.send(blogs);
  } catch (error) {
    next(error);
  }
};

export const getBlogById: Handler = async (req, res, next) => {
  try {
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if (!blog) res.send(404);
    res.send(blog);
  } catch (error) {
    next(error);
  }
};

export const addBlog: Handler = async (req, res, next) => {
  try {
    const {title, author, url, likes} = req.body;
    const blog = await Blog.create({
      title,
      author,
      url,
      likes,
    });
    res.send(blog);
  } catch (error) {
    next(error);
  }
};

export const deleteBlogById: Handler = async (req, res, next) => {
  try {
    const {id} = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) res.send(404);
    res.send(204);
  } catch (error) {
    next(error);
  }
};

export const updateBlogById: Handler = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {title, likes, url} = req.body;
    const blog = await Blog.findByIdAndUpdate(id, {likes, title, url});
    if (!blog) res.send(404);
    res.send(blog);
  } catch (error) {
    next(error);
  }
};
