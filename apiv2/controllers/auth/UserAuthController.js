const db = require('../../dbconnection');
const bcrypt = require('bcrypt');
// const decrypt = require('./PwdDecryptController');

module.exports = {
  async authenticate(req, res) {
    const email = req.body.email;
    const pwdIn = req.body.pwd;
    // console.log(email)
    const query = "SELECT pwd FROM usuarios WHERE email=?";
    db.query(query, [email], (err, rows) => {
      if (err) {
        console.log(err);
        res.end()
      }
      if (rows.length === 0) {
        console.log('Email no válido');
        res.end()
      } else {

        const realPwd = rows[0].pwd;
        console.log(pwdIn);
        console.log(realPwd);
        const decrypt= bcrypt.compare(pwdIn, realPwd, function (err, state) {
          console.log('STARTING DECRYPT');
          if (err) {
            console.log('Error intentando desencriptar la contraseña');
            res.end();
          } else {
            console.log(state);
            // res.end();
            return state;
          }
        });
        // const isReal = decrypt(pwdIn, realPwd);
        // isReal.then((res) => {
        //   console.log(isReal);
        // });
        // return res.end();

      }
    })
  },

};