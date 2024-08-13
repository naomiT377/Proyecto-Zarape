let indexUsuarioSeleccionado;
let Usuarios = [
    
     {
        "numero_unico_Usuario": "1",
        "nombre_Usuario": "Naomi Teran",
        "Contraseña": "naomi123"
    },
    {
        "numero_unico_Usuario": "2",
        "nombre_Usuario": "Mayra Hernandez",
        "Contraseña": "mayH123"
    },
    {
        "numero_unico_Usuario": "3",
        "nombre_Usuario": "Yaneth Cruz",
        "Contraseña": "yanethC123"
    }
    
];

// Función para agregar un nuevo usuario
function addUsuario() {
    let numero_unico_Usuario = document.getElementById("txtNumUnico").value;
    let nombre_Usuario = document.getElementById("txtNomUsuario").value;
    let Contraseña = document.getElementById("txtPassword").value;

    // Verificar si el usuario ya existe (por número único)
    if (Usuarios.some(usuario => usuario.numero_unico_Usuario === numero_unico_Usuario)) {
        alert('El número único de usuario ya existe.');
        return;
    }

    let usuario = {
        numero_unico_Usuario: numero_unico_Usuario,
        nombre_Usuario: nombre_Usuario,
        Contraseña: Contraseña
    };

    Usuarios.push(usuario);  // Agrega el nuevo usuario a la lista
    clean();
    loadTabla();
}

function generarIDUser() {
    let ultimoID = 0;

    //Primero revisamos que haya alimentos en el arreglo:
    if (Usuarios.length > 0) {
        ultimoID = Usuarios[0].id;
        for (let i = 0; i < Usuarios.length; i++) { 
            if (Usuarios[i].id > ultimoID)
                ultimoID = Usuarios[i].id;
        }
    }
    ultimoID++;
    return ultimoID;
}

// Función para cargar la tabla con usuarios
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

// Función para seleccionar un usuario
function selectUsuario(index) {
    document.getElementById("txtNumUnico").value = Usuarios[index].numero_unico_Usuario;
    document.getElementById("txtNomUsuario").value = Usuarios[index].nombre_Usuario;
    document.getElementById("txtPassword").value = Usuarios[index].Contraseña;

    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");
    indexUsuarioSeleccionado = index;
}

// Cargar datos desde un archivo JSON
fetch("../modulo_Usuario/data_Usuario.json")
    .then(response => response.json())
    .then(jsondata => {
        Usuarios = jsondata;
        console.log(Usuarios);
        loadTabla();
    })
    .catch(error => console.error('Error cargando el JSON:', error));

// Función para limpiar los campos del formulario
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

// Función para actualizar un usuario
function updateUsuario() {
    let numero_unico_Usuario = document.getElementById("txtNumUnico").value;
    let nombre_Usuario = document.getElementById("txtNomUsuario").value;
    let Contraseña = document.getElementById("txtPassword").value;

    if (indexUsuarioSeleccionado !== null) {
        let usuario = {
            numero_unico_Usuario: numero_unico_Usuario,
            nombre_Usuario: nombre_Usuario,
            Contraseña: Contraseña
        };

        Usuarios[indexUsuarioSeleccionado] = usuario;
        clean();
        loadTabla();
    }
}

// Función para eliminar un usuario
function deleteUsuario() {
    if (indexUsuarioSeleccionado !== null) {
        Usuarios.splice(indexUsuarioSeleccionado, 1);  // Elimina el usuario del array
        clean();
        loadTabla();
    }
}

// Función para buscar usuarios
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