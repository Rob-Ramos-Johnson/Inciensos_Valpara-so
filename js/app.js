const carrito = [];
const lista = document.getElementById('carrito-lista');
const total = document.getElementById('total');
const botones = document.querySelectorAll('.agregar-carrito');
const vaciarBtn = document.getElementById('vaciar-carrito');
const finalizarBtn = document.getElementById('finalizar-compra');

botones.forEach(btn => {
  btn.addEventListener('click', () => {
    const nombre = btn.dataset.nombre;
    const precio = parseFloat(btn.dataset.precio);
    carrito.push({ nombre, precio });
    renderCarrito();
  });
});

vaciarBtn.addEventListener('click', () => {
  carrito.length = 0;
  renderCarrito();
});

finalizarBtn.addEventListener('click', () => {
  if(carrito.length === 0) {
    alert('El carrito está vacío.');
    return;
  }

  let mensaje = 'Orden de compra:\n\n';
  carrito.forEach(item => {
    mensaje += `${item.nombre} - $${item.precio.toFixed(2)}\n`;
  });
  mensaje += `\nTotal a pagar: $${calcularTotal().toFixed(2)}\n\nGracias por su compra!`;

  alert(mensaje);
  carrito.length = 0;
  renderCarrito();
});

function renderCarrito() {
  lista.innerHTML = '';
  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '×';
    btnEliminar.title = 'Eliminar producto';
    btnEliminar.addEventListener('click', () => {
      carrito.splice(index, 1);
      renderCarrito();
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });

  total.textContent = calcularTotal().toFixed(2);
}

function calcularTotal() {
  return carrito.reduce((acc, item) => acc + item.precio, 0);
}
