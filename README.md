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
    formato.js
```

- **`data.js`**: fuente de verdad de las películas (id, nombre, precio, stock,
  portada, etc.). No se importa directamente desde las vistas.
- **`services/catalogo.js`**: construye una sola vez un `Map` id → película (no
  exportado). Expone `listarPeliculas()` y `obtenerPelicula(id)`.
- **`services/carrito.js`**: estado del carrito en un `Map` id → cantidad (no
  exportado). No toca `document`, `window` ni el DOM. Expone las operaciones y
  las consultas del dominio.
- **`utils/formato.js`**: `formatearPrecio(precio)` con formato de moneda es-AR
  en ARS.
- **`views/catalogo.js`**: expone `renderizarCatalogo` y `sincronizarBotones`.
  `crearTarjeta` es un helper interno, no un export público. No conoce el
  carrito salvo para deshabilitar botones.
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
`renderizarCatalogo(grillaPeliculas, listarPeliculas())`.

## Invariantes del carrito

- La cantidad de cada película está acotada a `[0, stock]`; el stock es 10.
- Agregar con un id desconocido o con la cantidad ya en el stock no hace nada.
- Restar por debajo de 1 elimina el ítem.
- `fijarCantidad` elimina si la cantidad es ≤ 0 y recorta al stock si la
  supera.
- `normalizarCantidad(valor, stock)` devuelve `null` para valores no finitos;
  en otro caso trunca y recorta a `[0, stock]`.
- Un input vacío o con texto no numérico revierte al valor anterior.
- Los ítems se listan en orden de inserción; se omiten ids inexistentes.
- El total suma `precio × cantidad` y se formatea como moneda es-AR en ARS.
- El estado vive solo en memoria: recargar la página vacía el carrito (no hay
  `localStorage`).
