const db = require('../../dbconnection');

module.exports = {
  async index(req,res){
    const act = req.params.act;
    const query = "SELECT * FROM subactividad WHERE id_actividad=?";
    db.query(query,[act], (err, rows)=>{
      if(err){
        console.log(err);
        res.end();
      }
      return res.json(rows);
    })
  },
  async show(req, res){
    const id = req.params.subact;
    const query = "SELECT * FROM subactividad WHERE id_subactividad=?";
    db.query(query, [id], (err, rows)=>{
      return res.json(rows);
    })
  },
  async create(req, res){
    const data = req.body;
    const query = "INSERT INTO subactividad SET ?";
    db.query(query, [data], (err, rows)=>{
      if(err){
        console.log('Error Salvando'+err);
        res.end();
      }
      return res.send(rows)
    })
  },
  async update(req, res){
    const id = req.params.subact;
    const dataUpdate = req.body;
    const query = "UPDATE subactividad SET ? WHERE id_subactividad=?";
    db.query(query,[dataUpdate, id], (err, rows)=>{
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