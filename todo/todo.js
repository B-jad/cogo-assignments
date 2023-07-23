const newTask = document.getElementById("inputTask");
const taskList = document.getElementById("taskList"); 

var tasks = [];
var showlistbool = true;
if(localStorage.getItem("savedTodo") !== null)
{
  tasks = JSON.parse(window.localStorage.getItem("savedTodo") || "[]");
  showList();
}

///////////////// API FETCH CODE //////////////
/*
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
*/

function showList(){
    window.localStorage.setItem("savedTodo",JSON.stringify(tasks));
    taskList.innerHTML = "";
    var size = tasks.length;
    for(i=0;i<size;i++)
    {
        let li = document.createElement('li');
        
        let task = document.createElement('div');
        let checkimg = document.createElement('img');
        if(tasks[i].priority == 1) li.style.background = "#edda8e";
        else if(tasks[i].priority == 2) li.style.background = "#d4c692";
        let text = document.createElement('div');
        if(!tasks[i].completed)
        {
          checkimg.src = "../todo/square-regular.svg";
          // li.id = "notCompleted";
        }
        else
        {
          checkimg.src = "../todo/square-check-regular.svg";
          text.style.textDecorationLine = "line-through";
          // li.id = "Completed";
        }
        let options = document.createElement('div');
        let editButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        task.id = "task-text";
        text.style.wordBreak = "break-word";
        options.style.display = "flex";
        editButton.style.margin = "auto 15px" ;
        text.innerText = tasks[i].title;
        editButton.innerText = "EDIT";
        deleteButton.innerText = "DELETE";
        task.appendChild(checkimg);
        task.appendChild(text);
        options.appendChild(editButton);
        options.appendChild(deleteButton);
        li.appendChild(task);
        li.appendChild(options);
        li.dataset.item = i;
        taskList.appendChild(li);

        checkimg.addEventListener("click", function()
        {
            completedTask(li.dataset.item);
            // console.log("here it is");
            // console.log(tasks, i-1);
            // tasks[i].completed = !tasks[i].completed;
            decideListShow();
        })
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

function completedTask(item)
{
  tasks[item].completed = !tasks[item].completed;
  decideListShow();
}

function deleteFromList(item)
{
    tasks.splice(item,1);
    decideListShow();
}

function editList(item)
{
  decideListShow();
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
    decideListShow();
  });

  saveButton.addEventListener("keypress", function(event)
  {
    console.log("save");
    if(event.key === "Enter")
    {
      if(textBox.value)
      tasks[item].title = textBox.value;
      decideListShow();  
    } 
  });
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
  if(tasks)
  var size = tasks.length;
  else var size = 0;
  let word = newTask.value;
  console.log(word);
  let wordlen = word.length;
  let priorityVal = 3
  if(word[wordlen-1] == '*' && word[wordlen-2] == '*') {priorityVal = 1; word = word.substring(0,wordlen-2);}
  else if (word[wordlen-1] == '*') {priorityVal = 2; word = word.substring(0,wordlen-1);}
    if(newTask.value  === '')
    {
        console.log("No task to add");
    }
    else{
        let curDate = new Date();
        // curDate = curDate.getFullYear() + 
                  // curDate.getMonth() + 
                  // curDate.getDate() + 
                  // curDate.getHours() + 
                  // curDate.getMinutes() + 
                  // curDate.getSeconds();
        console.log(curDate);
        let addNew = {
          userId    : 1,
          id        : size,
          title     : word,
          completed : false,
          priority  : priorityVal,
          timeAdded : curDate
        };
        tasks.push(addNew);
        decideListShow();
    }
    newTask.value = "";
}

function dsort()
{
  tasks.sort((a,b) => b.priority - a.priority);
  decideListShow();
}

function asort()
{
  tasks.sort((a,b) => a.priority - b.priority);
  decideListShow();
}

function dsortdate()
{
  tasks.sort((a,b) => new Date(a.timeAdded) - new Date(b.timeAdded));
  decideListShow();
}

function asortdate()
{
  tasks.sort((a,b) => new Date(b.timeAdded) - new Date(a.timeAdded));
  decideListShow();
}

function showPendingList()
{
    taskList.innerHTML = "";
    var size = tasks.length;
    for(i=0;i<size;i++)
    {
      if(!tasks[i].completed)
      {
        let li = document.createElement('li');
        let task = document.createElement('div');
        let checkimg = document.createElement('img');
        if(tasks[i].priority == 1) li.style.background = "#edda8e";
        else if(tasks[i].priority == 2) li.style.background = "#d4c692";
        let text = document.createElement('div');
        checkimg.src = "../todo/square-regular.svg";
        let options = document.createElement('div');
        let editButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        task.id = "task-text";
        text.style.wordBreak = "break-word";
        options.style.display = "flex";
        editButton.style.margin = "auto 15px" ;
        text.innerText = tasks[i].title;
        editButton.innerText = "EDIT";
        deleteButton.innerText = "DELETE";
        task.appendChild(checkimg);
        task.appendChild(text);
        options.appendChild(editButton);
        options.appendChild(deleteButton);
        li.appendChild(task);
        li.appendChild(options);
        li.dataset.item = i;
        taskList.appendChild(li);
        checkimg.addEventListener("click", function()
        {
            completedTask(li.dataset.item);
            decideListShow();
        })
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
}

const pendingbutton = document.getElementById("pendingbutton");

function showPendingBool()
{
  showlistbool = !showlistbool;
  decideListShow();
}

function decideListShow()
{
  if(showlistbool) 
  {
    showList();
    pendingbutton.innerText = "View Pending Tasks";
  }
  else 
  {
    showPendingList();
    pendingbutton.innerText = "View All Tasks";
  }
}
