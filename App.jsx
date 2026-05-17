import { useState } from "react";
import BuscadorPeliculas from "./BuscadorPeliculas";
import TodoList from "./TodoList";
import "./index.css";

export default function App() {
  // Estado para controlar qué tab está activa
  const [tab, setTab] = useState("buscador");

  return (
    <div className="app">
      <header className="header">
        <h1 className="header-title">React + useState</h1>
        <p className="header-sub">TP Práctico — Ejercicios de estado</p>

        {/* Tabs para cambiar entre componentes */}
        <div className="tabs">
          <button
            className={`tab ${tab === "buscador" ? "tab-active" : ""}`}
            onClick={() => setTab("buscador")}
          >
            Buscador
          </button>
          <button
            className={`tab ${tab === "todo" ? "tab-active" : ""}`}
            onClick={() => setTab("todo")}
          >
            Todo List
          </button>
          <button
            className={`tab ${tab === "ambos" ? "tab-active" : ""}`}
            onClick={() => setTab("ambos")}
          >
            Ver ambos
          </button>
        </div>
      </header>

      <main className="main">
        {/* Renderizado condicional según tab activa */}
        {tab === "buscador" && <BuscadorPeliculas />}
        {tab === "todo" && <TodoList />}
        {tab === "ambos" && (
          <div className="two-col">
            <BuscadorPeliculas />
            <TodoList />
          </div>
        )}
      </main>
    </div>
  );
}
