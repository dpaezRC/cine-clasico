import { obtenerPelicula } from "../catalogo.js";
import { formatearPrecio } from "../formato.js";

export function crearTarjeta(pelicula) {
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

export function renderizarCatalogo(contenedor, peliculas) {
  const fragmento = document.createDocumentFragment();
  peliculas.forEach((pelicula) => fragmento.append(crearTarjeta(pelicula)));
  contenedor.replaceChildren(fragmento);
}

export function sincronizarBotones(contenedor, carrito) {
  contenedor.querySelectorAll(".btn-agregar").forEach((boton) => {
    const pelicula = obtenerPelicula(Number(boton.dataset.id));

    if (pelicula) {
      boton.disabled = carrito.obtenerCantidad(pelicula.id) >= pelicula.stock;
    }
  });
}
