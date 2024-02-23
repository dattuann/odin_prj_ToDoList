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

function createTDElement(content, date, finish, priority) {
  const container = document.querySelector('.container') 
  const removeBtn = document.createElement('button')
  const toDoContainer = document.createElement('div')
  const contentDiv = document.createElement('div')
  const dateDiv = document.createElement('div')
  const finishDiv = document.createElement('div')
  const priorityDiv = document.createElement('div')

  contentDiv.classList.add("content_div")
  contentDiv.textContent = content
  
  dateDiv.classList.add("date_div") 
  dateDiv.textContent = date

  removeBtn.classList.add("remove_btn")
  removeBtn.textContent = "remove"

  toDoContainer.append(dateDiv, contentDiv, removeBtn)
  toDoContainer.classList.add('to_do_container')
  container.appendChild(toDoContainer)
}

function populateContainer() {
  toDoList.listArray.forEach(element => {
    createTDElement(element.content, element.date, element.finish, element.priority)
  });
}

const mainInterFace = (function () {
  const dialogBtn = document.getElementById('dialog_btn')
  const submitBtn = document.getElementById('submit_btn')
  const contentInput = document.getElementById("content_input")
  const dateInput = document.getElementById("date_input")
  const priorityInput = document.getElementById("priority_input")
  const removeBtn = document.querySelectorAll("#remove_btn")

  dialogBtn.addEventListener('click', () => {
    dialog.showModal() 
  })

  removeBtn.forEach(button => {
    button.addEventListener('click', () => {
      return 
    })
  });

  submitBtn.addEventListener('click', () => {
    if (contentInput.value) {
      toDoList.addToList(contentInput.value, dateInput.value, false, priorityInput.value) 
      console.log(toDoList.listArray)
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