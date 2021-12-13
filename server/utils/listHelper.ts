import {Blog} from '../types/index';

export const totalLikes = (blogs: Blog[]): number =>
  blogs.reduce((sum, {likes}) => (sum += likes), 0);
