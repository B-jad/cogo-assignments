const newTask = document.getElementById("inputTask");
const taskList = document.getElementById("taskList"); 

var tasks = [];

fetch('https://jsonplaceholder.typicode.com/todos')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.json();
  })
  .then((data) => {
    // Process the received data
    tasks = data;
    showList();
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch request
    console.log('Error:', error.message);
  });

function showList(){
    taskList.innerHTML = "";
    var size = tasks.length;
    for(i=0;i<size;i++)
    {
        let li = document.createElement('li');
        let text = document.createElement('div');
        let options = document.createElement('div');
        let editButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        text.style.wordBreak = "break-all";
        options.style.display = "flex";
        editButton.style.margin = "auto 15px" ;
        text.innerText = tasks[i].title;
        editButton.innerText = "EDIT";
        deleteButton.innerText = "DELETE";
        options.appendChild(editButton);
        options.appendChild(deleteButton);
        li.appendChild(text);
        li.appendChild(options);
        li.dataset.item = i;
        taskList.appendChild(li);
        deleteButton.addEventListener("click", function()
        {
            deleteFromList(li.dataset.item);
        });
        editButton.addEventListener("click", function()
        {
            editList(li.dataset.item);
        })
    }
}

function deleteFromList(item)
{
    tasks.splice(item,1);
    showList();
}

function editList(item)
{
  showList();
  let taskArray = taskList.childNodes;
  let textBox = document.createElement('input');
  let saveButton = document.createElement('button');
  saveButton.innerText = "SAVE";
  taskArray[item].innerHTML = "";
  taskArray[item].appendChild(textBox);
  taskArray[item].appendChild(saveButton);

  saveButton.addEventListener("click", function()
  {
    if(textBox.value)
    tasks[item].title = textBox.value;
    showList();
  })
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault;
});
form.addEventListener("keypress",function(event)
{
    if(event.key === "Enter"){
        event.preventDefault();
        addNewTask();
    }
});

function addNewTask()
{
  var size = tasks.length;
    if(newTask.value  === '')
    {
        console.log("No task to add");
    }
    else{
        let addNew = {
          userId    : 1,
          id        : size,
          title     : newTask.value,
          completed : true
        };
        tasks.push(addNew);
        showList();
        // let item = document.createElement("li");
        // item.innerHTML = newTask.value;
        // taskList.appendChild(item);
    }
    newTask.value = "";
}