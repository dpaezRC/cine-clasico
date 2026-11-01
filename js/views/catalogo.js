import { crearElemento } from "../utils/dom.js";
import { formatearPrecio } from "../utils/formato.js";

/** @typedef {import("../data.js").Pelicula} Pelicula */

/**
 * Crea la tarjeta de una película para el catálogo.
 * @param {Pelicula} pelicula
 * @param {(id: number) => void} alAgregar - Se invoca al clickear el botón de agregar.
 * @returns {HTMLElement}
 */
function crearTarjeta(pelicula, alAgregar) {
  return crearElemento("article", {
    className: "pelicula",
    hijos: [
      crearElemento("figure", {
        hijos: [
          crearElemento("img", {
            src: pelicula.portada,
            alt: `Poster de ${pelicula.nombre}`,
          }),
          crearElemento("figcaption", {
            textContent: `${pelicula.nombre} (${pelicula.fecha})`,
          }),
        ],
      }),
      crearElemento("p", {
        className: "director",
        textContent: `Director: ${pelicula.director}`,
      }),
      crearElemento("p", {
        className: "descripcion",
        textContent: pelicula.descripcion,
      }),
      crearElemento("p", {
        className: "precio",
        textContent: `Colección DVD: ${formatearPrecio(pelicula.precio)}`,
      }),
      crearElemento("p", {
        className: "stock",
        textContent: `Stock disponible: ${pelicula.stock}`,
      }),
      crearElemento("button", {
        type: "button",
        className: "btn-agregar",
        textContent: "Agregar al carrito",
        dataset: { id: pelicula.id },
        onclick: () => alAgregar(pelicula.id),
      }),
    ],
  });
}

/**
 * Renderiza el catálogo completo en el contenedor.
 * @param {HTMLElement} contenedor
 * @param {Pelicula[]} peliculas
 * @param {Object} acciones
 * @param {(id: number) => void} acciones.alAgregar
 * @returns {void}
 */
export function renderizarCatalogo(contenedor, peliculas, { alAgregar }) {
  contenedor.replaceChildren(
    ...peliculas.map((pelicula) => crearTarjeta(pelicula, alAgregar)),
  );
}

/**
 * Sincroniza los botones de agregar y deshabilita los que alcanzaron el stock.
 * @param {HTMLElement} contenedor
 * @param {Object} carrito - Módulo de dominio con alcanzoStock.
 * @returns {void}
 */
export function sincronizarBotones(contenedor, carrito) {
  contenedor.querySelectorAll(".btn-agregar").forEach((boton) => {
    boton.disabled = carrito.alcanzoStock(Number(boton.dataset.id));
  });
}
