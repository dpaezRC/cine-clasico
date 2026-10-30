/** @typedef {import("../data.js").Pelicula} Pelicula */

import { PELICULAS } from "../data.js";

/**
 * Busca una película por su id.
 * @param {number} id
 * @returns {Pelicula|undefined} La película o undefined si no existe.
 */
export function obtenerPelicula(id) {
  return PELICULAS.find((pelicula) => pelicula.id === id);
}
