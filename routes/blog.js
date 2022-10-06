const router=require('express').Router();
const Blog=require('../models/Blog');

//Add New Blog
router.post('/blog',async(req,res)=>{
    const blog=new Blog({
        title:req.body.title,
        description:req.body.description,
        bloglink:req.body.bloglink,
        url:req.body.url
    });

    try{
        const saveBlog=await blog.save();
        res.status(200).send("Blog Saved !")
    }
    catch(err){
        res.status(400).send(err);
    }

})

//Fetch Blog
router.get('/blog',async(req,res)=>{
    const allBlogs=await Blog.find();
    if(allBlogs.length==0) return res.send("No Blog to Display")
    res.send(allBlogs);
})


module.exports=router;