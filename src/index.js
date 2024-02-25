import './style.css'
import { format } from 'date-fns'
import createTDElement from './createTDElement'

export const toDoList = (function () {
  let listArray = []
  
  function addToList(content, date, finish, priority) {
    const newToDo = {content, date, finish, priority}
    listArray.push(newToDo)
  }
  
  function findIndexInList(content, date, callback) {
    const index = listArray.findIndex(array => array.content === content && array.date === date)
    if (index != -1) {
      callback(index)
    } 
  }
  
  function removeFromList(content, date) {
    findIndexInList(content, date, index => listArray.splice(index, 1)); 
  }
  
  function toggleFinishStatus(content, date) {
    findIndexInList(content, date, index => {
      listArray[index].finish = !listArray[index].finish
    })
  }

  function togglePriorityStatus(content, date) {
    findIndexInList(content, date, index => {
      switch (listArray[index].priority) {
        case "chill":
          listArray[index].priority = "urgent"
          break;
        case "urgent":
          listArray[index].priority = "relax"
          break
        default:
          listArray[index].priority = "chill"
          break;
      }
    })
  }

  return { listArray, addToList, removeFromList, toggleFinishStatus, findIndexInList, togglePriorityStatus }
})()

export function saveToLocal() {
  const listArray = toDoList.listArray; 
  const listArrayJson = JSON.stringify(listArray);
  localStorage.setItem('UniqueToDoListKey', listArrayJson); 
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

const dialogInterface = (function () {
  const dialogBtn = document.getElementById('dialog_btn')
  const submitBtn = document.getElementById('submit_btn')
  const contentInput = document.getElementById("content_input")
  const contentInputBody = document.getElementById("content_input_body")
  const dateInput = document.getElementById("date_input")
  const priorityInput = document.getElementById("priority_input")

  const todayDate = format(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`, "yyyy-MM-dd")
  dateInput.value = todayDate
  
  dialogBtn.addEventListener('click', () => {
    dialog.showModal() 
  })
  
  const submitForm = () => {
    if(contentInput.value) {
      const inputValues = [contentInput.value, format(new Date(dateInput.value), 'dd-MM-yyyy'), false, priorityInput.value];
      createTDElement(...inputValues);
      toDoList.addToList(...inputValues);
      contentInput.value = ""
      contentInputBody.value = ""
      saveToLocal();
      document.querySelector('.container').scrollTo(0, document.querySelector('.container').scrollHeight);
    }
  }

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    submitForm()
  })

  contentInputBody.addEventListener("input", () => {
    contentInput.value = contentInputBody.value
  })

  if (contentInputBody) {
    document.addEventListener('keydown', (event) => {
      if (event.key === "Enter") {
        event.preventDefault()
        submitForm()
      }
    })
  }

})()

loadFromLocal()
populateContainer()
