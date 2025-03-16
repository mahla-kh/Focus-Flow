let $ = document;
import { updateUncompletedTodos } from "./organizeTodo.js";

// id is index / start from 0
let Todos = [];
let completedTodos = [];

// fun add todo : new elem
// fun add to storage : update the list
//event on todo: add , remove , change style
//the archive btn
//the remaining message
// clear input :)
// add category and time limit

let todoNameInputElem = $.querySelector("#todoAdd-input");
let todoDateInputElem = $.querySelector("#todoDate-input");
let todoListBox = $.querySelector("#todo-list");
let todoSubmitBtn = $.querySelector("#todo-btn-submit");
let emptyInputAlert = $.querySelector("#emptyInput-alert");
let userInputName;
let userInputDate;

todoSubmitBtn.addEventListener("click", () => {
  userInputName = todoNameInputElem.value;
  userInputDate = todoDateInputElem.value;
  if (!userInputName) {
    emptyInputAlert.classList.add("show-input-alert");
    setTimeout(() => {
      emptyInputAlert.classList.remove("show-input-alert");
    }, 3000);
    console.log("false");
    return;
  }
  addTodo(userInputName, userInputDate);
  console.log("true");
});

const addTodo = (userInputName, userInputDate) => {
  let newTodo = {
    id: crypto.randomUUID(),
    todo: userInputName,
    completed: false,
    dueDate: userInputDate,
  };
  Todos.push(newTodo);
  //add to storage
  console.log("todos :", Todos);
  emptyInput();
  showTodos();
  updateUncompletedTodos(Todos, completedTodos);
};

const showTodos = () => {
  todoListBox.innerHTML = "";
  Todos.forEach((todo) => {
    let ischecked;
    if (todo.completed) {
      ischecked = "checked";
    } else {
      ischecked = "";
    }

    todoListBox.innerHTML += `<li class="list-group-item border-0 pl-1 my-2">
                <div class="checkbox checkbox-primary">
                  <input class="todo-input" id="${todo.id}" type="checkbox" ${ischecked}>
                  <label for="${todo.id}">${todo.todo}</label>
                </div>
              </li>`;
  });
  todoCategory();
  addMessage(completedTodos, Todos);
};

const emptyInput = () => {
  todoNameInputElem.value = "";
  todoDateInputElem.value = "";
};

// checkbox adds & removes

const todoCategory = () => {
  let checkboxElems = $.querySelectorAll(".todo-input");

  checkboxElems.forEach((checkboxElem) => {
    console.log(checkboxElem);
    checkboxElem.addEventListener("change", (e) => {
      let todoId = checkboxElem.id;
      let todoObj = Todos.find((todo) => todo.id == todoId);

      if (e.target.checked || checkboxElem.checked) {
        todoObj.completed = true;

        if (!completedTodos.includes(todoObj)) {
          completedTodos.push(todoObj);
        }

        console.log("checked", todoId, todoObj, completedTodos);
      } else {
        if (completedTodos.includes(todoObj)) {
          todoObj.completed = false;
          completedTodos = completedTodos.filter((todo) => todo.id !== todoId);
        }
        console.log("Unchecked", todoObj, completedTodos);
      }
      addMessage(completedTodos, Todos);
      // updateUncompletedTodos()
      updateUncompletedTodos(Todos, completedTodos);
    });
  });
};

let remainingMessage = $.querySelector(".todo-count");
const addMessage = (completedTodos, Todos) => {
  let allTodos = Todos.length;
  let remainings;
  if (allTodos) {
    remainings = allTodos - completedTodos.length;
  }
  if (!remainings) {
    remainingMessage.innerHTML = ` No ToDo Left !`;
    return;
  }
  remainingMessage.innerHTML = `${remainings} From ${allTodos} Left `;
};

// clearing
let clearBtn = $.getElementById("btn-archive");
clearBtn.addEventListener("click", () => {
  completedTodos.forEach((completedTodo) => {
    Todos = Todos.filter((todo) => todo.id !== completedTodo.id);
  });
  console.log(Todos);
  showTodos();
  completedTodos = [];
  addMessage(completedTodos, Todos);
});
