let indexUsuarioSeleccionado;
let Usuarios = [];

function addUsuario() {
    let numero_unico_Usuario = document.getElementById("txtNumUnico").value;
    let nombre_Usuario = document.getElementById("txtNomUsuario").value;
    let Contraseña = document.getElementById("txtPassword").value;

    let usuario = {
        numero_unico_Usuario: numero_unico_Usuario,
        nombre_Usuario: nombre_Usuario,
        Contraseña: Contraseña
    };
    
    Usuarios.push(usuario);  // Agrega el nuevo usuario a la lista
    clean();
    loadTabla();
}

function loadTabla() {
    let cuerpo = "";
    Usuarios.forEach(function (usuario, index) {
        let registro =  
            `<tr onclick="selectUsuario(${index});">
                <td>${usuario.numero_unico_Usuario}</td>
                <td>${usuario.nombre_Usuario}</td>
                <td>${usuario.Contraseña}</td>
            </tr>`;
        cuerpo += registro;
    });
    console.log(cuerpo);
    document.getElementById("tblUsuario").innerHTML = cuerpo;
}

function selectUsuario(index) {
    document.getElementById("txtNumUnico").value = Usuarios[index].numero_unico_Usuario;
    document.getElementById("txtNomUsuario").value = Usuarios[index].nombre_Usuario;
    document.getElementById("txtPassword").value = Usuarios[index].Contraseña;

    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");
    indexUsuarioSeleccionado = index;
}

fetch("moduloUsuario/data_Usuario.json")
    .then(response => response.json())
    .then(jsondata => {
        Usuarios = jsondata;
        console.log(Usuarios);
        loadTabla();
    });

function clean() {
    document.getElementById("txtNumUnico").value = "";
    document.getElementById("txtNomUsuario").value = "";
    document.getElementById("txtPassword").value = "";
    document.getElementById("txtNomUsuario").focus();
    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexUsuarioSeleccionado = null;  // Use null to indicate no selection
}

function updateUsuario() {
    let numero_unico_Usuario = document.getElementById("txtNumUnico").value;
    let nombre_Usuario = document.getElementById("txtNomUsuario").value;
    let Contraseña = document.getElementById("txtPassword").value;

    let usuario = {
        numero_unico_Usuario: numero_unico_Usuario,
        nombre_Usuario: nombre_Usuario,
        Contraseña: Contraseña
    };

    Usuarios[indexUsuarioSeleccionado] = usuario;
    clean();
    loadTabla();
}

function deleteUsuario() {
    Usuarios.splice(indexUsuarioSeleccionado, 1);  // Elimina el usuario del array
    clean();
    loadTabla();
}

function searchUsuario() {
    let filtro = document.getElementById("txtBusquedaUsuario").value.toLowerCase();
    let resultados = Usuarios.filter(element => element.nombre_Usuario.toLowerCase().includes(filtro));
    
    let cuerpo = "";
    resultados.forEach(function(usuario, index) {
        let registro =  
            `<tr onclick="selectUsuario(${Usuarios.indexOf(usuario)});">
                <td>${usuario.numero_unico_Usuario}</td>
                <td>${usuario.nombre_Usuario}</td>
                <td>${usuario.Contraseña}</td>
            </tr>`;
        cuerpo += registro;
    });
    
    console.log(cuerpo);
    document.getElementById("tblUsuario").innerHTML = cuerpo;
}
