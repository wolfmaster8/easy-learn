const db = require('../../dbconnection');

module.exports = {
  async index(req,res){
    const query = "SELECT * FROM actividad";
    db.query(query, (err, rows, fields)=>{
      if(err){
        console.log(err);
        res.end()
      }
      return res.json(rows);
    })
  },
  async show(req, res){
    const id = req.params.act;
    const query = "SELECT * FROM actividad WHERE id_actividad=?";
    db.query(query, [id], (err, rows, fields)=>{
      return res.json(rows);
    })
  },
  async create(req, res){
    const data = req.body;
    const query = "INSERT INTO actividad SET ?";
    db.query(query, [data], (err, rows, fields)=>{
      if(err){
        console.log('Error Salvando')
      }
    return res.send(rows)
    })
  },
  async update(req, res){
    const id = req.params.act;
    const dataUpdate = req.body;
    const query = "UPDATE actividad SET ? WHERE id_actividad=?";
    db.query(query,[dataUpdate, id], (err, rows, fields)=>{
      if(err){
        res.send(err)
      }
      return res.send(rows);
    })
  },
  async delete(req, res){
    const id = req.params.act;
    const query = "DELETE FROM actividad WHERE id_actividad=?"
    db.query(query, [id], (err, rows)=>{
      return res.send(rows);
    })
  }
};