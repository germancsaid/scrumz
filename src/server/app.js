// Importa los módulos necesarios de Express y otras librerías
import express from 'express';
import path from 'path';
import flash from 'express-flash';
import session from 'express-session';
import methodOverride from 'method-override';
import passport from 'passport';
import * as msal from '@azure/msal-node';

// Importa el archivo que configura la estrategia de autenticación de Passport
require('./services/passport-auth');

// Crea la aplicación de Express
const app = express();

// Configura la carpeta pública y la vista
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.set('view engine', 'ejs');

// Configura los middlewares
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

// Configura las rutas
import router from './routes';
app.use(router);

// MSAL config
const msalConfig = {
  auth: {
    clientId: process.env.OAUTH_CLIENT_ID || '21998281-977c-47df-b764-faea3d29c13f',
    authority: process.env.OAUTH_AUTHORITY || 'https://login.microsoftonline.com/common/',//'https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a',
    clientSecret: process.env.OAUTH_CLIENT_SECRET || 'vw38Q~0t~rLkf3kFgMpBpGqmL5WnXu0SMT_boaId',
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        //if (!containsPii) console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    }
  }
};

// Create msal application object
app.locals.msalClient = new msal.ConfidentialClientApplication(msalConfig);
// Exporta el middleware de sesión y la aplicación de Express
export { sessionMiddleware };
export default app;