let carrito = [];


function guardarCarritoEnLocalStorage() {
    
    let carritoJSON = JSON.stringify(carrito);
    
   
    localStorage.setItem("carrito", carritoJSON);

    console.log(carritoJSON);
}


function cargarCarritoDesdeLocalStorage() {
    
    if (localStorage.getItem("carrito")) {
       
        let carritoJSON = localStorage.getItem("carrito");
        
        
        carrito = JSON.parse(carritoJSON);
        
     
        verCarrito();
    }
    
}

function agregarCarrito(e) {
    console.log("Producto agregado al carrito");

    let comprar = e.target;
    let cardbody = comprar.parentNode;
    let card = cardbody.parentNode;

    let nombreAccesorio = cardbody.querySelector("h5").innerText;
    let precioAccesorio = cardbody.querySelector("span").innerText;
    let imgAccesorio = card.querySelector("img").src;

  
    let accesorioExistente = carrito.find(item => item.nombre === nombreAccesorio);

    if (accesorioExistente) {
        
        accesorioExistente.cantidad++;
    } else {
       
        let accesorio = {
            nombre: nombreAccesorio,
            precio: precioAccesorio,
            img: imgAccesorio,
            cantidad: 1
        };

        carrito.push(accesorio);
    }

   
    verCarrito();
}


function verCarrito() {
    let tabla = document.getElementById("tbody");
    tabla.innerHTML = "";

    for (let accesorio of carrito) {
        let fila = document.createElement("tr");
        fila.innerHTML = `<td><img src="${accesorio.img}"></td>
                          <td><p>${accesorio.nombre}</p></td>
                          <td>${accesorio.cantidad}</td>
                          <td>${accesorio.precio}</td>
                          <td><button class="btn btn-danger btnBorrarAccesorio">Borrar</button></td>`;
        tabla.append(fila);
    }

    
    let btnBorrar = document.querySelectorAll(".btnBorrarAccesorio");
    for (let btn of btnBorrar) {
        btn.addEventListener("click", borrarAccesorio);
    }
}


function borrarAccesorio(e) {
    e.target.parentNode.parentNode.remove();

    
    let index = carrito.findIndex(item => item.nombre === e.target.parentNode.parentNode.querySelector("p").innerText);

    if (index !== -1) {
        
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
        } else {
            carrito.splice(index, 1);
        }

        
        verCarrito();
    }
}


let btnCompra = document.querySelectorAll(".botonCompra");

for (let boton of btnCompra) {
    boton.addEventListener("click", agregarCarrito);
}
