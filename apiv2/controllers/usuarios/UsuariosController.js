const db = require('../../dbconnection');
const bcrypt = require('bcrypt');

module.exports = {
  async index(req,res){
    const query = "SELECT * FROM usuarios";
    db.query(query, (err, rows, fields)=>{
      if(err){
        console.log(err);
        res.end();
      }
      return res.json(rows);
    })
  },
  async show(req, res){
    const id = req.params.user;
    const query = "SELECT * FROM usuarios WHERE id_usuario=?";
    db.query(query, [id], (err, rows, fields)=>{
      return res.json(rows);
    })
  },
  async showPorRol(req, res){
    const rol = req.params.rol;
    const query = "SELECT * FROM usuarios WHERE rol=?";
    db.query(query, [rol], (err, rows)=>{
      return res.json(rows);
    })
  },
  async create(req, res){
    const data = req.body;
    const pwdIn = req.body.pwd;
    const saltRounds = 10;
    bcrypt.hash(pwdIn, saltRounds, function(err, hash){
      if(err){
        console.log('Error');
        res.end();
      }else{
        req.body.pwd= hash;
        // console.log(req.body.pwd);
        // console.log(data);
        const query = "INSERT INTO usuarios SET ?";
        db.query(query, [data], (err, rows) => {
          if (err) {
            console.log('Error Salvando');
            res.end();
          }
          return res.send(rows)
        })
      }
    });

  },
  async update(req, res){
    const id = req.params.user;
    const dataUpdate = req.body;
    const query = "UPDATE usuarios SET ? WHERE id_usuario=?";
    db.query(query,[dataUpdate, id], (err, rows, fields)=>{
      if(err){
        res.send(err)
      }
      return res.send(rows);
    })
  },
  async delete(req, res){
    const id = req.params.user;
    const query = "DELETE FROM usuarios WHERE id_usuario=?"
    db.query(query, [id], (err, rows)=>{
      return res.send(rows);
    })
  }
};