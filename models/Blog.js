const mongoose=require('mongoose');

const BlogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    bloglink:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
})

const Blog=mongoose.model('Blog', BlogSchema);
 module.exports=Blog;