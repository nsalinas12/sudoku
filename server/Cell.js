class Cell {
  constructor(row, col, value=null, setFocus){
    this.id = Math.floor(Math.random()*(10**9))
    this.row = row;
    this.col = col;
    this.value = value;
    this.setFocus = setFocus;
    this.locked = value !== 0;
    this.notes = new Set();
  }
  

  toggleNote = (value) => {
    if( this.notes.has(value) ){
      this.notes.delete(value);
    } else {
      this.notes.add(value);
    }
    this.updateNotesHTML();
  }

  getRow = () => {
    return this.row;
  }

  getCol = () => {
    return this.col;
  }

  getValue = () => {
    return this.value;
  }

  setValue = (newValue) => {
    if( !this.locked ){
    this.value = newValue;
    this.updateValueHTML();
    }
  }

  toString = () => {
    return {id: this.id, row: this.row, col: this.col, value: this.value};
  }

  toHTML = () => {

    let htmlContainer = document.createElement("div");
    htmlContainer.setAttribute("class", "grid-item");
    htmlContainer.setAttribute("id", "grid-item-" + this.id);
    htmlContainer.setAttribute("data-value", this.value);

    //1. Create value container
    let itemValueHTML = document.createElement("div");
    itemValueHTML.setAttribute("class", "grid-item-value");
    itemValueHTML.setAttribute("id", "grid-item-value-" + this.id);
    if( this.locked ){
      itemValueHTML.classList.add("grid-item-locked");
    }
    itemValueHTML.value = this.value === 0 ? null : this.value;
    itemValueHTML.textContent = this.value === 0 ? null : this.value;
    htmlContainer.appendChild(itemValueHTML);

    //2. Create notes container
    let notesContainer = document.createElement("div");
    notesContainer.setAttribute("class", "grid-item-notes");
    notesContainer.setAttribute("id", "grid-item-notes-" + this.id);
    notesContainer.textContent = Array.from(this.notes).join(", ");
    htmlContainer.appendChild(notesContainer);


    //3. Add event listener
    htmlContainer.addEventListener("click", (e) => {
      Array.from(document.querySelectorAll(".grid-item-selected")).map((item) => item.classList.remove("grid-item-selected"));        
      Array.from(document.querySelectorAll(".grid-item-highlighted")).map((item) => item.classList.remove("grid-item-highlighted"));
      this.setFocus(this);
      
      if( this.value !== 0 ){
        Array.from(document.querySelectorAll("[data-value='" + this.value +"']")).map((item) => item.classList.add("grid-item-highlighted"))
      }
      
      htmlContainer.classList.add("grid-item-selected");
    });
    return htmlContainer;
  }

  updateValueHTML = () => {

    let containerRef = document.getElementById("grid-item-" + this.id);
    containerRef.setAttribute("data-value", this.value);
    let valueRef = document.getElementById("grid-item-value-" + this.id);
    if( this.value === 0){
      containerRef.classList.remove("grid-item-highlighted");
      valueRef.value = null;
      valueRef.textContent = null;
    } else {   
      Array.from(document.querySelectorAll("[data-value='" + this.value + "']")).map((item) => item.classList.add("grid-item-highlighted")); 
      valueRef.value = this.value;
      valueRef.textContent = this.value;
    }
  }

  updateNotesHTML = () => {
    let htmlRef = document.getElementById("grid-item-notes-" + this.id);
    htmlRef.textContent = Array.from(this.notes).join(", ");
  }
}

exports = Cell;