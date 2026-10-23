import { formatearPrecio } from "../formato.js";

export function crearItem(pelicula, cantidad) {
  const item = document.createElement("li");
  item.className = "item-carrito";
  item.dataset.id = String(pelicula.id);

  const nombre = document.createElement("span");
  nombre.className = "nombre-item";
  nombre.textContent = pelicula.nombre;

  const controles = document.createElement("div");
  controles.className = "controles-cantidad";

  const botonRestar = document.createElement("button");
  botonRestar.type = "button";
  botonRestar.dataset.accion = "restar";
  botonRestar.setAttribute(
    "aria-label",
    `Quitar una unidad de ${pelicula.nombre}`,
  );
  botonRestar.textContent = "−";

  const inputCantidad = document.createElement("input");
  inputCantidad.type = "number";
  inputCantidad.className = "input-cantidad";
  inputCantidad.min = "0";
  inputCantidad.max = String(pelicula.stock);
  inputCantidad.step = "1";
  inputCantidad.value = String(cantidad);
  inputCantidad.dataset.accion = "cantidad";
  inputCantidad.setAttribute("aria-label", `Cantidad de ${pelicula.nombre}`);

  const botonSumar = document.createElement("button");
  botonSumar.type = "button";
  botonSumar.dataset.accion = "sumar";
  botonSumar.setAttribute(
    "aria-label",
    `Agregar una unidad de ${pelicula.nombre}`,
  );
  botonSumar.textContent = "+";
  botonSumar.disabled = cantidad >= pelicula.stock;

  controles.append(botonRestar, inputCantidad, botonSumar);
  item.append(nombre, controles);
  return item;
}

export function renderizarCarrito(nodos, carrito) {
  const fragmento = document.createDocumentFragment();

  carrito.obtenerItems().forEach(({ pelicula, cantidad }) => {
    fragmento.append(crearItem(pelicula, cantidad));
  });

  nodos.lista.replaceChildren(fragmento);
  nodos.mensajeVacio.hidden = !carrito.estaVacio();
  nodos.botonVaciar.disabled = carrito.estaVacio();
  nodos.total.textContent = formatearPrecio(carrito.calcularTotal());
}
