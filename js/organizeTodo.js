// import { UncompletedTodos } from "./َAddTodo.js";
//  ??

// updateUncompletedTodos()

let UncompletedTodos
let orgListElem = document.getElementById("org-list")

export function updateUncompletedTodos(Todos, completedTodos) {
    console.log(Todos)
    if (completedTodos && completedTodos.length > 0) {
        // Filter out completed todos from Todos
        UncompletedTodos = Todos.filter(todo =>
            !completedTodos.some(completedTodo => completedTodo.id === todo.id)
        );
    } else {
        UncompletedTodos = Todos
    }
    orgAddElem()
}


function orgAddElem() {
    orgListElem.innerHTML = ''
    UncompletedTodos.forEach(todo => {
        orgListElem.insertAdjacentHTML('afterbegin', `<li class="list-group-item d-flex justify-content-between align-items-center" data-swapy-item="${todo.id}">
                    <img class="star-icon" src="images/icon/star.svg" alt="important">
                    <span class="fs-5" id="todo-name">${todo.todo}</span>
                    <span id="todo-due">${todo.dueDate}</span>
                    <!-- star fill!! -->
                   </li>`)

    })
    importantStar()
}

console.log(UncompletedTodos)

/////star 


function importantStar() {
    let starTags = document.querySelectorAll('.star-icon')

    starTags.forEach(starTag => {
        starTag.addEventListener('click', () => {
            let currentSrc = starTag.getAttribute('src');
            console.log("click")
            // Toggle the source based on the current state
            if (currentSrc === 'images/icon/star-fill.svg') {
                
                starTag.setAttribute('src', 'images/icon/star.svg'); // Change to unfilled star
            } else {
                starTag.setAttribute('src', 'images/icon/star-fill.svg'); // Change to filled star
            }
        })

    })
}
