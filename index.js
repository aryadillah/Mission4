let nama = prompt('masukkan nama anda');
let jabatan = prompt('masukkan jabatan anda');
document.getElementById('nama').textContent = nama;
document.getElementById('jabatan').textContent = jabatan;

tanggalSekarang();
const input = document.getElementById("input");
const listBelum = document.getElementById("belumDone");
const listDone = document.getElementById("done");
const prioritas = document.getElementById("prioritas")
let allTodo = [];
const dateInput = document.getElementById("date");
dateInput.valueAsDate = new Date();
document.getElementById('button').onclick = function () {
    addTodo();
    input.value = "";
}
document.getElementById('delAll').onclick = function () {
    allTodo = [];
    updateList();
    updateListDone();
}
function addTodo() {
    if (input.value !== "") {
        const todoText = input.value;
        let tanggalSekarang = dateInput.value;
        let prioritasTerpilih = prioritas.value;
        const todoObject = {
            text: todoText,
            prioritasObject: prioritasTerpilih,
            tanggalObject: tanggalSekarang,
            completed: false
        }
        allTodo.push(todoObject);
        updateList();
    }
}

function updateList() {
    listBelum.innerHTML = "";
    allTodo.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        listBelum.append(todoItem);
    })
}
function updateListDone() {
    listDone.innerHTML = "";
    allTodo.forEach((todo, todoIndex) => {
        todoDone = document.createElement("li");
        todoDone.innerHTML = `${todo.text}`;
        if (todo.completed == false) {
            todoDone.style.display = "none";
        }
        listDone.append(todoDone);
    })
}
function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLi = document.createElement("li");
    const todoText = todo.text;
    const todoPrioritas = todo.prioritasObject;
    const todoTanggal = todo.tanggalObject;
    todoLi.className = "todo";
    todoLi.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label for="${todoId}" class="custom-checkbox"><svg fill= "transparent" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="20px" height="20px"><path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z"/></svg></label>
        <label for="${todoId}" class="text">${todoText}</label>
        <p>${todoPrioritas}</p>
        <p>${todoTanggal}</p>
        <button class="hapus"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="20px" height="20px"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"/></svg></button>
        `;
    const deleteButton = todoLi.querySelector(".hapus");
    deleteButton.addEventListener("click", () => {
        deleteTodoItem(todoIndex);
    })
    const checkbox = todoLi.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTodo[todoIndex].completed = checkbox.checked;
        updateListDone();
    })
    checkbox.checked = todo.completed;
    return todoLi;
}
function deleteTodoItem(todoIndex) {
    allTodo = allTodo.filter((_, i) => i !== todoIndex);
    updateList();
    updateListDone();
}

function tanggalSekarang() {
    const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    let today = new Date();
    document.getElementById("tanggalSekarang").innerHTML = (hari[today.getDay()] + " " + today.getDate() + " " + bulan[today.getMonth()] + " " + today.getFullYear());

}