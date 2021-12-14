import express from 'express';

import {
  addBlog,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  updateBlogById,
} from '../controllers/blogsController';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', addBlog);
router.delete('/:id', deleteBlogById);
router.patch('/:id', updateBlogById);

export default router;
