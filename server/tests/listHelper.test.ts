import {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} from '../utils/listHelper';

import {Blog, BlogData} from '../types/index';

import { mockBlogs } from './mocks';

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0);
  });
  test('when list has only one blog, equels the likes of that', () => {
    const singleItem = mockBlogs.slice(0, 1);
    expect(totalLikes(singleItem)).toBe(7);
  });
  test('of a bigger list is calculated right', () => {
    expect(totalLikes(mockBlogs)).toBe(36);
  });
});

describe('favorite blog', () => {
  test('of empty list is undefined', () => {
    expect(favoriteBlog([])).toBe(undefined);
  });
  test('when list has only one blog, equels that', () => {
    const singleItem = mockBlogs.slice(0, 1);
    expect(favoriteBlog(singleItem)).toEqual(singleItem[0]);
  });
  test('of a bigger list is calculated right', () => {
    const correctBlog = mockBlogs[2];
    expect(favoriteBlog(mockBlogs)).toEqual(correctBlog);
  });
});

describe('most blogs', () => {
  test('of empty list is undefined', () => {
    expect(mostBlogs([])).toBe(undefined);
  });
  test('when list has only one blog, equels that', () => {
    const singleItem = mockBlogs.slice(0, 1);
    expect(mostBlogs(singleItem)).toEqual({
      author: singleItem[0].author,
      blogs: 1,
    });
  });
  test('of a bigger list is calculated right', () => {
    const correctBlog = {
      author: 'Robert C. Martin',
      blogs: 3,
    };
    expect(mostBlogs(mockBlogs)).toEqual(correctBlog);
  });
});

describe('most likes', () => {
  test('of empty list is undefined', () => {
    expect(mostLikes([])).toBe(undefined);
  });
  test('when list has only one blog, equels that', () => {
    const singleItem = mockBlogs.slice(0, 1);
    expect(mostLikes(singleItem)).toEqual({
      author: singleItem[0].author,
      likes: singleItem[0].likes,
    });
  });
  test('of a bigger list is calculated right', () => {
    const correctBlog = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    };
    expect(mostLikes(mockBlogs)).toEqual(correctBlog);
  });
});
