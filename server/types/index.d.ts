export interface Blog {
  author: string;
  title: string;
  url: string;
  likes: number;
}

interface BlogData extends Blog {
  _id: string;
  __v: number;
}
