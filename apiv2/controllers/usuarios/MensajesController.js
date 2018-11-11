const db = require('../../dbconnection');

module.exports = {
  async enviados(req,res){
    const remitente = req.params.remi;
    const query = "SELECT * FROM mensajes WHERE id_remitente=?";
    db.query(query,[remitente], (err, rows)=>{
      if(err){
        console.log(err);
        res.end();
      }
      return res.json(rows);
    })
  },
  async recibidos(req, res){
    const destinatario = req.params.dest;
    const remitente = req.params.remi;
    const query = "SELECT * FROM mensajes WHERE id_destinatario=?  AND id_remitente=?";
    db.query(query, [destinatario, remitente], (err, rows)=>{
      return res.json(rows);
    })
  },
  async ver(req, res){
    const id = req.params.id;
    const query = "SELECT * FROM mensajes WHERE id_mensaje=?";
    db.query(query, [id], (err, rows)=>{
      return res.json(rows);
    })
  },
  async enviar(req, res){
    const data = req.body;
    const query = "INSERT INTO mensajes SET ?";
    db.query(query, [data], (err, rows)=>{
      if(err){
        console.log('Error Salvando '+err);
      }
    return res.send(rows)
    })
  },
  async delete(req, res){
    const id = req.params.id;
    const query = "DELETE FROM mensajes WHERE id_mensaje=?";
    db.query(query, [id], (err, rows)=>{
      return res.send(rows);
    })
  }
};