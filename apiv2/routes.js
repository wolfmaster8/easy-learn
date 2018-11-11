const express = require('express');
const router = express.Router();

const UsuariosController = require('./controllers/usuarios/UsuariosController');
router.get('/usuarios', UsuariosController.index);
router.get('/usuario/:user', UsuariosController.show);
router.post('/usuario/', UsuariosController.create);
router.post('/usuario/:user/update', UsuariosController.update);
router.delete('/usuario/:user', UsuariosController.delete);

const CursosController = require('./controllers/cursos/CursosController');
router.get('/cursos', CursosController.index);
router.get('/curso/:id', CursosController.show);
router.post('/curso/', CursosController.create);
router.post('/curso/:id/update', CursosController.update);
router.delete('/curso/:id', CursosController.delete);

const ActividadController = require('./controllers/cursos/ActividadController');
router.get('/curso/:curso/actividades/', ActividadController.index);
router.get('/curso/:curso/actividad/:act', ActividadController.show);
router.post('/curso/:curso/actividad/', ActividadController.create);
router.post('/curso/:curso/actividad/:act/update', ActividadController.update);
router.delete('/curso/:curso/actividad/:act', ActividadController.delete);

/* ACTIVIDAD -> ESTUDIANTE */
const ActividadEstudiante = require('./controllers/usuarios/ActividadEstudianteController');
router.get('/nota/usuario/:user/actividad/', ActividadEstudiante.verNotasTodas);
router.get('/nota/usuario/:user/actividad/:id', ActividadEstudiante.verNota);
router.post('/nota/usuario/:user/actividad/:act', ActividadEstudiante.asignarNota);
router.post('/nota/usuario/:user/actividad/:id/update', ActividadEstudiante.editarNota);

/* USUARIOS -> SUBACTIVIDAD*/
const SubactividadController = require('./controllers/cursos/SubactividadController');
router.get('/curso/:curso/actividad/:act/subactividades/', SubactividadController.index);
router.get('/curso/:curso/actividad/:act/sub/:subact', SubactividadController.show);
router.post('/curso/:curso/actividad/:act/sub/', SubactividadController.create);
router.post('/curso/:curso/actividad/:act/sub/:subact/update', SubactividadController.update);
router.delete('/curso/:curso/actividad/:act:/sub/:subact', SubactividadController.delete);
/* SUBACTIVIDAD -> ACTIVIDAD */
const SubactividadEstudiantesController = require('./controllers/usuarios/SubactividadEstudiantesController');
router.get('/nota/usuario/:user/actividad/:act/subactividades/', SubactividadEstudiantesController.verNotasTodas);
router.get('/nota/usuario/:user/actividad/:act/sub/:id', SubactividadEstudiantesController.verNota);
router.post('/nota/usuario/:user/actividad/:act/sub/', SubactividadEstudiantesController.asignarNota);
router.post('/nota/usuario/:user/actividad/:act/sub/:id/update', SubactividadEstudiantesController.editarNota);

/* MENSAJES */
const Mensajes = require('./controllers/usuarios/MensajesController');
router.get('/mensajes/enviados/:remi', Mensajes.enviados);
router.get('/mensajes/recibidos/:dest/:remi', Mensajes.recibidos);
router.get('/mensajes/:id', Mensajes.ver);
router.post('/mensajes/enviar/', Mensajes.enviar);
router.delete('/mensajes/eliminar/:id', Mensajes.delete);



/* ASOCIACIONES*/
/* USUARIO -> CURSO */
const UsuarioCurso = require('./controllers/asociaciones/UsuarioCurso');
router.get('/usuario/:user/cursos/', UsuarioCurso.index);
router.post('/usuario/:user/curso/', UsuarioCurso.create);
router.post('/usuario/:user/curso/:asoc/update', UsuarioCurso.update);
router.delete('/usuario/:user/curso/:asoc', UsuarioCurso.delete);
/* CURSO -> USUARIO */
router.get('/curso/:curso/usuarios/', UsuarioCurso.index);



router
  .route('/')
  .get((err, res)=>{
    res
      .status(200)
      .send('OK');
  });

module.exports = router;