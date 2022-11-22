const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({ // object schema 
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true 
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // tell mongoose there is a related document
    required: true
  }

});

module.exports = mongoose.model('Product', productSchema); // name the schema

//const mongodb = require('mongodb');



//class Product {
  //constructor(title, price, imageUrl, description, id, userId) {
    //this.title = title;
    //this.price = price;
    //this.imageUrl = imageUrl;
    //this.description = description;
    //this._id = id ? new mongodb.ObjectId(id) : null;
    //this.userId = userId;
  //}

  //save() {
    //const db = getDb();
    //let dbOperation;
    //if (this._id) {
        //// upateOne takes 2 arguments, filter + update instructions
      //dbOperation = db.collection('products')
        //.updateOne({_id: this._id}, { $set: this});
    //} else {
      //// collection is created if nonexistent 
      //dbOperation = db.collection('products').insertOne(this); 
    //}
      //return dbOperation
        //.then(result => {
          //console.log(result);
        //})
        //.catch(err => console.log(err)); 
  //} 

  //static fetchAll() {
    //const db = getDb();
    //return db.collection('products').find().toArray() // find returns a cursor (yields)
      //.then(products => {
        //console.log(products);
        //return products;
      //})
      //.catch(err => console.log(err));
  //}

  //static findById(id) {
    //const db = getDb();
    //return db.collection('products').find({_id: mongodb.ObjectId(id)}).next()
      //.then(product => {
        //console.log(product);
        //return product;
      //})
      //.catch(err => console.log(err));
  //}

  //static deleteById(id) {
    //const db = getDb();
    //return db.collection('products').
      //deleteOne({_id: new mongodb.ObjectId(id)})
        //.then( result => console.log('Deleted?', result))
        //.catch(err => console.log(err)); 
  //}
//}
