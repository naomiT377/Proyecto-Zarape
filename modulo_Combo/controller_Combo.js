let indexComboSeleccionado;
let Combos = [
    {
        numeroUnico: "001",
        nombreCombo: "Combo A",
        foto: "https://cdn1.matadornetwork.com/blogs/2/2019/12/Chilaquiles-Mexican-breakfast.jpg",
        categoria: "Entrante",
        descripcion: "Descripción del Combo A",
        elementos: "Elemento 1, Elemento 2",
        precio: "12.99"
    },
    {
        numeroUnico: "002",
        nombreCombo: "Combo B",
        foto: "https://th.bing.com/th/id/R.9029a270836c30cb7ded849bb7651178?rik=MK7NLAAsErN67g&pid=ImgRaw&r=0",
        categoria: "Principal",
        descripcion: "Descripción del Combo B",
        elementos: "Elemento 3, Elemento 4",
        precio: "15.99"
    },
    {
        numeroUnico: "003",
        nombreCombo: "Combo C",
        foto: "https://cdn.kiwilimon.com/ss_secreto/2158/2158.jpg",
        categoria: "Postre",
        descripcion: "Descripción del Combo C",
        elementos: "Elemento 5, Elemento 6",
        precio: "9.99"
    }
];

// Función para agregar un nuevo combo
function addCombo() {
    let numeroUnico = document.getElementById("txtNumUnico").value;
    let nombreCombo = document.getElementById("txtNomCombo").value;
    let fotoInput = document.getElementById("txtFoto");
    let foto = fotoInput.files[0];
    let categoria = document.getElementById("txtCategoria").value;
    let descripcion = document.getElementById("txtDescripcion").value;
    let elementos = document.getElementById("txtElementos").value;
    let precio = document.getElementById("txtPrecio").value;

    let fotoURL = foto ? URL.createObjectURL(foto) : '';

    let combo = {
        numeroUnico: numeroUnico,
        nombreCombo: nombreCombo,
        foto: fotoURL,
        categoria: categoria,
        descripcion: descripcion,
        elementos: elementos,
        precio: precio
    };

    Combos.push(combo);  // Agrega el nuevo combo a la lista
    clean();
    loadTabla();
}

// Función para cargar los combos en la tabla
function loadTabla() {
    let cuerpo = "";
    Combos.forEach(function(combo, index) {
        let registro =  
            `<tr onclick="selectCombo(${index});">
                <td>${combo.numeroUnico}</td>
                <td>${combo.nombreCombo}</td>
                <td><img src="${combo.foto}" alt="Foto del combo" style="width: 100px;"></td>
                <td>${combo.categoria}</td>
                <td>${combo.descripcion}</td>
                <td>${combo.elementos}</td>
                <td>${combo.precio}</td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblUsuario").innerHTML = cuerpo;
}

// Función para seleccionar un combo de la tabla
function selectCombo(index) {
    document.getElementById("txtNumUnico").value = Combos[index].numeroUnico;
    document.getElementById("txtNomCombo").value = Combos[index].nombreCombo;
    // Mostrar la imagen si está disponible
    document.getElementById("txtFoto").value = ""; // Limpiar el input de archivo
    document.getElementById("txtCategoria").value = Combos[index].categoria;
    document.getElementById("txtDescripcion").value = Combos[index].descripcion;
    document.getElementById("txtElementos").value = Combos[index].elementos;
    document.getElementById("txtPrecio").value = Combos[index].precio;

    document.getElementById("btnUpdate").classList.remove("disabled");
    document.getElementById("btnDelete").classList.remove("disabled");
    document.getElementById("btnAdd").classList.add("disabled");
    indexComboSeleccionado = index;
}

// Función para limpiar los campos
function clean() {
    document.getElementById("txtNumUnico").value = "";
    document.getElementById("txtNomCombo").value = "";
    document.getElementById("txtFoto").value = "";
    document.getElementById("txtCategoria").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtElementos").value = "";
    document.getElementById("txtPrecio").value = "";

    document.getElementById("btnUpdate").classList.add("disabled");
    document.getElementById("btnDelete").classList.add("disabled");
    document.getElementById("btnAdd").classList.remove("disabled");
    indexComboSeleccionado = null;
}

// Función para actualizar un combo
function updateCombo() {
    let numeroUnico = document.getElementById("txtNumUnico").value;
    let nombreCombo = document.getElementById("txtNomCombo").value;
    let fotoInput = document.getElementById("txtFoto");
    let foto = fotoInput.files[0];
    let categoria = document.getElementById("txtCategoria").value;
    let descripcion = document.getElementById("txtDescripcion").value;
    let elementos = document.getElementById("txtElementos").value;
    let precio = document.getElementById("txtPrecio").value;

    let fotoURL = foto ? URL.createObjectURL(foto) : Combos[indexComboSeleccionado].foto;

    let combo = {
        numeroUnico: numeroUnico,
        nombreCombo: nombreCombo,
        foto: fotoURL,
        categoria: categoria,
        descripcion: descripcion,
        elementos: elementos,
        precio: precio
    };

    Combos[indexComboSeleccionado] = combo;
    clean();
    loadTabla();
}

// Función para eliminar un combo
function deleteCombo() {
    Combos.splice(indexComboSeleccionado, 1);
    clean();
    loadTabla();
}

// Función para buscar combos
function searchCombo() {
    let filtro = document.getElementById("txtBusquedaUsuario").value.toLowerCase();
    let resultados = Combos.filter(element => element.nombreCombo.toLowerCase().includes(filtro));
    
    let cuerpo = "";
    resultados.forEach(function(combo, index) {
        let registro =  
            `<tr onclick="selectCombo(${Combos.indexOf(combo)});">
                <td>${combo.numeroUnico}</td>
                <td>${combo.nombreCombo}</td>
                <td><img src="${combo.foto}" alt="Foto del combo" style="width: 100px;"></td>
                <td>${combo.categoria}</td>
                <td>${combo.descripcion}</td>
                <td>${combo.elementos}</td>
                <td>${combo.precio}</td>
            </tr>`;
        cuerpo += registro;
    });
    
    document.getElementById("tblUsuario").innerHTML = cuerpo;
}

// Inicialización de la tabla con datos de un archivo JSON (si es necesario)
document.addEventListener("DOMContentLoaded", function() {
    loadTabla();
});
