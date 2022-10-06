const mongoose=require('mongoose');

const SuperCoinDetails=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    supercoin:{
        type:Number,
        required:true
    }
})

const SuperCoin=mongoose.model('SuperCoin', SuperCoinDetails);
 module.exports=SuperCoin;