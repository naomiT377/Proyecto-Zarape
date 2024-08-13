/---------------------------------------- Funcionalidades de Login ----------------------------------------/
// Lista de usuarios y contraseñas
const usuarios = [
    { nombre: 'admin', contrasena: '1234' }    
];

function validarUsuario() {
    var usuario = document.getElementById('txtUsuario').value;
    var contrasena = document.getElementById('txtPassword').value;

    // Validar usuario y contraseña
    const usuarioValido = usuarios.find(u => u.nombre === usuario && u.contrasena === contrasena);

    if (usuarioValido) {
        Swal.fire({
            icon: "success",
            title: "Validado",
            text: "Bienvenido usuario"            
        });
        
        window.location.replace("modulo_Sucursal/view_Sucursal.html");

    } else {
        Swal.fire({
            icon: "error",
            title: "Acceso denegado",
            text: "Usuario y/o contraseña incorrectos, vuelve a intentarlo"
});
    }
}


