"use strict";

import { listarPeliculas, obtenerPelicula } from "./services/catalogo.js";
import * as carrito from "./services/carrito.js";
import {
  renderizarCatalogo,
  sincronizarBotones,
} from "./views/catalogo.js";
import { renderizarCarrito } from "./views/carrito.js";

const grillaPeliculas = document.getElementById("grilla-peliculas");
const listaCarrito = document.getElementById("lista-carrito");
const carritoVacio = document.getElementById("carrito-vacio");
const totalCarrito = document.getElementById("total-carrito");
const botonVaciar = document.getElementById("vaciar-carrito");

/** @type {import("./views/carrito.js").NodosCarrito} */
const nodosCarrito = {
  lista: listaCarrito,
  mensajeVacio: carritoVacio,
  total: totalCarrito,
  botonVaciar,
};

/**
 * Re-renderiza el carrito y sincroniza los botones del catálogo.
 * @returns {void}
 */
function actualizarVistas() {
  renderizarCarrito(nodosCarrito, carrito);
  sincronizarBotones(grillaPeliculas, carrito);
}

/**
 * Agrega al carrito la película del botón clickeado.
 * @param {MouseEvent} evento
 * @returns {void}
 */
function manejarClicAgregar(evento) {
  const boton = evento.target.closest(".btn-agregar");

  if (!boton) {
    return;
  }

  carrito.agregar(Number(boton.dataset.id));
  actualizarVistas();
}

/**
 * Aplica sumar o restar según el botón clickeado en el carrito.
 * @param {MouseEvent} evento
 * @returns {void}
 */
function manejarClicCarrito(evento) {
  const boton = evento.target.closest("button[data-accion]");
  const item = boton ? boton.closest(".item-carrito") : null;

  if (!boton || !item) {
    return;
  }

  const id = Number(item.dataset.id);

  if (boton.dataset.accion === "restar") {
    carrito.restar(id);
  } else if (boton.dataset.accion === "sumar") {
    carrito.agregar(id);
  }

  actualizarVistas();
}

/**
 * Aplica la cantidad ingresada en el input del carrito.
 * @param {Event} evento
 * @returns {void}
 */
function manejarCambioCantidad(evento) {
  const input = evento.target.closest(".input-cantidad");
  const item = input ? input.closest(".item-carrito") : null;

  if (!input || !item) {
    return;
  }

  const id = Number(item.dataset.id);
  const pelicula = obtenerPelicula(id);
  const cantidadActual = carrito.obtenerCantidad(id);

  if (!pelicula || cantidadActual === 0) {
    return;
  }

  const valor = input.value.trim();
  const cantidad =
    valor === ""
      ? null
      : carrito.normalizarCantidad(Number(valor), pelicula.stock);

  if (cantidad === null) {
    input.value = String(cantidadActual);
    return;
  }

  carrito.fijarCantidad(id, cantidad);
  actualizarVistas();
}

/**
 * Vacía el carrito y actualiza las vistas.
 * @returns {void}
 */
function vaciarCarrito() {
  carrito.vaciar();
  actualizarVistas();
}

/**
 * Realiza el render inicial y registra los listeners.
 * @returns {void}
 */
function inicializar() {
  renderizarCatalogo(grillaPeliculas, listarPeliculas());
  actualizarVistas();
  grillaPeliculas.addEventListener("click", manejarClicAgregar);
  listaCarrito.addEventListener("click", manejarClicCarrito);
  listaCarrito.addEventListener("change", manejarCambioCantidad);
  botonVaciar.addEventListener("click", vaciarCarrito);
}

inicializar();
