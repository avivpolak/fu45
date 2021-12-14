import supertest from 'supertest';
import mongoose from 'mongoose';
const {ObjectId} = mongoose.Types;

import {
  mockBlogs,
  newBlog,
  newBlogMissingLikes,
  newBlogMissingUrl,
  newBlogMissingTitle,
} from './mocks';

import {
  newUser,
  newUserMissingName,
  newUserMissingPassword,
  newUserMissingUsername,
} from './mocks';

import Blog from '../models/Blogs';
import User from '../models/Users';
import app from '../app';

const api = supertest(app);

beforeAll(async ()=>{
	Blog.deleteMany({});
	User.deleteMany({});
})

describe('/api/blogs', () => {
  let token = '';

  beforeAll(async () => {
    //TODO make a util
    await api
      .post('/api/auth/register')
      .send({username: 'username', password: 'password', name: 'name'});
    const {body} = await api
      .post('/api/auth/login')
      .send({username: 'username', password: 'password'});
    token = body.token;
  });

  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(mockBlogs);
  }, 30000);

  describe('GET /api/blogs', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
    test('all the blogs are returned', async () => {
      const {body} = await api.get('/api/blogs');
      expect(body.length).toBe(mockBlogs.length);
    });
  });

  describe('GET /api/blogs/:id', () => {
    test('single blog is returned as json with id and not _id or __v', async () => {
      const {body} = await api.get('/api/blogs');
      const blogId = body[0].id;
      const {body: blog} = await api
        .get(`/api/blogs/${blogId}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      expect(blog.id).toBeDefined();
      expect(blog._id).not.toBeDefined();
      expect(blog.__v).not.toBeDefined();
    });
    test('if bad id, return 400', async () => {
      await api.get(`/api/blogs/notAnObjectId`).expect(400);
    });
  });

  describe('POST /api/blogs/', () => {
    const beforeLength = mockBlogs.length;
    test('if no authorization header return 403', async () => {
      await api
        .post(`/api/blogs/`)
        .send(newBlog)
        .expect(403);
    });
    test('single blog is returned as json and save correctly', async () => {
      const {body: blog} = await api
        .post(`/api/blogs/`)
		  .set('authorization', token)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const {body: blogs} = await api.get(`/api/blogs/`);
      expect(blogs.length).toBe(beforeLength + 1);

      delete blog.id;
      expect(blog).toEqual(newBlog);
    });

    test('if no likes provided set them to 0', async () => {
      const {body: blog} = await api
        .post(`/api/blogs/`)
		  .set('authorization', token)
        .send(newBlogMissingLikes)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(blog.likes).toBe(0);
    });

    test('if no title or url provided return 400', async () => {
      await api
        .post(`/api/blogs/`)
		  .set('authorization', token)
        .send(newBlogMissingTitle)
        .expect(400);
      await api
        .post(`/api/blogs/`)
		  .set('authorization', token)
        .send(newBlogMissingUrl)
        .expect(400);
    });
  });

  describe('DELETE /api/blogs/:id', () => {
    test('if bad id, return 400', async () => {
      await api.delete(`/api/blogs/notAnObjectId`).expect(400);
    });
    test('delete the user', async () => {
      const {body} = await api.get('/api/blogs');
      const blogId = body[0].id;
      const beforeLength = (await api.get('/api/blogs')).body.length;

      await api.delete(`/api/blogs/${blogId}`).expect(204);

      const {body: blogs} = await api.get('/api/blogs');
      expect(blogs.length).toBe(beforeLength - 1);
    });
    test('if non existing id, return 404', async () => {
      const nonExistingId = new ObjectId();
      await api.delete(`/api/blogs/${nonExistingId}`).expect(404);
    });
  });

  describe('PATCH /api/blogs/:id', () => {
    test('if bad id, return 400', async () => {
      await api.patch(`/api/blogs/notAnObjectId`).expect(400);
    });
    test('if non existing id, return 404', async () => {
      const nonExistingId = new ObjectId();
      await api
        .patch(`/api/blogs/${nonExistingId}`)
        .send({url: 'url'})
        .expect(404);
    });
    test('update the values', async () => {
      const newTitle = 'new title';
      const newUrl = 'new url';
      const newLikes = 111;
      const {body} = await api.get('/api/blogs');
      const blogId = body[0].id;

      let {body: blog} = await api
        .patch(`/api/blogs/${blogId}`)
        .send({url: newUrl})
        .expect(200);
      blog = (await api.get(`/api/blogs/${blogId}`)).body;
      expect(blog.url).toBe(newUrl);

      blog = (
        await api
          .patch(`/api/blogs/${blogId}`)
          .send({title: newTitle, likes: newLikes})
          .expect(200)
      ).body;
      blog = (await api.get(`/api/blogs/${blogId}`)).body;
      expect(blog.title).toBe(newTitle);
      expect(blog.likes).toBe(newLikes);
    });
  });
});

describe('/api/auth', () => {
  beforeAll(async () => {
    await User.deleteMany({});
  }, 30000);

  describe('POST /api/auth/register', () => {
    test('if no username, name, password returns 400', async () => {
      await api
        .post('/api/auth/register')
        .send(newUserMissingName)
        .expect(400);
      await api
        .post('/api/auth/register')
        .send(newUserMissingPassword)
        .expect(400);
      await api
        .post('/api/auth/register')
        .send(newUserMissingUsername)
        .expect(400);
    });
    test('saves the new user in the DB, hash the pass, if alredy exists return 400', async () => {
      const {body: user} = await api
        .post('/api/auth/register')
        .send(newUser)
        .expect(200);
      expect(user.username).toBe(newUser.username);
      expect(user.name).toBe(newUser.name);
      expect(user.password).not.toBe(newUser.password);
      await api
        .post('/api/auth/register')
        .send(newUser)
        .expect(400);
    });
  });

  describe('POST /api/auth/login', () => {
    test('if no username, password returns 400', async () => {
      await api
        .post('/api/auth/login')
        .send(newUserMissingPassword)
        .expect(400);
      await api
        .post('/api/auth/login')
        .send(newUserMissingUsername)
        .expect(400);
    });
    test('bad pass or bad username -> 400', async () => {
      await api
        .post('/api/auth/login')
        .send({username: 'bad username', password: newUser.password})
        .expect(400);
      await api
        .post('/api/auth/login')
        .send({username: newUser.username, password: 'bad pass'})
        .expect(400);
    });
    test('good login returns token ', async () => {
      const {
        body: {token},
      } = await api
        .post('/api/auth/login')
        .send(newUser)
        .expect(200);
      expect(token).toBeDefined();
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
