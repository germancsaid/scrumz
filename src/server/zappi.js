import express from 'express';
import path from 'path';

import flash from 'express-flash';
import session from 'express-session';
import methodOverride from 'method-override';
import passport from 'passport';

// initializations
// Crea la aplicación de Express
const app = express();
require('./passport-auth');

// settings
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.set('views', path.join(__dirname, '..', 'public'));
  app.set('view engine', 'ejs');

// middlewares
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())

  // Configura la sesión de Express
  const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'secretito',
    resave: false,
    saveUninitialized: false
  });

  app.use(sessionMiddleware);
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))

// routes
app.get('/', checkAuthenticated, (req, res) => {
  const isAuthenticated = !!req.user;
  if (isAuthenticated) {
    res.locals.userData = { 
      _id: req.user._id, 
      Email: req.user.Email,
      PlayerName: req.user.PlayerName,
      TeamName: req.user.TeamName,
    };
    res.render('index.ejs', { _id: req.user._id, Email: req.user.Email, PlayerName: req.user.PlayerName, TeamName: req.user.TeamName });
    console.log(`New login OK, session is ${req.session.id} ${req.user._id}`);
  } else {
    console.log("unknown user");
  }
})


app.get('/register', checkNotAuthenticated, (req, res) => {
  //cambiaremos aregisster.eks cuando esten habilitados los teams
  res.render('login.ejs')
})

app.post('/register', checkNotAuthenticated, passport.authenticate('local-signup', {
  successRedirect: '/login',
  failureRedirect: '/register',
  failureFlash: true
})); 


app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))


app.delete('/logout', function(req, res, next) {
  req.logOut(function(err) {
    if (err) { return next(err); }
    res.redirect('/login')
  })
})


// Autenticates validation
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

export { sessionMiddleware };
export default app;