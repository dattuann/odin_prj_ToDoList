import { saveToLocal } from ".";
import { toDoList } from ".";

export default function createTDElement(content, date, finish, priority) {
  const container = document.querySelector('.container') 
  const toDoContainer = document.createElement('div')
  const contentDiv = document.createElement('div')
  const dateDiv = document.createElement('div')
  const finishDiv = document.createElement('div')
  const priorityDiv = document.createElement('button')

  contentDiv.classList.add("content_div")
  contentDiv.textContent = content
  
  dateDiv.classList.add("date_div") 
  dateDiv.textContent = date

  priorityDiv.classList.add("priority_div")
  priorityDiv.textContent = (priority).toUpperCase()

  function coloringContainer() {
    const chillColor = "#748ffc";
    const urgentColor = "#ffa94d";
    const relaxColor = "#a9e34b";
    const chillColorBtn = "#a5d8ff"
    const urgentColorBtn = "#ffd8a8"
    const relaxColorBtn = "#d8f5a2"

    switch (priorityDiv.textContent) {
      case "CHILL":
        toDoContainer.style.backgroundColor = chillColor
        priorityDiv.style.backgroundColor = chillColorBtn
        break;
      case "RELAX":
        toDoContainer.style.backgroundColor = relaxColor 
        priorityDiv.style.backgroundColor = relaxColorBtn 
        break; 
      default:
        toDoContainer.style.backgroundColor = urgentColor
        priorityDiv.style.backgroundColor = urgentColorBtn
        break;
    } 
  }

  function lineThroughContainer() {
    toDoList.findIndexInList(contentDiv.textContent, dateDiv.textContent, index => {
      if (toDoList.listArray[index].finish) {
        toDoContainer.style.backgroundColor = "black"
        priorityDiv.style.backgroundColor = "black" 
        contentDiv.style.textDecoration = "line-through"
        priorityDiv.disabled = true
      } else {
        coloringContainer()
        contentDiv.style.textDecoration = "none"
        priorityDiv.disabled = false
      }
    })
  }

  contentDiv.addEventListener('click', () => {
    toDoList.toggleFinishStatus(contentDiv.textContent, dateDiv.textContent)
    lineThroughContainer()
    saveToLocal()
  })

  priorityDiv.addEventListener('click', () => {
    toDoList.togglePriorityStatus(contentDiv.textContent, dateDiv.textContent)
    toDoList.findIndexInList(contentDiv.textContent, dateDiv.textContent, index => {
      priorityDiv.textContent = toDoList.listArray[index].priority.toUpperCase()
      coloringContainer()
    })
    saveToLocal()
  })

  const removeBtn = document.createElement('button');
  removeBtn.classList.add("remove_btn");
  removeBtn.textContent = "x";

  removeBtn.addEventListener('click', () => {
    toDoList.removeFromList(content, date);
    toDoContainer.remove();
    saveToLocal(); 
  });
  
  toDoContainer.append(dateDiv, contentDiv, removeBtn, priorityDiv)
  toDoContainer.classList.add('to_do_container')
  container.appendChild(toDoContainer)
  coloringContainer()
  lineThroughContainer()
}

