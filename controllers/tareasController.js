const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');


exports.agregarTarea = async (req, res, next) => {
    //Obtenemos proyecto actual
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        } 
    });

    //Leer el valor del input
    const {tarea} = req.body;

    const estado = 0;
    const proyectoId = proyecto.id;

    //Insertar en la BBDD
    const resultado = await Tareas.create({tarea, estado, proyectoId});

    if(!resultado){
        return next();
    }

    //redireccionar
    res.redirect(`/proyectos/${req.oarams.url}`);

}