const express = require('express');
const router = express.Router();

/*AUTH*/
const UserAuthController = require('./controllers/auth/UserAuthController');
router.post('/auth/user', UserAuthController.authenticate);


const UsuariosController = require('./controllers/usuarios/UsuariosController');
router.get('/usuarios', UsuariosController.index);
router.get('/usuario/:user', UsuariosController.show);
router.post('/usuario/', UsuariosController.create);
router.post('/usuario/:user/update', UsuariosController.update);
router.delete('/usuario/:user', UsuariosController.delete);
router.get('/usuario/rol/:rol', UsuariosController.showPorRol);

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
router.get('/nota/usuario/:user/actividad/:act', ActividadEstudiante.verNota);
router.post('/nota/usuario/:user/actividad/:act', ActividadEstudiante.asignarNuevaNota);
router.post('/nota/usuario/:user/actividad/:id/update', ActividadEstudiante.editarNota);
router.delete('/nota/actividad/:id/delete', ActividadEstudiante.delete);

/* SUBACTIVIDAD*/
const SubactividadController = require('./controllers/cursos/SubactividadController');
router.get('/curso/:curso/actividad/:act/subactividades/', SubactividadController.index);
router.get('/curso/:curso/actividad/:act/sub/:subact', SubactividadController.show);
router.post('/curso/:curso/actividad/:act/sub/', SubactividadController.create);
router.post('/subactividad/:id/update', SubactividadController.update);
router.delete('/subactividad/:id/delete', SubactividadController.delete);

/* SUBACTIVIDAD -> ACTIVIDAD */
const SubactividadEstudiantesController = require('./controllers/usuarios/SubactividadEstudiantesController');
router.get('/nota/usuario/:user/actividad/:act/subactividades/', SubactividadEstudiantesController.verNotasTodas);
router.get('/ver/nota/usuario/:user/sub/:subact', SubactividadEstudiantesController.verNota);
router.post('/asignar/nota/sub/:subact', SubactividadEstudiantesController.asignarNota);
router.post('/nota/usuario/:user/actividad/:act/sub/:id/update', SubactividadEstudiantesController.editarNota);
router.delete('/nota/subactividad/:id/delete', SubactividadEstudiantesController.delete);


/* MENSAJES */
const Mensajes = require('./controllers/usuarios/MensajesController');
router.get('/mensajes/enviados/:remi', Mensajes.enviados);
router.get('/mensajes/recibidos/:dest/:remi', Mensajes.recibidos);
router.get('/mensajes/:id', Mensajes.ver);
router.post('/mensajes/enviar/', Mensajes.enviar);
router.delete('/mensajes/eliminar/:id', Mensajes.delete);



const UsuarioCurso = require('./controllers/asociaciones/UsuarioCursoController');
/* ASOCIACIONES*/
router.get('/usuario/:user/cursos/:curso', UsuarioCurso.verPorUsarioCurso);
/* USUARIO -> CURSO */
router.get('/usuarios/cursos/', UsuarioCurso.index);
router.get('/usuario/:user/cursos/', UsuarioCurso.verPorUsuario);
router.post('/usuario/:user/curso/', UsuarioCurso.create);
router.post('/usuario/:user/curso/:asoc/update', UsuarioCurso.update);
router.delete('/usuario/:user/curso/:curso', UsuarioCurso.delete);
/* CURSO -> USUARIO */
router.get('/curso/:curso/usuarios/', UsuarioCurso.verPorCurso);



router
  .route('/')
  .get((err, res)=>{
    res
      .status(200)
      .send('OK');
  });

/* Errors */
const Error = require('./controllers/Error');
// 404
router.get('*', Error.notFound);
router.post('*', Error.notFound);
router.delete('*', Error.notFound);

module.exports = router;