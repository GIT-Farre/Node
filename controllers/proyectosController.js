const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.proyectosHome = async (req, res) =>{
    const proyectos = await Proyectos.findAll();

    res.render('index',{
        nombrePagina: 'Proyectos',
        proyectos
    });


}

exports.formularioProyecto = async (req, res) =>{
    const proyectos = await Proyectos.findAll();

    res.render('nuevoProyecto',{
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });

}

exports.nuevoProyecto = async (req, res) =>{
    const proyectos = await Proyectos.findAll();

    //Enviar a consola
    console.log(req.body);
    //Validar que tengamos algo en el imput
    const {nombre} = req.body;

    let errores = [];

    if(!nombre){
        errores.push({'texto': 'Agrega un nombre al proyecto'})
    }

    //Si hay errores
    if(errores.length>0){
     res.render('nuevoProyecto', {
         nombrePagina: 'Nuevo Proyecto',
         errores,
         proyectos
     })   
    } else{
        //No hay errores
        //Insertar en la BBDD
        // const url = slug(nombre).toLowerCase();
        await Proyectos.create({ nombre });
        res.redirect('/');
    }

}

exports.proyectoPorUrl = async (req, res, next) =>{
    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    //Consultar tareas proyecto actual

    const tareas = await Tareas.findAll({
        where: {
            proyectoId : proyecto.id
        }
    });

    console.log(tareas);

    if(!proyecto) return next();

    //render a la vista

    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    });
}

exports.formularioEditar = async (req, res) =>{
    const proyectosPromise =  Proyectos.findAll();

    const proyectoPromise =  Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    //render a la vista
    res.render('nuevoProyecto',{
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async (req, res) =>{
    const proyectos = await Proyectos.findAll();

    //Enviar a consola
    console.log(req.body);
    //Validar que tengamos algo en el imput
    const {nombre} = req.body;

    let errores = [];

    if(!nombre){
        errores.push({'texto': 'Agrega un nombre al proyecto'})
    }

    //Si hay errores
    if(errores.length>0){
     res.render('nuevoProyecto', {
         nombrePagina: 'Nuevo Proyecto',
         errores,
         proyectos
     })   
    } else{
        //No hay errores
        //Insertar en la BBDD
        // const url = slug(nombre).toLowerCase();
        await Proyectos.update(
            { nombre: nombre },
            { where: {id: req.params.id}}
        );
        res.redirect('/');
    }

}

exports.eliminarProyecto = async (req, res, next) => {
    // req- query o params
    //console.log(req.query);
    const {urlProyecto} = req.query;

    const resultado = await Proyectos.destroy({
        where :{
            url: urlProyecto
        }
    });

    if(!resultado){
        return next();
    }
    res.status(200).send('Proyecto eliminado correctamente');
}