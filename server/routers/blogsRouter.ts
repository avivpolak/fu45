import express from "express";

import {
  addBlog,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  updateBlogById,
} from "../controllers/blogsController";

import {
  validateAddBlog,
  validateId,
  validateUpdateBlog,
} from "../middlewares/validator";

import { authPublic } from '../middlewares/auth';

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", validateId, getBlogById);
router.post("/", authPublic, validateAddBlog, addBlog);
router.delete("/:id", validateId, deleteBlogById);
router.patch("/:id", validateUpdateBlog, updateBlogById);

export default router;
