document.getElementById("btnAddAlimento").addEventListener('click', addAlimento);

let alimentos = [];

// Muestra el formulario correspondiente
function showForm(formType) {
    document.getElementById('add-form').style.display = 'none';
    document.getElementById('delete-form').style.display = 'none';
    document.getElementById('search-form').style.display = 'none';
    document.getElementById('update-form').style.display = 'none';

    if (formType === 'add') {
        document.getElementById('add-form').style.display = 'block';
    } else if (formType === 'delete') {
        document.getElementById('delete-form').style.display = 'block';
    } else if (formType === 'search') {
        document.getElementById('search-form').style.display = 'block';
    } else if (formType === 'update') {
        document.getElementById('update-form').style.display = 'block';
    }
}

// Agrega un nuevo alimento
function addAlimento() {
    let newId = alimentos.length > 0 ? (parseInt(alimentos[alimentos.length - 1].id) + 1).toString() : '1';
    let nombre = document.getElementById('add-nombre').value;
    let categoria = document.getElementById('txtCategoria').value; // Corregido el ID
    let descripcion = document.getElementById('add-descripcion').value;
    let imagen = 'ruta/a/imagen_default.jpg'; // Imagen por defecto
    let precio = 'N/A'; // Precio por defecto

    if (nombre && categoria && descripcion) { // Validar que los campos no estén vacíos
        let newAlimento = { id: newId, nombre, categoria, descripcion, imagen, estatus: 'Activo', precio };
        alimentos.push(newAlimento);
        displayAlimentos();
        alert('Alimento agregado con éxito.');
        clearForm('add-form');
    } else {
        alert('Por favor complete todos los campos.');
    }
}

// Elimina un alimento
function deleteAlimento() {
    let id = document.getElementById('delete-id').value;
    let alimento = alimentos.find(alimento => alimento.id === id);

    if (alimento) {
        if (confirm('¿Estás seguro de que deseas eliminar este alimento?')) {
            alimento.estatus = 'Inactivo';
            displayAlimentos();
            alert('Alimento marcado como inactivo.');
        }
    } else {
        alert('Alimento no encontrado.');
    }
    clearForm('delete-form');
}

// Busca un alimento
function searchAlimento() {
    let id = document.getElementById('search-id').value;
    let alimento = alimentos.find(alimento => alimento.id === id);

    if (alimento) {
        const info = `ID: ${alimento.id}\nNombre: ${alimento.nombre}\nCategoría: ${alimento.categoria}\nDescripción: ${alimento.descripcion}`;
        if (confirm(`${info}\n¿Quieres imprimir esta información?`)) {
            console.log(info);
        }
    } else {
        alert('Alimento no encontrado.');
    }
    clearForm('search-form');
}

// Actualiza un alimento
function updateAlimento() {
    let id = document.getElementById('update-id').value;
    let nombre = document.getElementById('update-nombre').value;
    let categoria = document.getElementById('update-categoria').value;
    let descripcion = document.getElementById('update-descripcion').value;

    let alimento = alimentos.find(alimento => alimento.id === id);

    if (alimento) {
        alimento.nombre = nombre;
        alimento.categoria = categoria;
        alimento.descripcion = descripcion;
        displayAlimentos();
        alert('Alimento modificado correctamente.');
    } else {
        alert('Alimento no encontrado.');
    }
    clearForm('update-form');
}

// Muestra los alimentos en la tabla
function displayAlimentos() {
    let tableBody = document.getElementById('alimentos-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    alimentos.forEach(alimento => {
        if (alimento.estatus === 'Activo') {
            let row = tableBody.insertRow();
            let cellId = row.insertCell(0);
            let cellNombre = row.insertCell(1);
            let cellCategoria = row.insertCell(2);
            let cellDescripcion = row.insertCell(3);
            let cellEstatus = row.insertCell(4);

            cellId.textContent = alimento.id;

            let nombreElement = document.createElement('div');
            nombreElement.className = 'tooltip';
            nombreElement.textContent = alimento.nombre;

            let tooltipText = document.createElement('div');
            tooltipText.className = 'tooltiptext';
            tooltipText.innerHTML = `<img src="${alimento.imagen}" alt="${alimento.nombre}" style="width: 100px; height: auto;"/><br/>Precio: ${alimento.precio}`;
            nombreElement.appendChild(tooltipText);

            cellNombre.appendChild(nombreElement);
            cellCategoria.textContent = alimento.categoria;
            cellDescripcion.textContent = alimento.descripcion;
            cellEstatus.textContent = alimento.estatus;
        }
    });
}

// Limpia los formularios
function clearForm(formId) {
    let form = document.getElementById(formId);
    form.reset();
}

// Cargar datos desde un archivo JSON
fetch("../moduloCatalagoAlimento/data_Alimento.json")
    .then(response => response.json())
    .then(jsondata => {
        console.log('Datos cargados:', jsondata); // Verificar los datos cargados
        alimentos = jsondata.map(alimento => ({
            ...alimento,
            estatus: alimento.estatus || 'Activo',
            imagen: alimento.imagen || 'ruta/a/imagen_default.jpg',
            precio: alimento.precio || 'N/A'
        }));
        displayAlimentos();
    })
    .catch(error => console.error('Error cargando el JSON:', error));
