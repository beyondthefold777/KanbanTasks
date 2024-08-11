// Retrieve tasks and nextId from localStorage
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
	let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;


// Todo: create a function to generate a unique task id
 function generateTaskId() {
    let currentId = nextId;
    nextId++;
    localStorage.setItem("nextId", nextId);
    return currentId;
  

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    // here we have our dynamically created task card
    let taskCard = `<div class="card task-card mb-3" id="task-${task.id}">
                      <div class="card-body">
                        <h5 class="card-title">${task.title}</h5>
                        <p class="card-text">${task.description}</p>
                        <p class="card-text">Deadline: ${task.deadline}</p>
                        <button class="btn btn-danger delete-btn">Delete</button>
                      </div>
                    </div>`;
    return taskCard;
  }
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $('#todo-cards').html('');
    $('#in-progress-cards').html('');
    $('#done-cards').html('');

    taskList.forEach(task => {
        let taskCard = createTaskCard(task);
        if (task.status === 'To Do') {
            $('#todo-cards').append(taskCard);
        } else if (task.status === 'In Progress') {
            $('#in-progress-cards').append(taskCard);
        } else if (task.status === 'Done') {
            $('#done-cards').append(taskCard);
        }
    });

    $('.task-card').draggable({
        revert: "invalid",
        helper: "clone",
        cursor: "move"
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
