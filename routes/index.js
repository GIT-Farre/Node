const express = require('express');
const router = express.Router();

//importar expres validator
const { body } = require('express-validator/check');

//importar el controlador
const proyectosController = require('../controllers/proyectosController')

module.exports = function (){
    router.get("/", proyectosController.proyectosHome);

    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto);

    //Listar proyecto
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

    //Actualizar el Proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
    return router;

}