import { useState } from "react";

const peliculas = [
  "Batman", "Spider-Man", "Interstellar", "Inception",
  "Avatar", "Titanic", "The Matrix", "Joker"
];

export default function BuscadorPeliculas() {
  // useState guarda el texto que el usuario escribe
  const [busqueda, setBusqueda] = useState("");

  // filter recorre el array y devuelve solo las que coinciden
  const resultados = peliculas.filter((pelicula) =>
    pelicula.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="card">
      <h2 className="card-title">Buscador de Películas</h2>
      <p className="card-subtitle">Escribe para filtrar en tiempo real</p>

      {/* Input controlado: su valor viene del estado */}
      <input
        className="search-input"
        type="text"
        placeholder="Buscar película..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="results-count">
        {busqueda && `${resultados.length} resultado${resultados.length !== 1 ? "s" : ""}`}
      </div>

      <ul className="movie-list">
        {resultados.length > 0 ? (
          resultados.map((pelicula) => (
            <li key={pelicula} className="movie-item">
              <span className="movie-icon"> </span>
              {pelicula}
            </li>
          ))
        ) : (
          <li className="no-results">Sin resultados</li>
        )}
      </ul>
    </div>
  );
}
