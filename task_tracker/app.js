// Grab elements
const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addTaskBtn');
const list = document.getElementById('taskList');

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList .task').forEach(task => {
        const taskText = task.querySelector('span').textContent;
        const isDone = task.classList.contains('completed');
        tasks.push({ text: taskText, completed: isDone });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

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

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => li.remove());

    li.append(span, delBtn);
    list.appendChild(li);

    // Reset input
    input.value = '';
    input.focus();
}

// Event listeners
addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});