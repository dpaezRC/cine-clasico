# Cine Clásico

Sitio estático en JavaScript vanilla (sin `package.json` ni bundler) que muestra
una colección de películas clásicas y permite armar un carrito de compras en
memoria.

## Cómo servir el sitio

Los módulos ES nativos requieren cargarse por HTTP (no funcionan con
`file://`). Desde la raíz del proyecto:

```bash
python3 -m http.server 8000
```

Luego abrir <http://localhost:8000/>.

Cualquier servidor estático equivalente (`npx serve`, `http-server`, etc.)
también sirve.

## Mapa de módulos

```
js/
  app.js
  data.js
  services/
    catalogo.js
    carrito.js
  views/
    catalogo.js
    carrito.js
  utils/
    dom.js
    formato.js
```

- **`data.js`**: fuente de verdad de las películas (id, nombre, precio, stock,
  portada, etc.). Lo importan `services/catalogo.js` y `app.js` (para el render
  inicial); las vistas no lo importan.
- **`services/catalogo.js`**: busca en `PELICULAS` con `find`. Expone
  `obtenerPelicula(id)`.
- **`services/carrito.js`**: estado del carrito en un array de
  `{ id, cantidad }` (no exportado), actualizado con `map`, `filter` y spread. No toca `document`, `window` ni el DOM. Expone las operaciones y
  las consultas del dominio, incluida `alcanzoStock(id)`, la única regla que
  decide si una película llegó a su stock.
- **`utils/dom.js`**: `crearElemento(etiqueta, { dataset, hijos, ...propiedades })`
  crea un elemento, le asigna las propiedades (incluida `ariaLabel`) y los
  atributos `data-*`, y le agrega los hijos. Las vistas arman todo su DOM con
  esta función.
- **`utils/formato.js`**: `formatearPrecio(precio)` con formato de moneda es-AR
  en ARS.
- **`views/catalogo.js`**: expone `renderizarCatalogo` y `sincronizarBotones`.
  `crearTarjeta` es un helper interno, no un export público. No conoce el
  carrito salvo para deshabilitar botones con `alcanzoStock`.
- **`views/carrito.js`**: expone `renderizarCarrito`. `crearItem` es un helper
  interno, no un export público. Recibe un objeto con las referencias
  `{ lista, mensajeVacio, total, botonVaciar }`.
- **`app.js`**: toma las referencias del DOM, conecta los eventos, llama al
  dominio y vuelve a renderizar. No crea elementos ni aplica reglas de negocio.

## Flujo

```
evento (click / change)
        │
        ▼
   app.js  ── invoca ──▶  services/carrito.js (dominio)
        │                      │
        │                      ▼
        │              cambia el estado
        │
        ▼
actualizarVistas()
   ├─ views/carrito.js   → renderizarCarrito(nodos, carrito)
   └─ views/catalogo.js  → sincronizarBotones(contenedor, carrito)
```

El catálogo se renderiza una sola vez al iniciar con
`renderizarCatalogo(grillaPeliculas, PELICULAS)`.

## Invariantes del carrito

- La cantidad de cada película está acotada a `[0, stock]`; el stock es 10.
- Agregar con un id desconocido o con la cantidad ya en el stock no hace nada.
- Restar por debajo de 1 elimina el ítem.
- `fijarCantidad` elimina si la cantidad es ≤ 0 y recorta al stock si la
  supera.
- `alcanzoStock(id)` deshabilita tanto el botón de agregar del catálogo como el
  de sumar del carrito; devuelve `false` si la película no existe.
- Un input vacío o con texto no numérico revierte al valor anterior. Cualquier
  otro valor se trunca a entero y se aplica con `fijarCantidad`.
- Los ítems se listan en orden de inserción; se omiten ids inexistentes.
- El total suma `precio × cantidad` y se formatea como moneda es-AR en ARS.
- El estado vive solo en memoria: recargar la página vacía el carrito (no hay
  `localStorage`).
