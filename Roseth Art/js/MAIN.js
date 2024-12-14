// PRODUCTOS
const productos = [
    // Galeria
    {
        id: "galeria-01",
        titulo: "Ave",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_t1mIsM6RKjJqYsmw6j-U3bttt_m6vIA_Fw&sps://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCO/121618383_01/w=1500,h=1500,fit=pad",
        categoria: {
            nombre: "Galeria",
            id: "galeria"
        },
        precio: 150000
    },
    {
        id: "galeria-02",
        titulo: "Naturaleza",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn-xDI3b2nj-btNEIL9YmMQ3xC5Qj4Yt6cFCZNbTuVGIZE4LcTS1O7Jt9Zyqc1nywdTWQ&usqp=CAU",
        categoria: {
            nombre: "Galeria",
            id: "galeria"
        },
        precio: 145000
    },
    {
        id: "galeria-03",
        titulo: "Tulipanes",
        imagen: "https://www.matuttera.cl/wp-content/uploads/2023/05/C99127AF-2EA0-4455-ACBB-CEEAA410D7D8.jpeg",
        categoria: {
            nombre: "Galeria",
            id: "galeria"
        },
        precio: 165000
    },    
    {
        id: "galeria-04",
        titulo: "Caballo",
        imagen: "https://www.marciabarrientos.cl/wp-content/uploads/2021/04/Acuarela-6.jpg",
        categoria: {
            nombre: "Galeria",
            id: "galeria"
        },
        precio: 200000
    },
    // Materiales
    {
        id: "material-01",
        titulo: "kit de acuarelas",
        imagen: "https://lagranpapeleria.com/cdn/shop/products/IMG_8448_500x@2x.jpg?v=1645047757",
        categoria: {
            nombre: "Materiales",
            id: "materiales"
        },
        precio: 110000
    },
    {
        id: "materiales-02",
        titulo: "Pinceles",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYxQsj9gs5feLtfvmASx2wGb_FXshkDuKpiA&s",
        categoria: {
            nombre: "Materiales",
            id: "materiales"
        },
        precio: 80000
    },
    {
        id: "materiales-03",
        titulo: "Pinceles para caligrafia",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_987101-CBT73695066961_122023-O.webp",
        categoria: {
            nombre: "Materiales",
            id: "materiales"
        },
        precio: 111000
    },
    // Cursos
    {
        id: "cursos-01",
        titulo: "Curso basico de acuarelas",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg38A6IaesrQWe3UzPkOdg3JZfSqwj4Ba-Iw&s",
        categoria: {
            nombre: "Cursos",
            id: "cursos"
        },
        precio: 210000
    },
    {
        id: "cursos-02",
        titulo: "Curso basico de lettering",
        imagen: "https://hotmart.s3.amazonaws.com/product_contents/f20ff36a-2d5f-4b84-9b55-7e5b191fefaa/cursoletteringonlineaprende.jpg",
        categoria: {
            nombre: "Cursos",
            id: "cursos"
        },
        precio: 80000
    },
    ];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}