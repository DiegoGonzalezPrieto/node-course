const Product = require('../models/product');



exports.getAddProduct = (req, res, next)=>{ 
  res.status(200).render('admin/edit-product', {
    pageTitle: 'New Goddamn Product', 
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next)=>{ 
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description; 
  const product = new Product(
    {
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
      userId: req.user // mongoose picks the id from the object
    }
  );
  product.save()
    .then( result => { 
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};


exports.getEditProduct = (req, res, next)=>{ 
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  } 
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.status(200).render('admin/edit-product', {
        pageTitle: 'Edit the Goddamn Product', 
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      }); 
    })
    .catch(err => console.error(err));
};

exports.postEditProduct = (req, res, next)=>{
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  Product.findById(prodId)
    .then(product => { 
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDescription;
      return product.save() // updates
    })
    .then(result => { 
      res.redirect('/admin/products');
    })
    .catch(err => console.error(err)); 
};

exports.getProducts = (req, res, next)=>{ 
  Product.find()
    //.populate('userId', 'name') // populates doc references with doc data!
    .then(products =>{
      console.log(products)
      res.status(200).render('admin/products', {
        prods: products,
        pageTitle : 'Admin Products', 
        path: '/admin/products'
      }); 
    })
    .catch(err => console.error(err));
};

exports.postDeleteProduct = (req, res, next)=>{
  const prodId = req.body.productId;
  Product.findByIdAndDelete(prodId)
    .then(result => {
      console.log('PRODUCT deleted');
      res.redirect('/admin/products');
    })
    .catch(err => console.error(err));
};
