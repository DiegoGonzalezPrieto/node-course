const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const User = require('./models/user');

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express(); 

app.set('view engine', 'ejs'); 
app.set('views', 'views');



app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname, 'public'))); 

app.use((req, res, next) =>{ // middleware used to acess User data
  User.findById('635674bcd960935d10c6dc86')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err =>  {
      console.error(err);
      next();
    }); 
})

app.use('/admin', adminRoutes); 
app.use(shopRoutes); 
app.use(errorController.get404)

// TODO : configure dotenv
mongoose.connect('')
  .then(result => {
    User.findOne()
      .then(user =>{
        if (!user) {
          const user = new User({
            name: 'Diego',
            email: 'test@test.com',
            cart: {items: []}
          });
          user.save(); 
        }
      })
    app.listen(3000)
  })
  .catch(err => console.log(err));



