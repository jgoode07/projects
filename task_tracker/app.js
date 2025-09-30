// Grab elements
const input = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDateInput');
const addBtn = document.getElementById('addTaskBtn');
const list = document.getElementById('taskList');
const clearBtn = document.getElementById('clearTasksBtn');

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList .task').forEach(task => {
        const taskText = task.querySelector('span').textContent;
        const isDone = task.classList.contains('completed');
        const dueDate = task.getAttribute('data-due');   // pull from custom attribute

        tasks.push({ text: taskText, completed: isDone, dueDate: dueDate });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const stored = JSON.parse(localStorage.getItem('tasks')) || [];
    stored.forEach(t => {
        const li = document.createElement('li');
        li.className = 'task';
        if (t.completed) li.classList.add('completed');

        // save due date as attribute for later reference
        if (t.dueDate) li.setAttribute('data-due', t.dueDate);

        const span = document.createElement('span');
        span.textContent = t.text;

        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'X';
        delBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.append(span, delBtn);
        list.appendChild(li);
    });
}

// Add task function
function addTask() {
    const text = input.value.trim();
    const dueDate = dueDateInput.value;
    if (!text) return;

    const li = document.createElement('li');
    li.className = 'task';
    if (dueDate) li.setAttribute('data-due', dueDate);

    const span = document.createElement('span');
    span.textContent = text;

    // Add date display if provided
    if (dueDate) {
        const dateSpan = document.createElement('small');
        dateSpan.textContent = ` (Due: ${dueDate})`;
        dateSpan.classList.add('due-date')
        span.appendChild(dateSpan);
    }

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
    dueDateInput.value = '';
    input.focus();

    // Save tasks after adding
    saveTasks();
}

// Event listeners
addBtn.addEventListener('click', addTask);
clearBtn.addEventListener('click', clearAllTasks);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});

// Remove all tasks from the list and clear localStorage
function clearAllTasks() {
    list.innerHTML = '';
    localStorage.removeItem('tasks');
}

// Load saved tasks on page load
loadTasks();