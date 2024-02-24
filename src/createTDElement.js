import { saveToLocal } from ".";
import { toDoList } from ".";

export default function createTDElement(content, date, finish, priority) {
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

  priorityDiv.classList.add("priority_div")
  priorityDiv.textContent = (priority).toUpperCase()

  const chillColor = "#748ffc";
  const urgentColor = "#ffa94d";
  const relaxColor = "#a9e34b";
  const chillColorBtn = "#a5d8ff"
  const urgentColorBtn = "#ffd8a8"
  const relaxColorBtn = "#d8f5a2"

  function coloringContainers(finish) {
    if (!finish) {
      switch (priority) {
        case "chill":
          toDoContainer.style.backgroundColor = chillColor
          priorityDiv.style.backgroundColor = chillColorBtn
          break;
        case "relax":
          toDoContainer.style.backgroundColor = relaxColor 
          priorityDiv.style.backgroundColor = relaxColorBtn 
          break; 
        default:
          toDoContainer.style.backgroundColor = urgentColor
          priorityDiv.style.backgroundColor = urgentColorBtn
          break;
    }
  } else {
      toDoContainer.style.backgroundColor = "gray" 
      priorityDiv.style.backgroundColor = "gray" 
  }
  }
 
  coloringContainers()

  toDoContainer.addEventListener('click', () => {
    const index = toDoList.listArray.findIndex(item => item.content === content && item.date === date);
    if (index !== -1) {
      toDoList.listArray[index].finish = !toDoList.listArray[index].finish;
      coloringContainers(toDoList.listArray[index].finish);
      saveToLocal();
    }
  })

  const removeBtn = document.createElement('button');
  removeBtn.classList.add("remove_btn");
  removeBtn.textContent = "x";

  removeBtn.addEventListener('click', () => {
    removeTDContainer(contentDiv.textContent, dateDiv.textContent, toDoContainer)
  });
  
  toDoContainer.append(dateDiv, contentDiv, removeBtn, priorityDiv)
  toDoContainer.classList.add('to_do_container')
  container.appendChild(toDoContainer)
}

function removeTDContainer(content, date, container) {
  toDoList.removeFromList(content, date);
  container.remove();
  saveToLocal(); 
}