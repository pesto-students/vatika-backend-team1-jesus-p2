const router=require('express').Router();
const verify=require('../middleware/auth')
const {userOrderHistory}=require('../controllers/orderhistory')


router.get('/orderhistory',verify,userOrderHistory)


module.exports=router;