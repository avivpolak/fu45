import { BlogData, Blog } from "../types/index";

export const newBlog = {
    title: "New Blog Title",
    author: "New Author",
    url: "https://reactpatterns.com/",
    likes: 17,
};
export const polakBlog = {
    title: "polaks New Blog Title",
    author: "polak",
    url: "https://polak.com/",
    likes: 17,
};

export const newBlogMissingLikes = {
    title: "New Blog Title no likes",
    author: "New Author",
    url: "https://reactpatterns.com/",
};
export const newBlogMissingTitle = {
    author: "New Author",
    url: "https://reactpatterns.com/",
    likes: 13,
};
export const newBlogMissingUrl = {
    title: "New Blog Title no url",
    author: "New Author",
    likes: 4,
};

export const mockBlogsData: BlogData[] = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
    },
];

export const fromDataToBlogs = (data: BlogData[]): Blog[] =>
    data.map(({ _id, __v, ...rest }) => ({ ...rest }));

export const mockBlogs = fromDataToBlogs(mockBlogsData);

export const mockUsers = [
    { username: "User 1", name: "Name 1", password: "123456" },
    { username: "User 2", name: "Name 2", password: "123456" },
    { username: "User 3", name: "Name 3", password: "123456" },
    { username: "User 4", name: "Name 4", password: "123456" },
];
