const router = require("express").Router();
const SuperCoin=require('../model/SuperCoin');

router.get('/supercoin',async (req,res)=>{

    const coin=await SuperCoin.find({email:req.query.email});
    res.send(coin);
});

router.post('/supercoin',async(req,res)=>{
    const coin=new SuperCoin({
        email:req.body.email,
        supercoin:req.body.supercoin,
    });
    try{
        const savedCoin=await coin.save();
        res.send(savedCoin);
    }catch(err){
        res.status(400).send(err);
    }
});


module.exports=router;