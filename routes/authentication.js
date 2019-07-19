const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../controllers/auth.js');


// SIGNUP
router.get('/signup',(req, res) => {
  res.render('auth/signup');
  console.log('visto');
});

router.post('/signup',passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

// SINGIN
router.get('/signin',(req, res) => {
  res.render('auth/signin');
  console.log('visto');

});


//check('nombreUsuario', 'El nombre del usuario es requerido').notEmpty();
  //check('contrasena', 'La contraseña es requerida').notEmpty();
  /* const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/signin');
  } */
  router.post('/signin', (req, res, next) => {
   
    passport.authenticate('local.signin', {
      successRedirect: '/profile',
      failureRedirect: '/signin',
      failureFlash: true
    })(req, res, next);

  });
  

router.get('/logout',(req, res) => {
  req.logOut();
  res.redirect('/signin');
});

router.get('/profile',(req, res) => {
  res.render('profile');
});

module.exports = router;
