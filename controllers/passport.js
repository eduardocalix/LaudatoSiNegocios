const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'nombreUsuario',
  passwordField: 'contrasena',
  passReqToCallback: true
}, async (req, nombreUsuario, contrasena, done) => {
  const rows = await pool.query('SELECT * FROM usuarios WHERE nombreUsuario = ?', [nombreUsuario]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(contrasena, user.contrasena)
    if (validPassword) {
      done(null, user, req.flash('Éxito', 'Bienvenido ' + user.nombreUsuario));
    } else {
      done(null, false, req.flash('message', 'Incorrect Password'));
    }
  } else {
    return done(null, false, req.flash('message', 'The Username does not exists.'));
  }
}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'nombreUsuario',
  passwordField: 'contrasena',
  passReqToCallback: true
}, async (req, nombreUsuario, contrasena, done) => {

  const { nombreCompleto } = req.body;
  let newUser = {
    nombreUsuario,
    contrasena,
    nombreCompleto
  };
  //Incriptacion de contraseña
  newUser.contrasena = await helpers.encryptPassword(contrasena);
  // Guardando en la base de datos
  const result = await pool.query('INSERT INTO usuarios SET ? ', newUser);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  done(null, rows[0]);
});

