 document.getElementById("btnAddBebida").addEventListener('click', addBebida);

let bebidas = [
    {
        "id": "1",
        "nombre": "Agua de Jamaica",
        "categoria": "Bebida",
        "descripcion": "Elaborada con hojas de flores de hibisco, su sabor único",
        "estatus": "Activo",
        "imagen": "../../recursos/Agua de jamaica.jpeg",
        "precio": "$80.00"
    },
    {
        "id": "2",
        "nombre": "Smoothie de Frutas",
        "categoria": "Bebida",
        "descripcion": "Plátano, fresas, yogur griego, leche (puede ser normal o vegetal) y un poco de miel o agave.",
        "estatus": "Activo",
        "imagen": "../../recursos/Smoothie de Frutas.jpg",
        "precio": "$120.00"
    },
    {
        "id": "3",
        "nombre": "Café con Leche",
        "categoria": "Bebida",
        "descripcion": "Café espresso o fuerte, leche (puede ser de vaca o vegetal), y azúcar al gusto.",
        "estatus": "Activo",
        "imagen": "../../recursos/cafe.jpeg",
        "precio": "$40.00"
    },
    {
        "id": "4",
        "nombre": "Jugo de Naranja Natural",
        "categoria": "Bebida",
        "descripcion": "​Naranjas frescas",
        "estatus": "Activo",
        "imagen": "../../recursos/jugo de naranja.webp",
        "precio": "$60.00"
    }
    ];

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

function addBebida() {
    // Generar un nuevo ID basado en el número de bebidas actuales
    let newId = bebidas.length > 0 ? (parseInt(bebidas[bebidas.length - 1].id) + 1).toString() : '1';
    let nombre = document.getElementById('add-nombre').value;
    let categoria = document.getElementById('add-categoria').value;
    let descripcion = document.getElementById('add-descripcion').value;

    let newBebida = { id: newId, nombre, categoria, descripcion, estatus: 'activo' };
    bebidas.push(newBebida);
    displayBebidas();
    alert('Bebida agregada con éxito.');
    clearForm('add-form');
}

function deleteBebida() {
    let id = document.getElementById('delete-id').value;
    let bebida = bebidas.find(bebida => bebida.id === id);

    if (bebida) {
        if (confirm('¿Estás seguro de que deseas eliminar esta bebida?')) {
            bebida.estatus = 'inactivo';
            displayBebidas();
            alert('Bebida marcada como inactiva.');
        }
    } else {
        alert('Bebida no encontrada.');
    }
    clearForm('delete-form');
}

function searchBebida() {
    let id = document.getElementById('search-id').value;
    let bebida = bebidas.find(bebida => bebida.id === id);

    if (bebida) {
        const info = `ID: ${bebida.id}\nNombre: ${bebida.nombre}\nCategoría: ${bebida.categoria}\nDescripción: ${bebida.descripcion}`;
        if (confirm(`${info}\n¿Quieres imprimir esta información?`)) {
            console.log(info);
        }
    } else {
        alert('Bebida no encontrada.');
    }
    clearForm('search-form');
}

function updateBebida() {
    let id = document.getElementById('update-id').value;
    let nombre = document.getElementById('update-nombre').value;
    let categoria = document.getElementById('update-categoria').value;
    let descripcion = document.getElementById('update-descripcion').value;

    let bebida = bebidas.find(bebida => bebida.id === id);

    if (bebida) {
        bebida.nombre = nombre;
        bebida.categoria = categoria;
        bebida.descripcion = descripcion;
        displayBebidas();
        alert('Bebida modificada correctamente.');
    } else {
        alert('Bebida no encontrada.');
    }
    clearForm('update-form');
}

function displayBebidas() {
    let tableBody = document.getElementById('bebidas-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    bebidas.forEach(bebida => {
        let row = tableBody.insertRow();
        let cellId = row.insertCell(0);
        let cellNombre = row.insertCell(1);
        let cellCategoria = row.insertCell(2);
        let cellDescripcion = row.insertCell(3);
        let cellEstatus = row.insertCell(4);

        cellId.textContent = bebida.id;

        // Crear el elemento con tooltip
        let nombreElement = document.createElement('div');
        nombreElement.className = 'tooltip';
        nombreElement.textContent = bebida.nombre;

        let tooltipText = document.createElement('div');
        tooltipText.className = 'tooltiptext';
        tooltipText.innerHTML = `<img src="${bebida.imagen || 'ruta/a/imagen_default.jpg'}" alt="${bebida.nombre}"/><br/>Precio: ${bebida.precio || 'N/A'}`;
        nombreElement.appendChild(tooltipText);

        cellNombre.appendChild(nombreElement);
        cellCategoria.textContent = bebida.categoria;
        cellDescripcion.textContent = bebida.descripcion;
        cellEstatus.textContent = bebida.estatus;
    });
}

function clearForm(formId) {
    let form = document.getElementById(formId);
    form.reset();
}

// Cargar datos desde un archivo JSON
fetch("http://localhost:8080/Zarape_Pro/moduloCatalagoBebida/data_Bebida.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (jsondata) {
        bebidas = jsondata.map(bebida => ({
            ...bebida,
            estatus: bebida.estatus || 'activo',
            imagen: bebida.imagen || 'ruta/a/imagen_default.jpg', // Valor por defecto en caso de no tener imagen
            precio: bebida.precio || 'N/A' // Valor por defecto en caso de no tener precio
        }));
        displayBebidas();
    });

 