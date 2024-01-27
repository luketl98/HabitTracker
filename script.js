// Script initialization and DOM element selection
document.addEventListener('DOMContentLoaded', () => {
    const addHabitForm = document.getElementById('addHabitForm');
    const recurringTasksSection = document.getElementById('recurringTasks');
    const allTasksSection = document.getElementById('allTasks');

    // Event listener for form submission to add a new task
    addHabitForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents the default form submit action

        // Retrieves values from the form inputs
        const habitName = document.getElementById('newHabit').value;
        const habitDescription = document.getElementById('habitDescription').value;
        const habitSubtasks = document.getElementById('habitSubtasks').value.split(',');
        const isRecurring = document.getElementById('recurringSelect').value === 'yes';
        const recurrenceInterval = document.getElementById('recurrenceInterval').value;

        // Creates a task object with the retrieved values
        const task = {
            name: habitName,
            description: habitDescription,
            subtasks: habitSubtasks,
            recurring: isRecurring,
            interval: recurrenceInterval
        };

        displayTask(task); // Calls function to display the new task
    });


    // Function to display a new task on the page
    function displayTask(task) {
        const taskElement = document.createElement('div'); // Creates a new div for the task

        let subtasksHTML = '';
        // Loops through each subtask to create checkboxes
        for (const subtask of task.subtasks) {
            subtasksHTML += `<div><input type="checkbox" class="subtask-checkbox"> ${subtask.trim()}</div>`;
        }

        // Sets the inner HTML of the task element
        taskElement.innerHTML = `
            <h3><input type="checkbox" class="task-checkbox"> ${task.name}</h3>
            <p>Description: ${task.description}</p>
            <div>Subtasks: ${subtasksHTML}</div>
            ${task.recurring ? `<p>Recurs every ${task.interval} days</p>` : ''}
        `;

        // Adds the task element to the appropriate section (recurring or all tasks)
        if (task.recurring) {
            recurringTasksSection.appendChild(taskElement);
        } else {
            allTasksSection.appendChild(taskElement);
        }

        // Adds event listeners to each checkbox in the task
        const checkboxes = taskElement.querySelectorAll('.subtask-checkbox, .task-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', handleCheckboxChange);
        });
    }


    // Function to handle checkbox change events (marking tasks/subtasks as completed)
    function handleCheckboxChange(event) {
        const checkbox = event.target; // Gets the checkbox that triggered the event
        // Toggles the text decoration based on whether the checkbox is checked
        if (checkbox.checked) {
            checkbox.parentNode.style.textDecoration = 'line-through';
        } else {
            checkbox.parentNode.style.textDecoration = 'none';
        }
    }

});
