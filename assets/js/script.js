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
function handleAddTask(event) {
    event.preventDefault();

    let title = $('#title').val();
    let description = $('#description').val();
    let deadline = $('#deadline').val();

    let newTask = {
        id: generateTaskId(),
        title: title,
        description: description,
        deadline: deadline,
        status: 'To Do'
    };

    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    renderTaskList();

    $('#taskForm').trigger("reset");
    $('#formModal').modal('hide');
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    let taskId = $(event.target).closest('.task-card').attr('id').split('-')[1];
    taskList = taskList.filter(task => task.id != taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    let taskId = ui.draggable.attr('id').split('-')[1];
    let newStatus = $(this).attr('id');

    taskList.forEach(task => {
        if (task.id == taskId) {
            task.status = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // Initialize taskList and nextId if they don't exist
    if (!taskList) {
        taskList = [];
    }
    if (!nextId) {
        nextId = 1;
    }

    // Render initial task list
    renderTaskList();

    // Add event listener for form submission
    $('#taskForm').on('submit', handleAddTask);

    // Add event listener for delete buttons
    $(document).on('click', '.delete-btn', handleDeleteTask);

    // Make lanes droppable
    $('.lane').droppable({
        accept: '.task-card',
        drop: handleDrop
    });

    // Make the due date field a date picker
    $('#deadline').datepicker();
});
