import { PELICULAS } from "./data.js";
import * as carrito from "./services/carrito.js";
import {
  renderizarCatalogo,
  sincronizarBotones,
} from "./views/catalogo.js";
import { renderizarCarrito } from "./views/carrito.js";

const grillaPeliculas = document.getElementById("grilla-peliculas");

/** @type {import("./views/carrito.js").NodosCarrito} */
const nodosCarrito = {
  lista: document.getElementById("lista-carrito"),
  mensajeVacio: document.getElementById("carrito-vacio"),
  total: document.getElementById("total-carrito"),
  botonVaciar: document.getElementById("vaciar-carrito"),
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
 * Devuelve el id de la película del ítem del carrito que contiene al elemento.
 * @param {Element} elemento - Control dentro de un `.item-carrito`.
 * @returns {number}
 */
function obtenerIdItem(elemento) {
  return Number(elemento.closest(".item-carrito").dataset.id);
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

  if (!boton) {
    return;
  }

  const id = obtenerIdItem(boton);

  if (boton.dataset.accion === "restar") {
    carrito.restar(id);
  } else if (boton.dataset.accion === "sumar") {
    carrito.agregar(id);
  }

  actualizarVistas();
}

/**
 * Aplica la cantidad ingresada en el input del carrito; si no es un número, la revierte.
 * @param {Event} evento
 * @returns {void}
 */
function manejarCambioCantidad(evento) {
  const input = evento.target.closest(".input-cantidad");

  if (!input) {
    return;
  }

  const id = obtenerIdItem(input);
  const cantidad = Number(input.value);

  if (input.value === "" || !Number.isFinite(cantidad)) {
    input.value = String(carrito.obtenerCantidad(id));
    return;
  }

  carrito.fijarCantidad(id, Math.trunc(cantidad));
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
  renderizarCatalogo(grillaPeliculas, PELICULAS);
  actualizarVistas();
  grillaPeliculas.addEventListener("click", manejarClicAgregar);
  nodosCarrito.lista.addEventListener("click", manejarClicCarrito);
  nodosCarrito.lista.addEventListener("change", manejarCambioCantidad);
  nodosCarrito.botonVaciar.addEventListener("click", vaciarCarrito);
}

inicializar();
