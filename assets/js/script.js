const inputTarea = document.querySelector("#input-tarea");
const btnAgregar = document.querySelector("#btn-agregar");
const listaTareas = document.querySelector("#lista-tareas");
const totalTareas = document.querySelector("#total-tareas");
const tareasRealizadas = document.querySelector("#tareas-realizadas");

const tareas = [
  { id: 1, descripcion: "Estudiar JavaScript", realizada: false },
  { id: 2, descripcion: "Hacer el desafío", realizada: false },
  { id: 3, descripcion: "Subir proyecto a GitHub", realizada: false }
];

function renderTareas() {
  let html = "";

  for (let tarea of tareas) {
    html += `
      <tr>
        <td>${tarea.id}</td>
        <td class="${tarea.realizada ? "realizada" : ""}">${tarea.descripcion}</td>
        <td>
          <input
            class="checkbox-tarea"
            type="checkbox"
            ${tarea.realizada ? "checked" : ""}
            onchange="cambiarEstado(${tarea.id})"
          >
        </td>
        <td>
          <button class="btn-eliminar" onclick="borrar(${tarea.id})">❌</button>
        </td>
      </tr>
    `;
  }

  listaTareas.innerHTML = html;
  totalTareas.textContent = tareas.length;
  tareasRealizadas.textContent = tareas.filter(tarea => tarea.realizada === true).length;
}

btnAgregar.addEventListener("click", function () {
  const descripcionNueva = inputTarea.value.trim();

  if (descripcionNueva === "") {
    return;
  }

  const nuevaTarea = {
    id: Date.now(),
    descripcion: descripcionNueva,
    realizada: false
  };

  tareas.push(nuevaTarea);
  inputTarea.value = "";
  renderTareas();
});

function borrar(id) {
  const index = tareas.findIndex(tarea => tarea.id === id);
  tareas.splice(index, 1);
  renderTareas();
}

function cambiarEstado(id) {
  const tareaEncontrada = tareas.find(tarea => tarea.id === id);
  tareaEncontrada.realizada = !tareaEncontrada.realizada;
  renderTareas();
}

renderTareas();