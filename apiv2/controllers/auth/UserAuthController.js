const db = require('../../dbconnection');
const bcrypt = require('bcrypt');
const decrypt = require('./PwdDecryptController');

module.exports = {
  async authenticate(req,res){
  	const email = req.body.email;
  	const pwdIn = req.body.pwd;
  	// console.log(email)
    const query = "SELECT pwd FROM usuarios WHERE email=?";
    db.query(query,[email], (err, rows, fields)=>{
      if(err){
        console.log(err);
        res.end()
      }
      if(rows.length === 0){
      	console.log('Email no válido')
      	res.end()
      }else{

      const realPwd = rows[0].pwd;
      console.log(pwdIn);
      console.log(realPwd);

      const isReal = decrypt(pwdIn, realPwd);
      isReal.then((res)=>{
      	console.log(res);
      })
      return res.end();
      
  }
    })
  },

}