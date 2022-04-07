const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

//Helpers con funciones
const helpers = require('./helpers');

//Crear conexiona bbdd
const db = require('./config/db');

//Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');

db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error));

//crear una app de express
const app = express();

//Donde cargar archivos estaticos
app.use(express.static('public'));

//Habilitar Pug
app.set('view engine', 'pug');

//Pasar vardump a la aplicación
app.use((req, res, next) =>{
    //Crear variables para consumirlo entodos los archivos res.locals
    res.locals.vardump = helpers.vardump;
    next();
});

//Aprendiendo middleware
//app.listen((req, res, next) =>{
//    console.log('Soy middleware');
//    next(); Sin next no se ejecutaria el siguiente codigo
//});

//Añadir carpeta de las vistast
app.set('views', path.join(__dirname, './views'));

//Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", routes());

app.listen(3000);