const express = require('express');
const mysql = require('mysql');

const app = express();

const conn = mysql.createPool({
  connectionLimit: 50,
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 8889,
  database: 'easylearn'
});

conn.connect(function(e){
  if(e){
    console.log('Error Connecting');
  }else{
    console.log('Connected')
  }
});

app.get('/usuarios', function(req, res){
  conn.query("SELECT * FROM usuarios", function(error, rows, fields){
    if(!!error) {
      console.log('Error');
    }else{
      console.log('Success\n');
      console.log(rows);
      res.send('Hola '+rows[1].name)
    }

  });
});

app.listen(3280);