const express = require('express');
const mysql = require('mysql');

const app = express();

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 8889,
  database: 'easylearn'
});

conn.connect(function(e){
  if(e){
    console.log('Error Connecting');
  }else{
    console.log('Connected')
  }
});

app.get('/create/usuarios', function(req, res){
 const sql = "CREATE TABLE usuarios (id_usuario INT(99) NOT NULL PRIMARY KEY auto_increment, nombre VARCHAR(50), apellido VARCHAR(50), email VARCHAR(50), pwd VARCHAR(255), rol INT(99), fecha_creacion TIMESTAMP, ultima_fecha_sesion DATE)";
 conn.query(sql, (err, result)=>{
   if(err) res.send(err);
   res.send(result)
 })
});

app.get('/create/cursos', function(req, res){
  const sql = "CREATE TABLE cursos (id_curso INT(99) NOT NULL PRIMARY KEY auto_increment, titulo VARCHAR(99), descripcion TEXT, id_profesor INT(99), fecha_creacion TIMESTAMP)";
  conn.query(sql, (err, result)=>{
    if(err) res.send(err);
    res.send(result)
  })
});

app.get('/create/inscritos', function(req, res){
 const sql = "CREATE TABLE cursos_inscritos_assoc (id INT(99) NOT NULL PRIMARY KEY auto_increment, id_usuario INT(99), id_curso INT(99), fecha_creacion TIMESTAMP, FOREIGN KEY(id_curso) REFERENCES cursos(id_curso) ON DELETE CASCADE ON UPDATE NO ACTION, FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE NO ACTION )";
 conn.query(sql, (err, result)=>{
   if(err) res.send(err);
   res.send(result)
 })
});

// CREA DATOS DE EJEMPLO
app.get('/create/felipe', function(req, res){
  const sql = "INSERT INTO usuarios (nombre, apellido, email, pwd, rol) VALUES ('Felipe', 'Lobo', 'jflobom@gmail.com', '123456', 9)";
  conn.query(sql, (err, result)=>{
    if(err) res.send(err);
    res.send(result)
  })
});

app.get('/create/avi', function(req, res){
  const sql = "INSERT INTO cursos (titulo, descripcion, id_profesor) VALUES ('Aviación', 'Lorem ipsm', 1)";
  conn.query(sql, (err, result)=>{
    if(err) res.send(err);
    res.send(result)
  })
});

app.get('/create/avi_ins', function(req, res){
  const sql = "INSERT INTO cursos_inscritos_assoc (id_usuario, id_curso) VALUES (2, 1)";
  conn.query(sql, (err, result)=>{
    if(err) res.send(err);
    res.send(result)
  })
});

app.listen(3280);