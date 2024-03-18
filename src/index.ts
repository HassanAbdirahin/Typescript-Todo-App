import { v4 as uuidV4 } from "uuid";
console.log(uuidV4());

type Task = {
  id: string;
  title: string;
  isComplete: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("todo-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#todo-title");

const tasks: Task[] = loadTasks();

tasks.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!input?.value) {
    return;
  }

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    isComplete: false,
    createdAt: new Date(),
  };

  // add task to arr
  tasks.push(newTask);

  addListItem(newTask);

  // save to Local Storage
  saveTasks();

  input.value = "";
});

function addListItem(task: Task): void {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.isComplete = !task.isComplete;
    console.log(tasks);
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.isComplete;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON === null) return [];
  return JSON.parse(taskJSON);
}
