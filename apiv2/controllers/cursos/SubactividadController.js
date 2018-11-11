const db = require('../../dbconnection');

module.exports = {
  async index(req,res){
    const query = "SELECT * FROM subactividad";
    db.query(query, (err, rows, fields)=>{
      if(err){
        console.log(err);
        res.end();
      }
      return res.json(rows);
    })
  },
  async show(req, res){
    const curso = req.params.id;
    const id = req.params.subact;
    const query = "SELECT * FROM subactividad WHERE id_subactividad=?";
    db.query(query, [id], (err, rows, fields)=>{
      return res.json(rows);
    })
  },
  async create(req, res){
    const data = req.body;
    const query = "INSERT INTO subactividad SET ?";
    db.query(query, [data], (err, rows, fields)=>{
      if(err){
        console.log('Error Salvando');
        res.end();
      }
      return res.send(rows)
    })
  },
  async update(req, res){
    const id = req.params.subact;
    const dataUpdate = req.body;
    const query = "UPDATE subactividad SET ? WHERE id_subactividad=?";
    db.query(query,[dataUpdate, id], (err, rows, fields)=>{
      if(err){
        res.send(err)
      }
      return res.send(rows);
    })
  },
  async delete(req, res){
    const id = req.params.subact;
    const query = "DELETE FROM subactividad WHERE id_subactividad=?"
    db.query(query, [id], (err, rows)=>{
      return res.send(rows);
    })
  }
};