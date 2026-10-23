"use strict";

import { listarPeliculas, obtenerPelicula } from "./catalogo.js";
import * as carrito from "./carrito.js";
import {
  renderizarCatalogo,
  sincronizarBotones,
  renderizarCarrito,
} from "./views/index.js";

const grillaPeliculas = document.getElementById("grilla-peliculas");
const listaCarrito = document.getElementById("lista-carrito");
const carritoVacio = document.getElementById("carrito-vacio");
const totalCarrito = document.getElementById("total-carrito");
const botonVaciar = document.getElementById("vaciar-carrito");

const nodosCarrito = {
  lista: listaCarrito,
  mensajeVacio: carritoVacio,
  total: totalCarrito,
  botonVaciar,
};

function actualizarVistas() {
  renderizarCarrito(nodosCarrito, carrito);
  sincronizarBotones(grillaPeliculas, carrito);
}

function manejarClicAgregar(evento) {
  const boton = evento.target.closest(".btn-agregar");

  if (!boton) {
    return;
  }

  carrito.agregar(Number(boton.dataset.id));
  actualizarVistas();
}

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

function vaciarCarrito() {
  carrito.vaciar();
  actualizarVistas();
}

function inicializar() {
  renderizarCatalogo(grillaPeliculas, listarPeliculas());
  actualizarVistas();
  grillaPeliculas.addEventListener("click", manejarClicAgregar);
  listaCarrito.addEventListener("click", manejarClicCarrito);
  listaCarrito.addEventListener("change", manejarCambioCantidad);
  botonVaciar.addEventListener("click", vaciarCarrito);
}

inicializar();
