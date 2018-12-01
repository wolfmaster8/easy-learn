const express = require('express');
const router = express.Router();
const verifyJWT = require('./controllers/auth/VerifyJWT');

function requiresLogin(req,res, next){
  if(req.session && req.session.userId){
    console.log('great');
    return next();
  }else{
    return res.status(401).send('Not logged in')
  }
}
/*AUTH*/
const UserAuthController = require('./controllers/auth/UserAuthController');
const UserLogoutController = require('./controllers/auth/UserLogoutController');
router.post('/auth/user', UserAuthController.authenticate);
router.get('/auth/logout', UserLogoutController.logout);

const UsuariosController = require('./controllers/usuarios/UsuariosController');
router.get('/usuarios', requiresLogin, (req,res)=>{
  UsuariosController.index(req, res)
});
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
router.get('/nota/usuario/:user/actividad/:id', ActividadEstudiante.verNota);
router.post('/nota/usuario/:user/actividad/:act', ActividadEstudiante.asignarNota);
router.post('/nota/usuario/:user/actividad/:id/update', ActividadEstudiante.editarNota);

/* SUBACTIVIDAD*/
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

module.exports = router;