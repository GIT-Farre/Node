const Proyectos = require('../models/Proyectos');

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
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');
    }

}

exports.proyectoPorUrl = async (req, res, next) =>{
    const proyectos = await Proyectos.findAll();

    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    if(!proyecto) return next();

    console.log(proyecto);

    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos
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