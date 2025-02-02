import { createStore } from "https://cdn.skypack.dev/redux";
import taskReducer from "./taskReducer.js";
import {
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK,
  CALCULATE_TOTAL_TASKS,
} from "./actions.js";

const store = createStore(
  taskReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const taskList = document.querySelector("#taskList");
const totalTasksDisplay = document.querySelector("#totalTasks");
const addTaskBtn = document.querySelector("#addtask");
const removeTaskBtn = document.querySelector("#removeTaskBtn");
const taskNameField = document.querySelector("#taskNameField");
const taskDescriptionField = document.querySelector("#taskDescriptionField");
const taskIdField = document.querySelector("#taskIdField");

let taskIdCounter = 1;

function renderTasks() {
  const state = store.getState();
  taskList.innerHTML = "";

  state.tasks.forEach((task) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      store.dispatch({ type: TOGGLE_TASK, payload: { id: task.id } });
    });

    li.appendChild(checkbox);
    li.appendChild(
      document.createTextNode(`${task.id}. ${task.name}: ${task.description}`)
    );
    li.style.textDecoration = task.completed ? "line-through" : "none";
    taskList.appendChild(li);
  });
}

function updateTotalTasks() {
  const state = store.getState();
  totalTasksDisplay.textContent = `Total Tasks: ${state.totalTasks}`;
}

addTaskBtn.addEventListener("click", () => {
  const task = {
    id: taskIdCounter++,
    name: taskNameField.value,
    description: taskDescriptionField.value,
  };

  store.dispatch({ type: ADD_TASK, payload: task });
  store.dispatch({ type: CALCULATE_TOTAL_TASKS });

  taskNameField.value = "";
  taskDescriptionField.value = "";
});

removeTaskBtn.addEventListener("click", () => {
  const idToRemove = Number(taskIdField.value);
  store.dispatch({ type: REMOVE_TASK, payload: { id: idToRemove } });
  store.dispatch({ type: CALCULATE_TOTAL_TASKS });

  taskIdField.value = "";
});

store.subscribe(() => {
  console.log("Store Updated: ", store.getState());
  renderTasks();
  updateTotalTasks();
});

renderTasks();
updateTotalTasks();
