const db = require('../../dbconnection');

module.exports = {
  async index(req,res){
    const query = "SELECT * FROM cursos";
    db.query(query, (err, rows, fields)=>{
      if(err){
        console.log(err);
        res.end();
      }
      return res.json(rows);
    })
  },
  async show(req, res){
    const id = req.params.id;
    const query = "SELECT * FROM cursos WHERE id_curso=?";
    db.query(query, [id], (err, rows, fields)=>{
      return res.json(rows);
    })
  },
  async create(req, res){
    const data = req.body;
    const query = "INSERT INTO cursos SET ?";
    db.query(query, [data], (err, rows, fields)=>{
      if(err){
        console.log('Error Salvando')
      }
    return res.send(rows)
    })
  },
  async update(req, res){
    const id = req.params.curso;
    const dataUpdate = req.body;
    const query = "UPDATE cursos SET ? WHERE id_curso=?";
    db.query(query,[dataUpdate, id], (err, rows, fields)=>{
      if(err){
        res.send(err)
      }
      return res.send(rows);
    })
  },
  async delete(req, res){
    const id = req.params.curso;
    const query = "DELETE FROM cursos WHERE id_curso=?"
    db.query(query, [id], (err, rows)=>{
      return res.send(rows);
    })
  }
};