// API para EasyLearn
const express = require('express');
const app = express();
app.get('/api', (req, res)=> {
  app.res('Welcome');
})

app.listen(3280);