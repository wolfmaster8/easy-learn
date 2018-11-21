// API para EasyLearn
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const jwt    = require('jsonwebtoken');
const routes = require('./routes.js');
const db = require('./dbconnection');
const cors = require('cors');
require('dotenv').config();
// MIDDLEWARES
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