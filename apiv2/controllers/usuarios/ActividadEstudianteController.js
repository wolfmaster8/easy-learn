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
      const act = req.params.act;
      const usuario = req.params.user;
    const query = "SELECT * FROM actividad_estudiante WHERE id_actividad=? AND id_usuario=?";
    db.query(query, [act, usuario], (err, rows)=>{
      return res.json(rows);
    })
  },
  async asignarNuevaNota(req, res){
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
    const id_actividad = req.body.id_actividad;
    const id_usuario = req.body.id_usuario;
    const puntos = req.body.puntos;
    const dataUpdate = req.body;
    const query = "UPDATE actividad_estudiante SET ? WHERE id_act_est=?";
    db.query(query,[dataUpdate, id], (err, rows)=>{
      if(err){
        res.send(err)
      }
      return res.send(rows);
    })
  },
    async delete(req, res){
        const id = req.params.id;
        const query = "DELETE FROM actividad_estudiante WHERE id_act_est=?"
        db.query(query, [id], (err, rows)=>{
            return res.send(rows);
        })
    }
};