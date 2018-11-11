// API para EasyLearn
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes.js');
const db = require('./dbconnection');
const cors = require('cors');
// MIDDLEWARES
app.use(helmet());
app.use(cors());
app.use(morgan('short'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//

app.use('/api', routes);

app.listen(3280, (req,res)=>{
  console.log('Started on PORT 3280')
});