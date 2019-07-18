//Se Importan todos los modulos instalados
//Agregados en el package.json para poder utilizar
//todas las propiedades

//Express es el framework Express.js es el framework para Node.js
//que nos permite crear aplicaciones en poco tiempo
const express = require('express');
const morgan = require('morgan');
const path = require('path');
//Sirve para usar el template engine de handlebars
const exphbs = require('express-handlebars');
const session = require('express-session');
//const validator = require('express-validator');
//Passport nos sirve para autenticar los usuarios
const passport = require('passport');
//Flash para mostrar los mensajes
const flash = require('connect-flash');
//
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
//contiene los datos de la conexion con la base
const { database } = require('./keys');

// Intializations
const app = express();
require('./controllers/passport');

//Configuraciones del puerto del servidor
app.set('port',process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
//El template engine es handlebars que es sistema de plantillas en Javascript 
//Su extensión es .hbs
app.engine('.hbs', exphbs({
  //El main es la vista principal de todo el proyecto
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./controllers/handlebars')
}));
app.set('view engine','.hbs');
//Midlewares
// son los que hacen el intercambio de información entre aplicaciones
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
  secret: 'laudatosqlnodemysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//app.use(validator());

//variables GLobales
app.use((req, res, next) => {
  //Estos son los mensajes que hemos creado para las operaciones
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});



//rutas
//que son las carpetas de donde renderizamos nuestras vistas
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/articles', require('./routes/articles'));
//Publico
app.use(express.static(path.join(__dirname,'public')));


//iniciar el servidor

app.listen(app.get('port'), () =>{
    console.log('servidor y puerto', app.get('port'));
});