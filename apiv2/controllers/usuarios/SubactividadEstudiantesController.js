const db = require('../../dbconnection');

module.exports = {
  async verNotasTodas(req,res){
    const usuario = req.params.user;
    const actividad = req.params.act;
    const query = "SELECT * FROM subactividad_estudiante WHERE id_usuario=? AND id_actividad=?";
    db.query(query,[usuario, actividad], (err, rows)=>{
      if(err){
        console.log(err);
        res.end();
      }
      return res.json(rows);
    })
  },
  async verNota(req, res){
    const usuario = req.params.user;
    const actividad = req.params.act;
    const id = req.params.id;
    const query = "SELECT * FROM subactividad_estudiante WHERE id_sub_est=? AND id_actividad=? AND id_usuario=?";
    db.query(query, [id, actividad, usuario], (err, rows)=>{
      return res.json(rows);
    })
  },
  async asignarNota(req, res){
    const data = req.body;
    const query = "INSERT INTO subactividad_estudiante SET ?";
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
    const query = "UPDATE subactividad_estudiante SET ? WHERE id_sub_est=?";
    db.query(query,[dataUpdate, id], (err, rows)=>{
      if(err){
        res.send(err)
      }
      return res.send(rows);
    })
  },
};