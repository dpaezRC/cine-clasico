"use strict";

import { PELICULAS } from "./data.js";

const carrito = new Map();
const catalogoPorId = new Map(
  PELICULAS.map((pelicula) => [pelicula.id, pelicula]),
);

const grillaPeliculas = document.getElementById("grilla-peliculas");
const listaCarrito = document.getElementById("lista-carrito");
const carritoVacio = document.getElementById("carrito-vacio");
const totalCarrito = document.getElementById("total-carrito");
const botonVaciar = document.getElementById("vaciar-carrito");

function formatearPrecio(precio) {
  return `$${precio.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;
}

function crearTarjeta(pelicula) {
  const articulo = document.createElement("article");
  articulo.className = "pelicula";

  const figura = document.createElement("figure");
  const imagen = document.createElement("img");
  imagen.src = pelicula.portada;
  imagen.alt = `Poster de ${pelicula.nombre}`;
  const pieFigura = document.createElement("figcaption");
  pieFigura.textContent = `${pelicula.nombre} (${pelicula.fecha})`;
  figura.append(imagen, pieFigura);

  const director = document.createElement("p");
  director.className = "director";
  director.textContent = `Director: ${pelicula.director}`;

  const descripcion = document.createElement("p");
  descripcion.className = "descripcion";
  descripcion.textContent = pelicula.descripcion;

  const precio = document.createElement("p");
  precio.className = "precio";
  precio.textContent = `Colección DVD: ${formatearPrecio(pelicula.precio)}`;

  const stock = document.createElement("p");
  stock.className = "stock";
  stock.textContent = `Stock disponible: ${pelicula.stock}`;

  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "btn-agregar";
  boton.dataset.id = String(pelicula.id);
  boton.textContent = "Agregar al carrito";

  articulo.append(figura, director, descripcion, precio, stock, boton);
  return articulo;
}

function renderizarPeliculas() {
  const fragmento = document.createDocumentFragment();
  PELICULAS.forEach((pelicula) => fragmento.append(crearTarjeta(pelicula)));
  grillaPeliculas.replaceChildren(fragmento);
  sincronizarBotonesAgregar();
}

function crearItemCarrito(pelicula, cantidad) {
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
  botonRestar.setAttribute("aria-label", `Quitar una unidad de ${pelicula.nombre}`);
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
  botonSumar.setAttribute("aria-label", `Agregar una unidad de ${pelicula.nombre}`);
  botonSumar.textContent = "+";
  botonSumar.disabled = cantidad >= pelicula.stock;

  controles.append(botonRestar, inputCantidad, botonSumar);
  item.append(nombre, controles);
  return item;
}

function calcularTotal() {
  let total = 0;

  carrito.forEach((cantidad, id) => {
    const pelicula = catalogoPorId.get(id);
    if (pelicula) {
      total += pelicula.precio * cantidad;
    }
  });

  return total;
}

function renderizarCarrito() {
  const fragmento = document.createDocumentFragment();

  carrito.forEach((cantidad, id) => {
    const pelicula = catalogoPorId.get(id);
    if (pelicula) {
      fragmento.append(crearItemCarrito(pelicula, cantidad));
    }
  });

  listaCarrito.replaceChildren(fragmento);
  carritoVacio.hidden = carrito.size > 0;
  botonVaciar.disabled = carrito.size === 0;
  totalCarrito.textContent = formatearPrecio(calcularTotal());
}

function normalizarCantidad(valor, stock) {
  if (!Number.isFinite(valor)) {
    return null;
  }

  return Math.min(Math.max(Math.trunc(valor), 0), stock);
}

function actualizarCantidad(id, cantidad) {
  const pelicula = catalogoPorId.get(id);

  if (!pelicula) {
    return;
  }

  if (cantidad <= 0) {
    carrito.delete(id);
  } else {
    carrito.set(id, Math.min(cantidad, pelicula.stock));
  }

  renderizarCarrito();
  sincronizarBotonesAgregar();
}

function agregarAlCarrito(id) {
  const pelicula = catalogoPorId.get(id);

  if (!pelicula) {
    return;
  }

  const cantidadActual = carrito.get(id) || 0;

  if (cantidadActual >= pelicula.stock) {
    return;
  }

  actualizarCantidad(id, cantidadActual + 1);
}

function vaciarCarrito() {
  carrito.clear();
  renderizarCarrito();
  sincronizarBotonesAgregar();
}

function sincronizarBotonesAgregar() {
  grillaPeliculas.querySelectorAll(".btn-agregar").forEach((boton) => {
    const id = Number(boton.dataset.id);
    const pelicula = catalogoPorId.get(id);

    if (pelicula) {
      const cantidad = carrito.get(id) || 0;
      boton.disabled = cantidad >= pelicula.stock;
    }
  });
}

function manejarClicAgregar(evento) {
  const boton = evento.target.closest(".btn-agregar");

  if (boton) {
    agregarAlCarrito(Number(boton.dataset.id));
  }
}

function manejarClicCarrito(evento) {
  const boton = evento.target.closest("button[data-accion]");
  const item = boton ? boton.closest(".item-carrito") : null;

  if (!boton || !item) {
    return;
  }

  const id = Number(item.dataset.id);

  if (boton.dataset.accion === "restar") {
    actualizarCantidad(id, (carrito.get(id) || 0) - 1);
  } else if (boton.dataset.accion === "sumar") {
    agregarAlCarrito(id);
  }
}

function manejarCambioCantidad(evento) {
  const input = evento.target.closest(".input-cantidad");
  const item = input ? input.closest(".item-carrito") : null;

  if (!input || !item) {
    return;
  }

  const id = Number(item.dataset.id);
  const pelicula = catalogoPorId.get(id);
  const cantidadActual = carrito.get(id);

  if (!pelicula || cantidadActual === undefined) {
    return;
  }

  const valor = input.value.trim();
  const cantidad =
    valor === "" ? null : normalizarCantidad(Number(valor), pelicula.stock);

  if (cantidad === null) {
    input.value = String(cantidadActual);
    return;
  }

  actualizarCantidad(id, cantidad);
}

function inicializar() {
  renderizarPeliculas();
  renderizarCarrito();
  grillaPeliculas.addEventListener("click", manejarClicAgregar);
  listaCarrito.addEventListener("click", manejarClicCarrito);
  listaCarrito.addEventListener("change", manejarCambioCantidad);
  botonVaciar.addEventListener("click", vaciarCarrito);
}

inicializar();
