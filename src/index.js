import './style.css'

const toDoList = (function () {
  let listArray = []
  
  function addToList(content, date, finish, priority) {
    const newToDo = {content, date, finish, priority}
    listArray.push(newToDo)
  }
  
  function removeFromList(content, date) {
    const index = listArray.findIndex(array => array.content === content && array.date === date)
    if (index != -1) {
      listArray.splice(index, 1)
    }
  }
  
  return { listArray, addToList, removeFromList }
})()

function saveToLocal() {
  const listArray = toDoList.listArray; 
  const ListArrayJSON = JSON.stringify(listArray);
  localStorage.setItem('UniqueToDoListKey', ListArrayJSON); 
}

function loadFromLocal() {
  const savedListJSON = localStorage.getItem('UniqueToDoListKey'); 
  if (savedListJSON) {
    const savedListArray = JSON.parse(savedListJSON);
    savedListArray.forEach(element => {
      toDoList.addToList(element.content, element.date, element.finish, element.priority);
    });
  }
}
function populateContainer() {
  toDoList.listArray.forEach(element => {
    createTDElement(element.content, element.date, element.finish, element.priority)
  });
}

function createTDElement(content, date, finish, priority) {
  const container = document.querySelector('.container') 
  const toDoContainer = document.createElement('div')
  const contentDiv = document.createElement('div')
  const dateDiv = document.createElement('div')
  const finishDiv = document.createElement('div')
  const priorityDiv = document.createElement('div')

  contentDiv.classList.add("content_div")
  contentDiv.textContent = content
  
  dateDiv.classList.add("date_div") 
  dateDiv.textContent = date
  
  const removeBtn = document.createElement('button');
  removeBtn.classList.add("remove_btn");
  removeBtn.textContent = "remove";

  removeBtn.addEventListener('click', () => {
    removeTDContainer(contentDiv.textContent, dateDiv.textContent, toDoContainer)
  });
  
  toDoContainer.append(dateDiv, contentDiv, removeBtn )
  toDoContainer.classList.add('to_do_container')
  container.appendChild(toDoContainer)
}

function removeTDContainer(content, date, container) {
  toDoList.removeFromList(content, date);
  container.remove();
  saveToLocal(); 
}

const dialogInterface = (function () {
  const dialogBtn = document.getElementById('dialog_btn')
  const submitBtn = document.getElementById('submit_btn')
  const contentInput = document.getElementById("content_input")
  const dateInput = document.getElementById("date_input")
  const priorityInput = document.getElementById("priority_input")
  const form = document.querySelector('form')
  
  dialogBtn.addEventListener('click', () => {
    dialog.showModal() 
  })
  
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (contentInput.value) {
      createTDElement(contentInput.value, dateInput.value, false, priorityInput.value)
      toDoList.addToList(contentInput.value, dateInput.value, false, priorityInput.value) 
      form.reset()
      saveToLocal()
    }
  })
})()

loadFromLocal()
populateContainer()


/* toDoList.addToList("hello", "14/05/2024", false, "urgent") 
toDoList.addToList("my break up", "27/11/2024", false, "relax")
toDoList.addToList("testing", "23/2/2025", true, "normal")

saveToLocal() */