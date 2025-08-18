function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter your task');
        return;
    }

    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');

    // task text span
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    //complete button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '✔'; // Green checkmark icon
    completeButton.onclick = () => {
        taskSpan.classList.toggle('completed');
    };


    // remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';
    removeButton.onclick = () => {
        taskList.removeChild(listItem);
    };

    
    // append everything
    listItem.appendChild(completeButton);
    listItem.appendChild(taskSpan);
    listItem.appendChild(removeButton);

    taskList.appendChild(listItem);

    taskInput.value = '';   // clear input field
}
