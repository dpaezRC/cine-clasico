import { obtenerPelicula } from "../services/catalogo.js";
import { formatearPrecio } from "../utils/formato.js";

/** @typedef {import("../data.js").Pelicula} Pelicula */

/**
 * Crea la tarjeta de una película para el catálogo.
 * @param {Pelicula} pelicula
 * @returns {HTMLElement}
 */
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

/**
 * Renderiza el catálogo completo en el contenedor.
 * @param {HTMLElement} contenedor
 * @param {Pelicula[]} peliculas
 * @returns {void}
 */
export function renderizarCatalogo(contenedor, peliculas) {
  const fragmento = document.createDocumentFragment();
  peliculas.forEach((pelicula) => fragmento.append(crearTarjeta(pelicula)));
  contenedor.replaceChildren(fragmento);
}

/**
 * Sincroniza los botones de agregar y deshabilita los que no tienen stock.
 * @param {HTMLElement} contenedor
 * @param {Object} carrito - Módulo de dominio con obtenerCantidad.
 * @returns {void}
 */
export function sincronizarBotones(contenedor, carrito) {
  contenedor.querySelectorAll(".btn-agregar").forEach((boton) => {
    const pelicula = obtenerPelicula(Number(boton.dataset.id));

    if (pelicula) {
      boton.disabled = carrito.obtenerCantidad(pelicula.id) >= pelicula.stock;
    }
  });
}
