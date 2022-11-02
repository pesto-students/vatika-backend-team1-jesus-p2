const Blog = require("../models/Blog");
const { addBlog, findBlog } = require("../services/BlogTable");

const createNewBlog = async (req, res) => {
  const blogs = {
    blogTitle: req.body.title,
    blogDescription: req.body.description,
    blogBloglink: req.body.bloglink,
    blogUrl: req.body.url,
  };

  try {
    const saveBlog = await addBlog(blogs);
    res.status(200).send("Blog Saved !");
  } catch (err) {
    res.status(400).send(err);
  }
};

const fetchBlog = async (req, res) => {
  const allBlogs = await findBlog();
  if (allBlogs.length == 0) return res.send("No Blog to Display");
  res.send(allBlogs);
};

module.exports = {
  createNewBlog,
  fetchBlog,
};
