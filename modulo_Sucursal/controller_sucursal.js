let indexSucursalSeleccionado;
let Sucursales = [
    {
        numeroUnico: "001",
        nombreSucursal: "Sucursal Centro",
        foto: "https://s3-media0.fl.yelpcdn.com/bphoto/nQJllh8e63dwipRFo0XYYQ/l.jpg", // URL de ejemplo para la imagen
        calleYNum: "Av. Reforma 123",
        colonia: "Centro",
        gps: "19.4326,-99.1332",
        telefono: "(55) 1234-5678",
        horario: "Lunes a Viernes, 9am - 6pm",
        paginaWeb: "www.sucursalcentro.com"
    },
    {
        numeroUnico: "002",
        nombreSucursal: "Sucursal Norte",
        foto: "https://s3-media0.fl.yelpcdn.com/bphoto/7PG5qPhW7rA4Nd3Bt6sNWw/300s.jpg", // URL de ejemplo para la imagen
        calleYNum: "Calle Norte 456",
        colonia: "Norte",
        gps: "19.4326,-99.1333",
        telefono: "(55) 8765-4321",
        horario: "Lunes a Viernes, 10am - 5pm",
        paginaWeb: "www.sucursalnorte.com"
    },
    {
        numeroUnico: "003",
        nombreSucursal: "Sucursal Sur",
        foto: "https://th.bing.com/th/id/OIP.CTpVwJykppSLDgfnEiF6aQAAAA?w=300&h=400&rs=1&pid=ImgDetMain", // URL de ejemplo para la imagen
        calleYNum: "Calle Sur 789",
        colonia: "Sur",
        gps: "19.4326,-99.1334",
        telefono: "(55) 1122-3344",
        horario: "Lunes a Viernes, 8am - 7pm",
        paginaWeb: "www.sucursalsur.com"
    }
];

