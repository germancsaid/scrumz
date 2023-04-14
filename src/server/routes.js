// Importamos las librerías y módulos necesarios
import express from 'express';
import passport from 'passport';
import { checkAuthenticated, checkNotAuthenticated } from './utils/middlewares';
import { sendConfirmationEmail, sendPasswordResetEmail } from './services/mail-auth.js';

// Creamos el router de Express
const router = express.Router();

// Definimos la ruta para la página de inicio
router.get('/', checkAuthenticated, (req, res) => {
  // Comprobamos si el usuario está autenticado
  const isAuthenticated = !!req.user;
  if (isAuthenticated) {
    // Si está autenticado, establecemos los datos del usuario en la respuesta y renderizamos la vista correspondiente
    res.locals.userData = { 
      _id: req.user._id, 
      Email: req.user.Email,
      PlayerName: req.user.PlayerName,
      TeamName: req.user.TeamName,
    };
    res.render('index.ejs', { _id: req.user._id, Email: req.user.Email, PlayerName: req.user.PlayerName, TeamName: req.user.TeamName });
    /*
    console.log(`Session ${req.session.id}`);
    console.log(`User ID ${req.user._id}`);
    */
  } else {
    // Si no está autenticado, simplemente mostramos un mensaje en la consola
    console.log("unknown user");
  }
});

// Definimos la ruta para la página de stream
router.get('/stream', checkAuthenticated, (req, res) => {
  // Comprobamos si el usuario está autenticado
  const isAuthenticated = !!req.user;
  if (isAuthenticated) {
    // Si está autenticado, establecemos los datos del usuario en la respuesta y renderizamos la vista correspondiente
    res.locals.userData = { 
      _id: req.user._id, 
      Email: req.user.Email,
      PlayerName: req.user.PlayerName,
      TeamName: req.user.TeamName,
    };
    res.render('stream.ejs', { _id: req.user._id, Email: req.user.Email, PlayerName: req.user.PlayerName, TeamName: req.user.TeamName });
  } else {
    // Si no está autenticado, simplemente mostramos un mensaje en la consola
    console.log("unknown user");
  }
});


// Definimos la ruta para la página de registro
router.get('/register', checkNotAuthenticated, (req, res) => {
  // Renderizamos la vista correspondiente
  res.render('register.ejs')
});

// Definimos la ruta para procesar el formulario de registro
router.post('/register', checkNotAuthenticated, passport.authenticate('local-signup', {
  successRedirect: '/login',
  failureRedirect: '/register',
  failureFlash: true 
}), (req, res) => {
  // Si el registro ha sido exitoso, enviamos un correo electrónico de confirmación al usuario
  sendConfirmationEmail(req.user);
});

router.get('/confirm', (req, res) => {
  const token = req.query.token;
  const email = verifyToken(token, 'confirm');
  if (email) {
    // Actualizar el estado de confirmación de correo electrónico del usuario en tu base de datos
    // Redirigir al usuario a la página de inicio de sesión
    res.redirect('/login');
  } else {
    // Si el token no es válido, mostrar un mensaje de error al usuario
    res.send('Token no válido');
  }
});

// Definimos la ruta para la página de inicio de sesión
router.get('/login', checkNotAuthenticated, (req, res) => {
  // Renderizamos la vista correspondiente
  res.render('login.ejs')
});

// Definimos la ruta para procesar el formulario de inicio de sesión
router.post('/login', checkNotAuthenticated, passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

// Definimos la ruta para cerrar sesión
router.delete('/logout', function(req, res, next) {
  req.logOut(function(err) {
    if (err) { return next(err); }
    res.redirect('/login')
  })
});

// Exportamos el router de Express
export default router;
