import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Generar el token de autenticación
export const generateToken = (data) => {
  return jwt.sign(data, 'secretoken', { expiresIn: '1h' });
};

// Configurar el servicio de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'germantardiop@gmail.com',
    pass: '@t4rd10p3r3z@@6'
  }
});

// Enviar correo electrónico de confirmación
export const sendConfirmationEmail = (user) => {
  const token = generateToken({ email: user.email, action: 'confirm' });
  const mailOptions = {
    from: 'germantardiop@gmail.com',
    to: user.email,
    subject: 'Confirme su dirección de correo electrónico',
    text: `Haga clic en el siguiente enlace para confirmar su dirección de correo electrónico: http://example.com/confirm?token=${token}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Correo electrónico de confirmación enviado: ${info.response}`);
    }
  });
};

// Enviar correo electrónico de cambio de contraseña
export const sendPasswordResetEmail = (user) => {
  const token = generateToken({ email: user.email, action: 'reset' });
  const mailOptions = {
    from: 'example@gmail.com',
    to: user.email,
    subject: 'Restablecer contraseña',
    text: `Haga clic en el siguiente enlace para restablecer su contraseña: http://example.com/reset?token=${token}`
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Correo electrónico de cambio de contraseña enviado: ${info.response}`);
    }
  });
};

// Verificar token de autenticación
export const verifyToken = (token, action) => {
  try {
    const decoded = jwt.verify(token, 'secret');
    if (decoded.action !== action) {
      throw new Error(`Token no válido para ${action}`);
    }
    return decoded.email;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
