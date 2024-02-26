import { saveToLocal } from ".";
import { toDoList } from ".";
import { format, parse } from "date-fns";

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

  const dropDown = document.createElement('div')
  const dropDownBtn = document.createElement('button')
  const dropDownDiv = document.createElement('div')
  const editBtn = document.createElement('button')
  const removeBtn = document.createElement('button');

  dropDown.classList.add("drop_down")
  dropDownBtn.classList.add('drop_down_btn')
  dropDownDiv.classList.add('drop_down_div')
  editBtn.classList.add("edit_btn")
  removeBtn.classList.add("remove_btn");

  dropDownBtn.textContent = "..."
  editBtn.textContent = "edit"
  removeBtn.textContent = "delete";

  dropDown.append(dropDownBtn, dropDownDiv)
  dropDownDiv.append(editBtn, removeBtn) 
  
  dropDownBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const allDropDownDivs = document.querySelectorAll('.drop_down_div');
    allDropDownDivs.forEach(div => {
      if (div !== dropDownDiv) {
        div.style.display = "none";
      }
    });
    if (dropDownDiv.style.display === "flex") {
      dropDownDiv.style.display = "none";
    } else {
      dropDownDiv.style.display = "flex";
    }
  });
 
  document.addEventListener('click', () => {
    dropDownDiv.style.display = "none" 
  })

  removeBtn.addEventListener('click', () => {
    toDoList.removeFromList(content, date);
    toDoContainer.remove();
    saveToLocal(); 
  });
  
  editBtn.addEventListener("click", () => {
    const content = contentDiv.textContent
    const date = dateDiv.textContent

    const contentDivEditing = document.createElement('span')
    contentDivEditing.classList.add("content_div")
    contentDivEditing.id = "content_div_editing"
    contentDivEditing.setAttribute("role", "textbox")
    contentDivEditing.setAttribute("contenteditable", "true")
    contentDivEditing.textContent = contentDiv.textContent

    const dateDivEditing = document.createElement('input')
    dateDivEditing.classList.add("date_div")
    dateDivEditing.id = "date_div_editing"
    dateDivEditing.setAttribute("type", "date")

    const parsedDate = parse(dateDiv.textContent, "dd-MM-yyyy", new Date())
    dateDivEditing.value = format(parsedDate, "yyyy-MM-dd")  

    contentDiv.remove()
    dateDiv.remove()
    toDoContainer.append(contentDivEditing, dateDivEditing)

    if (contentDivEditing) {
      document.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
          event.preventDefault()

          toDoList.modifyToDo(content, date, contentDivEditing.textContent, dateDivEditing.value)
          contentDiv.textContent = contentDivEditing.textContent
          
          const newDate = dateDivEditing.value
          dateDiv.textContent = format(new Date(newDate), "dd-MM-yyyy");
          
          contentDivEditing.remove()
          dateDivEditing.remove()

          toDoContainer.append(dateDiv)
          toDoContainer.append(contentDiv)
          saveToLocal()
        }
      })
    }
  })

  toDoContainer.classList.add('to_do_container')
  toDoContainer.append(dateDiv, contentDiv, dropDown, priorityDiv)
  container.appendChild(toDoContainer)
  coloringContainer()
  lineThroughContainer()
}

