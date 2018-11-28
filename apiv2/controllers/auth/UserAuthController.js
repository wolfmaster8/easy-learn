const db = require('../../dbconnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async authenticate(req, res) {
    const email = req.body.email;
    const pwdIn = req.body.pwd;
    // console.log(email)
    const query = "SELECT id_usuario, pwd FROM usuarios WHERE email=?";
    db.query(query, [email], (err, rows) => {
      if (err) {
        console.log(err);
        res.end()
      }
      if (rows.length === 0) {
        // console.log('Email no válido');
        res.status(500).send('Email no válido');
      } else {
        const userID = rows[0].id_usuario;
        const realPwd = rows[0].pwd;
        // console.log(pwdIn);
        // console.log(realPwd);
        const decrypt= bcrypt.compare(pwdIn, realPwd, function (err, state) {
          console.log('STARTING DECRYPT');
          if (err) {
            console.log('Error intentando desencriptar la contraseña');
            res.end();
          } else {
            // console.log(state);
            if(state){
              // SENHA VÁLIDA
              req.session.userId = userID;
              const token = jwt.sign({userID}, process.env.SUPERCONSTELLATION, {expiresIn: 3600});
              return res.status(200).send({auth: true, token: token});
            }else{
              // NÃO VALIDA
              return res.status(401).send('Login inválido');
            }
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