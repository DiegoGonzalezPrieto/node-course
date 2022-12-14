const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true 
  },
  cart: {
    items: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product', // reference to product document
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }],

  }
});

// Methods can be added to a mongoose Schema:
userSchema.methods.addToCart = function(product) { // must be funcion()! bc of 'this'
  const cartProductIndex = this.cart.items.findIndex(
    cp => cp.productId.toString() === product._id.toString()
  ); 
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];
  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id, // mongoose converts to ObjectId
      quantity: newQuantity 
    });
  } 
  const updatedCart = {
    items: updatedCartItems 
  };
  this.cart = updatedCart;
  return this.save()
} 

userSchema.methods.removeFromCart = function(prodId) {
  const updatedCartItems = this.cart.items
    .filter(e => e.productId.toString() !== prodId);
  this.cart.items = updatedCartItems;
  return this.save();
}

userSchema.methods.clearCart = function() {
  this.cart = {items: []};
  return this.save();
}

module.exports = mongoose.model('User', userSchema);
