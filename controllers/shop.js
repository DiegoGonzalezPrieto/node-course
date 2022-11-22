const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next)=>{ 
  Product.find() // mongoose gives reslt objects; not a cursor
    .then(products => { 
      console.log(products)
      res.status(200).render('shop/product-list', {
        prods: products,
        pageTitle : 'All Products', 
        path: '/products'
      }); 
    })
    .catch( err => console.error(err) );
};

exports.getProduct= (req, res, next)=>{ 
  const productId = req.params.productId;
  Product.findById(productId) // mongoose auto-converts to ObjectId
    .then(product => {
      res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch(err => console.error(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => { 
      res.status(200).render('shop/index', {
        prods: products,
        pageTitle : 'Shop', 
        path: '/'
      }); 
    })
    .catch( err => console.error(err) );
}


exports.getCart = (req, res, next)=>{ 
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        pageTitle : 'My Cart', 
        path: '/cart',
        products: products,
      }); 
    }) 
    .catch(err => console.error(err));
};

exports.postCart = (req, res, next)=>{ 
  const productId = req.body.productId;
  Product.findById(productId)
    .then(product =>{
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result); 
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};


exports.postCartDeleteItem = (req, res, next)=>{ 
  const productId = req.body.productId;
  req.user
    .removeFromCart(productId)
    .then(result => {
      res.redirect('/cart')
    })
    .catch(err => console.log(err)); 
};

exports.getCheckout = (req, res, next)=>{ 
  res.render('shop/checkout', {
    pageTitle : 'Checkout', 
    path: '/checkout' 
  });
};

exports.postOrder = (req, res, next) =>{
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(i => {
        return {quantity: i.quantity, product: {...i.productId._doc}} // ._doc!
      })
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user // mongoose picks up the _id
        },
        products: products
      });
     return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() =>{ 
      res.redirect('/orders')
    })
    .catch( err => console.log(err))
}

exports.getOrders = (req, res, next)=>{ 
  Order.find({"user.userId" : req.user._id})
    .then(orders => {
      console.log(orders);
      res.render('shop/orders', {
        pageTitle : 'Your Orders', 
        orders: orders,
        path: '/orders' 
      }); 
    })
    .catch(err => console.log(err))
};
