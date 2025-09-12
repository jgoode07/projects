// Grab elements
const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addTaskBtn');
const list = document.getElementById('taskList');

// Add task function
function addTask() {
    const text = input.value.trim();
    // Ignore empty input
    if (!text) return;

    // Create list item
    const li = document.createElement('li');
    li.className = 'task';

    const span = document.createElement('span');
    span.textContent = text;

    // Complete on click
    span.addEventListener('click', () => {
        li.classList.toggle('completed');
    });
}

// Event listeners
addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});