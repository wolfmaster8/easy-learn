// API para EasyLearn
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes.js');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');

// MIDDLEWARES
app.use(session({
  secret: process.env.L188,
  resave: true,
  saveUninitialized: false
}));

app.use(helmet());
app.use(cors());
app.use(morgan('short'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//

//CONFIG
const port = process.env.PORT || 3000;

app.use('/api', routes);

app.listen(port, (req,res)=>{
  console.log('Started on PORT '+port)
});