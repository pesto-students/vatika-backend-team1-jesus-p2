const router=require('express').Router();
const Product=require('../model/Product')

//Add Product
router.post('/product',async(req,res)=>{
    const productExists = await Product.findOne({ name: req.body.name });
    if (productExists) return res.status(400).send("Product Already Exists");
  
    const product=new Product({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description    ,
        rating:req.body.rating,
        category:req.body.category,
        discount:req.body.discount,
        maintain:req.body.maintain,
        sunlight:req.body.sunlight,
        water:req.body.water,
        image:req.body.image
    });
    try {
        const saveProduct = await product.save();
        res.send(`${product.name} Inserted Successfully in DB `);
      } catch (err) {
        res.status(400).send(err);
      }
})

// router
// controller fxn (in class)
// service in class
// db access layer in class


//Fetch Product
router.get('/product',async(req,res)=>{
  const allProducts=await Product.find();
  if(allProducts.length==0) return res.send("No Product to Display")
  res.send(allProducts);
})

//Fetch Product by Plant Name 
router.get('/product/:name',async(req,res)=>{
  const allProducts=await Product.find({name:req.params.name});
  if(allProducts.length==0) return res.send("No Products to Display")
  res.send(allProducts);
})

//Fetch Product by Category (interior, garden,office)
router.get('/product/:category',async(req,res)=>{
  const allProducts=await Product.find({category:req.params.category});
  if(allProducts.length==0) return res.send("No Products to Display")
  res.send(allProducts);
})


module.exports=router;