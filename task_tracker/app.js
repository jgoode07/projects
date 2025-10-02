// Grab elements
const input = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDateInput');
const addBtn = document.getElementById('addTaskBtn');
const list = document.getElementById('taskList');
const clearBtn = document.getElementById('clearTasksBtn');

// Helper to create a styled due date span
function createDueDateSpan(dueDate) {
    const dateSpan = document.createElement('small');
    dateSpan.textContent = ` (Due: ${dueDate})`;
    dateSpan.classList.add('due-date');

    const today = new Date();
    const taskDate = new Date(dueDate);

    if (taskDate < today.setHours(0, 0, 0, 0)) {
        dateSpan.classList.add('overdue');
    } else {
        const diff = (taskDate - today) / (1000 * 60 * 60 * 24);
        if (diff <= 2) {
            dateSpan.classList.add('soon');
        }
    }

    return dateSpan;
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList .task').forEach(task => {
        const span = task.querySelector('span');

        const taskText = span.childNodes[0].nodeValue.trim();

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

        // Store due date back as data attribute
        if (t.dueDate) li.dataset.due = t.dueDate;

        // Task text
        const span = document.createElement('span');
        span.textContent = t.text;

        // Add due date element if it exists
        if (t.dueDate) {
            span.appendChild(createDueDateSpan(t.dueDate));
        }

        // Complete on click
        span.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = '✕';
        delBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.append(span, delBtn);
        list.appendChild(li);
    });
}

function addTask() {
    const text = input.value.trim();
    const dueDate = dueDateInput.value;
    if (!text) return;

    const li = document.createElement('li');
    li.className = 'task';
    if (dueDate) li.setAttribute('data-due', dueDate);

    const span = document.createElement('span');
    span.textContent = text;

    if (dueDate) {
        span.appendChild(createDueDateSpan(dueDate));
    }

    // Complete on click
    span.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    li.append(span, delBtn);
    list.appendChild(li);

    // Reset input
    input.value = '';
    dueDateInput.value = '';
    input.focus();

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