// Función para cargar las sucursales en la tabla
function loadTabla() {
    let cuerpo = "";
    Sucursales.forEach(function(sucursal, index) {
        let registro =  
            `<tr onclick="selectSucursal(${index});">
                <td>${sucursal.numeroUnico}</td>
                <td>${sucursal.nombreSucursal}</td>
                <td><img src="${sucursal.foto}" alt="Foto de sucursal" style="width: 100px;"></td>
                <td>${sucursal.calleYNum}</td>
                <td>${sucursal.colonia}</td>
                <td>${sucursal.gps}</td>
                <td>${sucursal.telefono}</td>
                <td>${sucursal.horario}</td>
                <td>${sucursal.paginaWeb}</td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblSucursal").innerHTML = cuerpo;
}

// Llamada inicial para cargar las sucursales
loadTabla();


// Función para agregar una nueva sucursal
function addSucursal() {
    let numeroUnico = document.getElementById("txtNumUnico").value;
    let nombreSucursal = document.getElementById("txtNombre").value;
    let foto = document.getElementById("txtFoto").files[0];
    let calleYNum = document.getElementById("txtCalleYNum").value;
    let colonia = document.getElementById("txtColonia").value;
    let gps = document.getElementById("txtGPS").value;
    let telefono = document.getElementById("txtTelefono").value;
    let horario = document.getElementById("txtHorario").value;
    let paginaWeb = document.getElementById("txtPagWeb").value;

    // Crear URL para la imagen
    let fotoURL = URL.createObjectURL(foto);
    let sucursal = {
        numeroUnico: numeroUnico,
        nombreSucursal: nombreSucursal,
        foto: fotoURL,
        calleYNum: calleYNum,
        colonia: colonia,
        gps: gps,
        telefono: telefono,
        horario: horario,
        paginaWeb: paginaWeb
    };

    Sucursales.push(sucursal);  // Agrega la nueva sucursal a la lista
    clean();
    loadTabla();
}

// Función para cargar las sucursales en la tabla
function loadTabla() {
    let cuerpo = "";
    Sucursales.forEach(function(sucursal, index) {
        let registro =  
            `<tr onclick="selectSucursal(${index});">
                <td>${sucursal.numeroUnico}</td>
                <td>${sucursal.nombreSucursal}</td>
                <td><img src="${sucursal.foto}" alt="Foto de sucursal" style="width: 100px;"></td>
                <td>${sucursal.calleYNum}</td>
                <td>${sucursal.colonia}</td>
                <td>${sucursal.gps}</td>
                <td>${sucursal.telefono}</td>
                <td>${sucursal.horario}</td>
                <td>${sucursal.paginaWeb}</td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblSucursal").innerHTML = cuerpo;
}

// Función para seleccionar una sucursal de la tabla
function selectSucursal(index) {
    document.getElementById("txtNumUnico").value = Sucursales[index].numeroUnico;
    document.getElementById("txtNombre").value = Sucursales[index].nombreSucursal;
    // No podemos recuperar la imagen ya que no podemos volver a leer el archivo del input, pero podemos mostrar una URL previa
    document.getElementById("txtFoto").value = ""; // Limpiar el input de archivo

    document.getElementById("txtCalleYNum").value = Sucursales[index].calleYNum;
    document.getElementById("txtColonia").value = Sucursales[index].colonia;
    document.getElementById("txtGPS").value = Sucursales[index].gps;
    document.getElementById("txtTelefono").value = Sucursales[index].telefono;
    document.getElementById("txtHorario").value = Sucursales[index].horario;
    document.getElementById("txtPagWeb").value = Sucursales[index].paginaWeb;

    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");
    indexSucursalSeleccionado = index;
}

// Función para limpiar los campos
function clean() {
    document.getElementById("txtNumUnico").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtFoto").value = "";
    document.getElementById("txtCalleYNum").value = "";
    document.getElementById("txtColonia").value = "";
    document.getElementById("txtGPS").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtHorario").value = "";
    document.getElementById("txtPagWeb").value = "";

    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexSucursalSeleccionado = null;
}

// Función para actualizar una sucursal
function updateSucursal() {
    let numeroUnico = document.getElementById("txtNumUnico").value;
    let nombreSucursal = document.getElementById("txtNombre").value;
    let foto = document.getElementById("txtFoto").value;    
    let calleYNum = document.getElementById("txtCalleYNum").value;
    let colonia = document.getElementById("txtColonia").value;
    let gps = document.getElementById("txtGPS").value;
    let telefono = document.getElementById("txtTelefono").value;
    let horario = document.getElementById("txtHorario").value;
    let paginaWeb = document.getElementById("txtPagWeb").value;

    let sucursal = {
        numeroUnico: numeroUnico,
        nombreSucursal: nombreSucursal,
        foto: Sucursales[indexSucursalSeleccionado].foto, // Mantener la misma foto
        calleYNum: calleYNum,
        colonia: colonia,
        gps: gps,
        telefono: telefono,
        horario: horario,
        paginaWeb: paginaWeb
    };

    Sucursales[indexSucursalSeleccionado] = sucursal;
    clean();
    loadTabla();
}

// Función para eliminar una sucursal
function deleteSucursal() {
    Sucursales.splice(indexSucursalSeleccionado, 1);
    clean();
    loadTabla();
}

// Función para buscar sucursales
function searchSucursal() {
    let filtro = document.getElementById("txtBusquedaSucursal").value.toLowerCase();
    let resultados = Sucursales.filter(element => element.nombreSucursal.toLowerCase().includes(filtro));
    
    let cuerpo = "";
    resultados.forEach(function(sucursal, index) {
        let registro =  
            `<tr onclick="selectSucursal(${Sucursales.indexOf(sucursal)});">
                <td>${sucursal.numeroUnico}</td>
                <td>${sucursal.nombreSucursal}</td>
                <td><img src="${sucursal.foto}" alt="Foto de sucursal" style="width: 100px;"></td>
                <td>${sucursal.calleYNum}</td>
                <td>${sucursal.colonia}</td>
                <td>${sucursal.gps}</td>
                <td>${sucursal.telefono}</td>
                <td>${sucursal.horario}</td>
                <td>${sucursal.paginaWeb}</td>
            </tr>`;
        cuerpo += registro;
    });
    
    document.getElementById("tblSucursal").innerHTML = cuerpo;
}


fetch("../modulo_Sucursal/data_Sucursal.json")
    .then(response => response.json())
    .then(jsondata => {
        Usuarios = jsondata;
        console.log(Usuarios);
        loadTabla();
    });