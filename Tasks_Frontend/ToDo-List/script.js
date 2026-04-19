const input = document.querySelector("input");
const dateInput = document.querySelector('input[type="date"]');
const button = document.querySelector("button");
const table = document.querySelector("table");
const errorMsg = document.querySelector(".error-message");

let tasks = [];
loadTasks();

button.addEventListener("click", () => {
    const taskText = input.value;
    const dateValue = dateInput.value;

    if (taskText === "" || dateValue === "") {
        errorMsg.textContent = "Please fill task and deadline!";
        return;
    }
    errorMsg.textContent = "";

    const task = {
        text: taskText,
        date: dateValue,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks(task);


    input.value = "";
    dateInput.value = "";
});

//-----------------------------------------------

function saveTasks() {
    localStorage.setItem(`tasks`, JSON.stringify(tasks));
}

//-----------------------------------------------

function loadTasks() {
    const data = localStorage.getItem("tasks");

    if (data) {
        tasks = JSON.parse(data);
        tasks.forEach(task => renderTasks(task));
    }
}

//-----------------------------------------------

function renderTasks(task) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${task.text}</td>
        <td>${task.date}</td>
        <td><input type="checkbox" ${task.completed ? "checked" : ""}></td>
        <td><button class="delete-btn">delete</button></td>
    `;

    const deleteBtn = row.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        row.remove();

        tasks = tasks.filter(t => t !== task);
        saveTasks();
    });

    const checkbox = row.querySelector("input[type='checkbox']");

    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        if (checkbox.checked) {
            row.classList.add("completed");
        } else {
            row.classList.remove("completed");
        }

        saveTasks();
    });

    table.appendChild(row);
}