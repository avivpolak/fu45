import {Blog} from '../types/index';

export const totalLikes = (blogs: Blog[]): number =>
  blogs.reduce((sum, {likes}) => (sum += likes), 0);

export const favoriteBlog = (blogs: Blog[]): Blog =>
  blogs.sort(({likes: a}, {likes: b}) => b - a)[0];

export const mostBlogs = (blogs: Blog[]): {author: string; blogs: number} | undefined => {
  const map: {[key: string]: number} = {};
  for (const {author} of blogs) {
    if (map[author]) map[author] += 1;
    else map[author] = 1;
  }
  const counts = Object.entries(map);
  const highest = counts.sort(([_a, a], [_b, b]) => b - a)[0];
  if(!highest) return undefined;
  return {author: highest[0], blogs: highest[1]};
};
