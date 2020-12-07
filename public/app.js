import Product from "./src/Product.js"

window.onload = function () {

    //Read
    let productList = [ new Product("Tablet", 5000, 1),
                        new Product("Laptop", 13000, 2),
                        new Product("Smartphone", 8000,3),
                        new Product("TV", 9000,4)];

    let $items = document.querySelector('#items');
    let carrito = [];
    let qty = [];
    let total = 0;
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total');
    let $buttonClear = document.querySelector('#button-clear');
    let $buttonNew = document.querySelector('#button-new');
    let $buttonDelete = document.querySelector('#button-delete');
    let $buttonMssg = document.querySelector('#button-mssg');
    let $buttonDate = document.querySelector('#button-date');

    // Funciones
    function renderItems(prod) {
        // Estructura
        let miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-md-4');
        // Body
        let miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        let miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = prod.name;
        // Precio
        let miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = '$' + prod.price;
        // Boton 
        let miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', prod.id);
        miNodoBoton.addEventListener('click', addCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        $items.appendChild(miNodo);

        qty.push(0);
    }
    

    //Delete
    function deleteItem( ){
        let name = prompt("Nombre del producto: ");

        let id = -1;

        for(let prod of productList){
            if(prod.name === name){
                id = prod.id;
            }
        }

        if ( id - 1 !== -1) {
            qty.splice( id - 1, 1 );
        }

        productList = productList.filter(function (prod) {
            return prod.id !== id;
        });

        carrito = carrito.filter(function (carritoId) {
            return carritoId.id !== id;
        });

        $items.textContent = '';

        for (let prod of productList) {
            renderItems(prod);
        }

        renderizarCarrito();
        calcularTotal();
    }

    function addCarrito () {
        // Anyadimos el Nodo a nuestro carrito
        let id = this.getAttribute('marcador');
        carrito.push(productList[id - 1]);
        qty[id - 1] += 1;
        // Calculo el total
        calcularTotal();
        // Renderizamos el carrito 
        renderizarCarrito();
    }

    function renderizarCarrito() {
        // Vaciamos todo el html
        $carrito.textContent = '';
        // Quitamos los duplicados
        let carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach(function (item, indice) {

            // Creamos el nodo del item del carrito
            let miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${qty[item.id - 1]} x ${item.name} - ${item.price}€`;
            // Boton de borrar
            let miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.setAttribute('item', item.id);
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            $carrito.appendChild(miNodo);
        })
    }

    function borrarItemCarrito() {
        // Obtenemos el producto ID que hay en el boton pulsado
        let id = parseInt(this.getAttribute('item'));
        // Borramos todos los productos
        qty[id - 1] = 0 
        carrito = carrito.filter(function (carritoId) {
            return carritoId.id !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Calculamos de nuevo el precio
        calcularTotal();
    }

    function calcularTotal() {
        // Limpiamos precio anterior
        total = 0;

        // Recorremos el array del carrito
        for (let item of carrito) {
            // De cada elemento obtenemos su precio
            total = total + item.price;

        }
        // Formateamos el total para que solo tenga dos decimales
        let totalDosDecimales = total.toFixed(2);
        // Renderizamos el precio en el HTML
        $total.textContent = totalDosDecimales;
    }

    function clear() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        calcularTotal();
    }


    //Create
    function newProduct(){
        let name = prompt("Nombre del producto: ");
        let price = parseFloat(prompt("Precio del producto: "));

        let prod = new Product(name, price, productList.length + 1);

        productList.push(prod);
        renderItems(prod);
    }

    function mssg(){
        console.log("Éste es un mensaje en consola.");
    }

    function date(){
        let date=new Date();

        let hora=date.getHours();
        let minutos=date.getMinutes();
        let segundos=date.getSeconds();


        alert("Son las "+ hora + " : " +minutos + " : " + segundos + " del " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
    
    }

    // Eventos
    $buttonClear .addEventListener('click', clear);
    $buttonNew   .addEventListener('click', newProduct);
    $buttonDelete  .addEventListener('click', deleteItem);
    $buttonMssg  .addEventListener('click', mssg);
    $buttonDate  .addEventListener('click', date);


    // Inicio
    alert("¡Bienvenidas, mujeres emprendedoras!");
    confirm(" ¿Deseas saber acerca de autonomía económica de las mujeres?");
    let nombre = prompt("¿Cuál es tu nombre?");
    alert("Hola, " + nombre + ", te invitamos a ser emprendedora y a desarrollar tu autonomía económica.");
    
    for (let prod of productList) {
        renderItems(prod);
    }
}