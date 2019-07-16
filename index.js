const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();

//Configuraciones del puerto del servidor
app.set('port',process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./controllers/handlebars')
}));
app.set('view engine','.hbs');
//Midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//variables GLobales
app.use((req,res,next)=>{next()});

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