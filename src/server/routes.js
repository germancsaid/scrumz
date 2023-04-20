// Importamos las librerías y módulos necesarios
import express from 'express';
import passport from 'passport';
import { checkAuthenticated, checkNotAuthenticated } from './utils/middlewares';
import { sendConfirmationEmail, sendPasswordResetEmail } from './services/mail-auth.js';
const graph = require('./utils/graph.js');


// Creamos el router de Express
const router = express.Router();

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

// Definimos la ruta para la página de backlog
router.get('/perfil', checkAuthenticated, (req, res) => {
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

    res.render('perfil.ejs', { _id: req.user._id, Email: req.user.Email, PlayerName: req.user.PlayerName, TeamName: req.user.TeamName });
  } else {
    // Si no está autenticado, simplemente mostramos un mensaje en la consola
    console.log("unknown user");
  }
});

router.get('/auth/signin',
  async function (req, res) {
    const scopes = process.env.OAUTH_SCOPES || 'https://graph.microsoft.com/.default';
    const urlParameters = {
      scopes: scopes.split(','),
      redirectUri: process.env.OAUTH_REDIRECT_URI || 'http://localhost:8081/auth/callback'
    };
    console.log(1)

    try {
      const authUrl = await req.app.locals
        .msalClient.getAuthCodeUrl(urlParameters);
      res.redirect(authUrl);
    console.log(2)

    }
    catch (error) {
      console.log(`Error: ${error}`);
    console.log(3)

      req.flash('error_msg', {
        message: 'Error getting auth URL',
        debug: JSON.stringify(error, Object.getOwnPropertyNames(error))
      });
    console.log(4)

      res.redirect('/perfil');
      
    }
  }
);

router.get('/auth/callback',
  async function(req, res) {
    const scopes = process.env.OAUTH_SCOPES || 'https://graph.microsoft.com/.default';
    console.log('5')
    const tokenRequest = {
      code: req.query.code,
      scopes: scopes.split(','),
      redirectUri: process.env.OAUTH_REDIRECT_URI
    };
    console.log('6')

    try {
      const response = await req.app.locals.msalClient.acquireTokenByCode(tokenRequest);
      console.log('7')

      // Save the user's homeAccountId in their session
      req.session.userId = response.account.homeAccountId;
      console.log('8')

      const user = await graph.getUserDetails(
        req.app.locals.msalClient,
        req.session.userId
      );
      console.log('9')
      // Add the user to user storage
      if (!req.app.locals.users) {
        req.app.locals.users = {};
      }
      req.app.locals.users[req.session.userId] = {
        displayName: user.displayName,
        email: user.mail || user.userPrincipalName,
        timeZone: user.mailboxSettings.timeZone
      };
      console.log('10')
      console.log(req.app.locals.users[req.session.userId])


    } catch(error) {
      console.log(11)
      req.flash('error_msg', {
        message: 'Error completing authentication',
        debug: JSON.stringify(error, Object.getOwnPropertyNames(error))
      });
      console.log(error)
    }
    console.log(12)
    res.redirect('/perfil')
    console.log(13)
  }
);



// Definimos la ruta para cerrar sesión
router.delete('/logout', function(req, res, next) {
  req.logOut(function(err) {
    if (err) { return next(err); }
    res.redirect('/login')
  })
});

// Exportamos el router de Express
export default router;
