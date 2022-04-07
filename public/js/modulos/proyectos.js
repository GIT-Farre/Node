import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar){
    btnEliminar.addEventListener('click', () => {
        Swal.fire({
            title: 'Deseas borrar el proyecto?',
            text: "Un proyecto eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Proyecto eliminado!',
                    'El proyecto se ha eliminado',
                    'success'
                );

                // redireccionar al inicio
                setTimeout(() => {
                    window.location.href = "/";
                }, 3000);
            }
        })
    })
}
