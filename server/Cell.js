class Cell {
  constructor(row, col, value=null, setFocus){
    this.id = Math.floor(Math.random()*(10**9))
    this.row = row;
    this.col = col;
    this.value = value;
    this.setFocus = setFocus;
    this.locked = value !== 0;
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
    this.updateHTML();
    }
  }

  toString = () => {
    return {id: this.id, row: this.row, col: this.col, value: this.value};
  }

  toHTML = () => {
    let htmlRep = document.createElement("div");
    htmlRep.setAttribute("class", "grid-item");
    htmlRep.setAttribute("data-value", this.value);
    if( this.locked ){
      htmlRep.classList.add("grid-item-locked");
    }
    htmlRep.setAttribute("id", this.id);
    htmlRep.value = this.value === 0 ? null : this.value;
    htmlRep.textContent = this.value === 0 ? null : this.value;


    htmlRep.addEventListener("click", (e) => {

      Array.from(document.querySelectorAll(".grid-item-highlighted")).map((item) => item.classList.remove("grid-item-highlighted"));
      Array.from(document.querySelectorAll(".grid-item-selected")).map((item) => item.classList.remove("grid-item-selected"));
      this.setFocus(this);
      if( this.value !== 0 ){
        Array.from(document.querySelectorAll("[data-value='" + this.value +"']")).map((item) => item.classList.add("grid-item-highlighted"))
      }
      htmlRep.classList.add("grid-item-selected");
    });
    return htmlRep;
  }

  updateHTML = () => {
    let htmlRef = document.getElementById(this.id);
    htmlRef.setAttribute("data-value", this.value);
    htmlRef.value = this.value;
    htmlRef.textContent = this.value;
  }

  

}

exports = Cell;