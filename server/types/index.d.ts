import { Request } from "express";
export interface Blog {
  author: string;
  title: string;
  url: string;
  likes: number;
}

export interface BlogData extends Blog {
  _id: string;
  __v: number;
}

export interface IdRequest extends Request {
  validated?: ValidatedId;
}

export interface ValidatedId {
  id: string;
}

export interface AddBlogRequest extends Request {
  validated?: ValidatedAddBlog;
}
export interface ValidatedAddBlog {
  title: string;
  author: string;
  url: string;
  likes: number;
}

export interface UpdateBlogRequest extends Request {
  validated?: ValidatedUpdateBlog;
}
export interface ValidatedUpdateBlog {
  title: string;
  id: string;
  url: string;
  likes: number;
}

export type UpdateBlogQuery = Omit<ValidatedUpdateBlog, "id">;
