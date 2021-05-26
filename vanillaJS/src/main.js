let gameboard = null;
let noteMode = false;

window.addEventListener("DOMContentLoaded", () => {  
  initializeSudokuGame();
  addBoardEventListeners();
  addSelectorEventListeners();
  addKeydownEventListeners();
  addButtonEventListeners();
})

/**
 * Fetches a new gameboard from an external API
 * Needs a difficulty level as an input (default set to "easy")
 * 
 * @param {string} level 
 */
const initializeSudokuGame = async (level = "easy") => {  
  gameboard = new Board(level);
  gameboard.createGame();
  

}

const addBoardEventListeners = () => {
  document.getElementById("difficultyDropdown").addEventListener("change", (e) => {
    let level = e.target.value;
    gameboard.updateDifficulty(level);
  });
}

const addSelectorEventListeners = () => {
  Array.from(document.querySelectorAll(".number-selector-item")).map((item) => {
    item.addEventListener("click", (e) => {
      let focusedCell = gameboard.getFocus();
      focusedCell.setValue(e.target.textContent);
    });
  });
}

const addKeydownEventListeners = () => {
  window.addEventListener("keydown", (e) => {
    if(!isNaN(parseInt(e.key)) && parseInt(e.key) > 0 ){
      let value = parseInt(e.key);
      let focusedCell = gameboard.getFocus();

      if( noteMode ){
        focusedCell.toggleNote(value);
      } else {
        focusedCell.setValue(value);
      }

    } else if(e.key === "Backspace"){
      let focusedCell = gameboard.getFocus();
      focusedCell.setValue(0);
    } 
    
    
    if( e.key === "Shift"){
      noteMode = !noteMode;
      let noteModeRef = document.getElementById("noteMode");
      noteModeRef.textContent = "Note Mode: " + (noteMode ? "ON" : "OFF");
      noteModeRef.setAttribute("class", (noteMode) ? "note-mode note-mode-on" : "note-mode note-mode-off" );
    }
  });
}



const addButtonEventListeners = () => {
  document.getElementById("verifySolution").addEventListener("click", (e) => {
    gameboard.validate();
  })
}