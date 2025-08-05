const carrito = [];
const lista = document.getElementById('carrito-lista');
const total = document.getElementById('total');
const botones = document.querySelectorAll('.agregar-carrito');
const vaciarBtn = document.getElementById('vaciar-carrito');

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

function renderCarrito() {
  lista.innerHTML = '';
  let totalCompra = 0;
  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');

    li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'X';
    btnEliminar.title = 'Eliminar producto';
    btnEliminar.addEventListener('click', () => {
      carrito.splice(index, 1);
      renderCarrito();
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);
    totalCompra += item.precio;
  });
  total.textContent = totalCompra.toFixed(2);
}
