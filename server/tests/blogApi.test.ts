import supertest from 'supertest';
import mongoose from 'mongoose';

import {BlogData} from '../types/index';

import Blog from '../models/Blogs';
import app from '../app';

const api = supertest(app);

const mockBlogsData: BlogData[] = [];

beforeAll(async () => {
  await Blog.deleteMany({});
  await Blog.bulkWrite(mockBlogsData);
});

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
