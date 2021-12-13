import supertest from 'supertest';
import mongoose from 'mongoose';

import {BlogData} from '../types/index';

import {mockBlogs, newBlog} from './mocks';

import Blog from '../models/Blogs';
import app from '../app';

const api = supertest(app);

beforeAll(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(mockBlogs);
}, 30000);

let blogId: string;

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('all the blogs are returned', async () => {
    const {body} = await api.get('/api/blogs');
    blogId = body[0].id;
    expect(body.length).toBe(mockBlogs.length);
  });
});

describe('GET /api/blogs/:id', () => {
  test('single blog is returned as json', async () => {
    await api
      .get(`/api/blogs/${blogId}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('blog is returned with id and not _id or __v', async () => {
    const {body: blog} = await api.get(`/api/blogs/${blogId}`);
    expect(blog.id).toBeDefined();
    expect(blog._id).not.toBeDefined();
    expect(blog.__v).not.toBeDefined();
  });
});

describe('POST /api/blogs/', () => {
  const beforeLength = mockBlogs.length;
  test('single blog is returned as json and save correctly', async () => {
    const {body: blog} = await api
      .post(`/api/blogs/`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const {body: blogs} = await api.get(`/api/blogs/`);
    expect(blogs.length).toBe(beforeLength + 1);

    delete blog.id;
    expect(blog).toEqual(newBlog);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
