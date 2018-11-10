const mysql = require('mysql');


const conn = mysql.createConnection({
  host: 'easylearn.cfvh1qszjgl1.us-east-2.rds.amazonaws.com',
  user: 'easylearnwolf8',
  password: 'qFqp7wAAkB02',
  port: 3306,
  database: 'easylearn'
});

conn.connect(function(e){
  if(e){
    console.log(e);
  }else{
    console.log('Connected')
  }
});

module.exports = conn;