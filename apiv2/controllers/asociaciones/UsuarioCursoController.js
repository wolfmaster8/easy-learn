const db = require('../../dbconnection');

module.exports = {
  async index(req,res){
    const query = "SELECT * FROM cursos_inscritos_assoc";
    db.query(query, (err, rows, fields)=>{
      if(err){
        console.log(err);
        res.end();
      }
      return res.json(rows);
    })
  },
  async verPorUsarioCurso(req,res){
    const user = req.params.user;
    const curso = req.params.curso;
    const query = "SELECT * FROM cursos_inscritos_assoc WHERE id_usuario=? AND id_curso=?";
    db.query(query,[user, curso], (err, rows)=>{
      if(err){
        console.log(err);
        res.end();
      }
      return res.json(rows);
    })
  },
  async verPorCurso(req,res){
    const curso = req.params.curso;
    const query = "SELECT * FROM cursos_inscritos_assoc WHERE id_curso=?";
    db.query(query,[curso], (err, rows)=>{
      if(err){
        console.log(err);
        res.end();
      }
      return res.json(rows);
    })
  },
  async verPorUsuario(req,res){
    const user = req.params.user;
    const query = "SELECT * FROM cursos_inscritos_assoc WHERE id_usuario=?";
    db.query(query,[user], (err, rows)=>{
      if(err){
        console.log(err);
        res.end();
      }
      return res.json(rows);
    })
  },
  async create(req, res){
    const data = req.body;
    const query = "INSERT INTO cursos_inscritos_assoc SET ?";
    db.query(query, [data], (err, rows, fields)=>{
      if(err){
        console.log('Error Salvando');
        res.end();
      }
    return res.send(rows)
    })
  },
  async update(req, res){
    const id = req.params.asoc;
    const dataUpdate = req.body;
    const query = "UPDATE cursos_inscritos_assoc SET ? WHERE id=?";
    db.query(query,[dataUpdate, id], (err, rows, fields)=>{
      if(err){
        res.send(err)
      }
      return res.send(rows);
    })
  },
  async delete(req, res){
    const usuario = req.params.user;
    const curso = req.params.curso;
    const query = "DELETE FROM cursos_inscritos_assoc WHERE id_usuario=? AND id_curso=?"
    db.query(query, [usuario, curso], (err, rows)=>{
      return res.send(rows);
    })
  }
};