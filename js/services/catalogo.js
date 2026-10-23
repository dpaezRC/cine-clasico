/** @typedef {import("../data.js").Pelicula} Pelicula */

import { PELICULAS } from "../data.js";

const indicePorId = new Map(
  PELICULAS.map((pelicula) => [pelicula.id, pelicula]),
);

/**
 * Devuelve el catálogo completo de películas.
 * @returns {Pelicula[]} Catálogo completo.
 */
export function listarPeliculas() {
  return PELICULAS;
}

/**
 * Busca una película por su id.
 * @param {number} id
 * @returns {Pelicula|undefined} La película o undefined si no existe.
 */
export function obtenerPelicula(id) {
  return indicePorId.get(id);
}
