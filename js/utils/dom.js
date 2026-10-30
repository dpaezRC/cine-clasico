/**
 * Crea un elemento del DOM con sus propiedades, atributos data-* e hijos.
 * @param {string} etiqueta
 * @param {Object} [opciones] - Propiedades del elemento (className, textContent, ariaLabel, etc.).
 * @param {Object<string, string|number>} [opciones.dataset] - Atributos data-*.
 * @param {Node[]} [opciones.hijos] - Nodos que se agregan dentro del elemento.
 * @returns {HTMLElement}
 */
export function crearElemento(
  etiqueta,
  { dataset = {}, hijos = [], ...propiedades } = {},
) {
  const elemento = Object.assign(document.createElement(etiqueta), propiedades);
  Object.assign(elemento.dataset, dataset);
  elemento.append(...hijos);
  return elemento;
}
