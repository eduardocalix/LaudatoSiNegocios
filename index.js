const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
//const { check, validationResult } = require('express-validator');
//const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

const { database } = require('./keys');

// Intializations
const app = express();
const passport = require('./controllers/passport.js');

//Configuraciones del puerto del servidor
app.set('port',process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./controllers/handlebars.js')
}));
app.set('view engine','.hbs');
//Midlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//app.use(validator());

//variables GLobales
app.use(session({
  secret: 'faztmysqlnodemysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));

app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});



//routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/articles', require('./routes/articles'));
//Publico
app.use(express.static(path.join(__dirname,'public')));


//iniciar el servidor

app.listen(app.get('port'), () =>{
    console.log('servidor y puerto', app.get('port'));
});