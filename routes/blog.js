const router = require("express").Router();
const { createNewBlog, fetchBlog } = require("../controllers/blog");

router.post("/blog", createNewBlog); //Add New Blog
router.get("/blog",fetchBlog); //Fetch Blog

module.exports = router;
