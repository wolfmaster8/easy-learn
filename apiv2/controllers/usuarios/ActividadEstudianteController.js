const db = require('../../dbconnection');

module.exports = {
  async verNotasTodas(req,res){
    const usuario = req.params.user;
    const query = "SELECT * FROM actividad_estudiante WHERE id_usuario=?";
    db.query(query,[usuario], (err, rows)=>{
      if(err){
        console.log(err);
        res.end();
      }
      return res.json(rows);
    })
  },
  async verNota(req, res){
    const usuario = req.params.user;
    const id = req.params.id;
    const query = "SELECT * FROM actividad_estudiante WHERE id_act_est=? AND id_usuario=?";
    db.query(query, [id, usuario], (err, rows)=>{
      return res.json(rows);
    })
  },
  async asignarNota(req, res){
    const data = req.body;
    const query = "INSERT INTO actividad_estudiante SET ?";
    db.query(query, [data], (err, rows)=>{
      if(err){
        console.log('Error Salvando '+err);
        res.end();
      }
    return res.send(rows)
    })
  },
  async editarNota(req, res){
    const id = req.params.id;
    const dataUpdate = req.body;
    const query = "UPDATE actividad_estudiante SET ? WHERE id_act_est=?";
    db.query(query,[dataUpdate, id], (err, rows)=>{
      if(err){
        res.send(err)
      }
      return res.send(rows);
    })
  },
};