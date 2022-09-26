const router=require('express').Router();
const Product=require('../model/Product')

//Add Product
router.post('/product',async(req,res)=>{
    const productExists = await Product.findOne({ pname: req.body.pname });
    if (productExists) return res.status(400).send("Product Already Exists");
  
    const product=new Product({
        pname:req.body.pname,
        price:req.body.price,
        description:req.body.description    ,
        rating:req.body.rating,
        category:req.body.category,
        discount:req.body.discount,
        maintain:req.body.maintain,
        sunlight:req.body.sunlight,
        water:req.body.water,
        url:req.body.url
    });
    try {
        const saveProduct = await product.save();
        res.send(`${product.pname} Inserted Successfully in DB `);
      } catch (err) {
        res.status(400).send(err);
      }
})

//Fetch Product
router.get('/product',async(req,res)=>{
  const allProducts=await Product.find();
  if(allProducts.length==0) return res.send("No Blog to Display")
  res.send(allProducts);
})

//Fetch Product by Category (interior, garden,office)
router.get('/product/:category',async(req,res)=>{
  const allProducts=await Product.find({category:req.params.category});
  if(allProducts.length==0) return res.send("No Products to Display")
  res.send(allProducts);
})


module.exports=router;