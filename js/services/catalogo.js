import { PELICULAS } from "../data.js";

const indicePorId = new Map(
  PELICULAS.map((pelicula) => [pelicula.id, pelicula]),
);

export function listarPeliculas() {
  return PELICULAS;
}

export function obtenerPelicula(id) {
  return indicePorId.get(id);
}
