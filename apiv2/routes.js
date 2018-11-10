const express = require('express');
const router = express.Router();

const UsuariosController = require

router
  .route('/')
  .get((err, res)=>{
    res
      .status(200)
      .send('Welcome');
  })

module.exports = router;