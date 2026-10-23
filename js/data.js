/**
 * Película del catálogo.
 * @typedef {Object} Pelicula
 * @property {number} id
 * @property {string} nombre
 * @property {string} director
 * @property {string} portada - Ruta relativa al póster.
 * @property {number} fecha - Año de estreno.
 * @property {number} precio - Precio en pesos.
 * @property {number} stock - Unidades disponibles.
 * @property {string} descripcion
 */

/**
 * Catálogo completo de películas.
 * @type {Pelicula[]}
 */
export const PELICULAS = [
  {
    id: 1,
    nombre: "Casablanca",
    director: "Michael Curtiz",
    portada: "assets/images/movies/casablanca.jpg",
    fecha: 1942,
    precio: 25000,
    stock: 10,
    descripcion: `Un clásico romántico ambientado en la Segunda Guerra Mundial. Rick Blaine, dueño de un club nocturno en Casablanca, se reencuentra con su antiguo amor Ilsa, quien llega con su esposo buscando escapar de los nazis.`,
  },
  {
    id: 2,
    nombre: "El Padrino",
    director: "Francis Ford Coppola",
    portada: "assets/images/movies/el-padrino.jpg",
    fecha: 1972,
    precio: 35000,
    stock: 10,
    descripcion: `La épica historia de la familia Corleone, una de las más poderosas dinastías del crimen organizado en América. Dirigida por Francis Ford Coppola, esta obra maestra redefinió el género de gángsters.`,
  },
  {
    id: 3,
    nombre: "Ciudadano Kane",
    director: "Orson Welles",
    portada: "assets/images/movies/ciudadano-kane.jpg",
    fecha: 1941,
    precio: 22000,
    stock: 10,
    descripcion: `Considerada por muchos como la mejor película de la historia. Orson Welles dirige y protagoniza esta innovadora historia sobre la vida y muerte del magnate de la prensa Charles Foster Kane.`,
  },
  {
    id: 4,
    nombre: "Psicosis",
    director: "Alfred Hitchcock",
    portada: "assets/images/movies/psicosis.jpg",
    fecha: 1960,
    precio: 20000,
    stock: 10,
    descripcion: `El maestro del suspenso Alfred Hitchcock presenta esta escalofriante historia de terror psicológico. Marion Crane se hospeda en el siniestro Motel Bates, donde conoce al perturbado Norman Bates.`,
  },
  {
    id: 5,
    nombre: "Cantando Bajo la Lluvia",
    director: "Gene Kelly y Stanley Donen",
    portada: "assets/images/movies/cantando-bajo-la-lluvia.jpg",
    fecha: 1952,
    precio: 18000,
    stock: 10,
    descripcion: `El musical más querido de Hollywood. Gene Kelly protagoniza esta alegre comedia sobre la transición del cine mudo al sonoro, con números musicales inolvidables que han perdurado por generaciones.`,
  },
  {
    id: 6,
    nombre: "Lo que el Viento se Llevó",
    director: "Victor Fleming",
    portada: "assets/images/movies/lo-que-el-viento-se-llevo.jpg",
    fecha: 1939,
    precio: 30000,
    stock: 10,
    descripcion: `La épica romántica ambientada en la Guerra Civil estadounidense. Scarlett O'Hara lucha por sobrevivir y mantener su amada plantación Tara mientras vive un tumultuoso romance con Rhett Butler.`,
  },
  {
    id: 7,
    nombre: "Tiempos Modernos",
    director: "Charles Chaplin",
    portada: "assets/images/movies/tiempos-modernos.jpg",
    fecha: 1936,
    precio: 15000,
    stock: 10,
    descripcion: `Charlie Chaplin en su última aparición como el icónico vagabundo. Una brillante sátira sobre la industrialización y sus efectos deshumanizantes en la clase trabajadora durante la Gran Depresión.`,
  },
  {
    id: 8,
    nombre: "El Mago de Oz",
    director: "Victor Fleming",
    portada: "assets/images/movies/el-mago-de-oz.jpg",
    fecha: 1939,
    precio: 20000,
    stock: 10,
    descripcion: `Dorothy y su perrito Toto son transportados por un tornado al mágico mundo de Oz. Un clásico familiar que introdujo el revolucionario uso del Technicolor y canciones inmortales como "Over the Rainbow".`,
  },
];
