const Proyectos = require('../models/Proyectos');

exports.proyectosHome = (req, res) =>{
    res.render('index',{
        nombrePagina: 'Proyectos'
    });


}

exports.formularioProyecto = (req, res) =>{
    res.render('nuevoProyecto',{
        nombrePagina: 'Nuevo Proyecto'
    });

}

exports.nuevoProyecto = async (req, res) =>{

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
         errores
     })   
    } else{
        //No hay errores
        //Insertar en la BBDD
        // const url = slug(nombre).toLowerCase();
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');
    }

}