import { useState } from "react";

export default function TodoList() {
  // Estado para el texto del input
  const [texto, setTexto] = useState("");

  // Estado para el array de tareas
  const [tareas, setTareas] = useState([
    { id: 1, texto: "Aprender useState", completada: false },
    { id: 2, texto: "Hacer el TP", completada: false },
  ]);

  // Agregar tarea: no permite vacías
  const agregarTarea = () => {
    if (texto.trim() === "") return;

    const nuevaTarea = {
      id: Date.now(),      // id único usando el timestamp
      texto: texto,
      completada: false,
    };

    // Actualización inmutable: spread del array anterior + nueva tarea
    setTareas([...tareas, nuevaTarea]);
    setTexto(""); // Limpiar input
  };

  // Marcar como completada / pendiente (toggle)
  const toggleCompletada = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? { ...tarea, completada: !tarea.completada }
          : tarea
      )
    );
  };

  // Eliminar tarea por id
  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const completadas = tareas.filter((t) => t.completada).length;

  return (
    <div className="card">
      <h2 className="card-title">✅ Lista de Tareas</h2>
      <p className="card-subtitle">
        {completadas} de {tareas.length} completadas
      </p>

      {/* Input + botón para agregar */}
      <div className="todo-input-row">
        <input
          className="search-input"
          type="text"
          placeholder="Nueva tarea..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && agregarTarea()}
        />
        <button className="btn-add" onClick={agregarTarea}>
          Agregar
        </button>
      </div>

      <ul className="todo-list">
        {tareas.length === 0 && (
          <li className="no-results">🎉 No hay tareas pendientes</li>
        )}
        {tareas.map((tarea) => (
          <li key={tarea.id} className="todo-item">
            {/* Checkbox para completar */}
            <input
              type="checkbox"
              checked={tarea.completada}
              onChange={() => toggleCompletada(tarea.id)}
              className="todo-checkbox"
            />
            {/* Texto con tachado si está completada */}
            <span className={tarea.completada ? "todo-text done" : "todo-text"}>
              {tarea.texto}
            </span>
            {/* Botón eliminar */}
            <button
              className="btn-delete"
              onClick={() => eliminarTarea(tarea.id)}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
