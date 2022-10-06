
const addBlog=(blogs)=>{
    const blog=new Blog({
        title:blogs.blogTitle,
        description:blogs.blogDescription,
        bloglink:blogs.blogBloglink,
        url:blogs.blogUrl,
    });

    return blog.save();
}

const findBlog=()=>{
    return Blog.find();
}

module.exports={
    addBlog,
    findBlog
}