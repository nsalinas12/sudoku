class Board {

  constructor(level="easy") {
    this.level = level;
    this.gameBoard = [[]];
    this.gameCells = [[]];

    this.focus = null;
  }

  setFocus = (cell) => {
    this.focus = cell;
  }

  getFocus = () => {
    return this.focus;
  }

  setLevel = (newLevel) => {
    this.level = newLevel;
  }

  setGameBoard = (newGameBoard) => {
    this.gameBoard = newGameBoard;
  }

  setGameCells = (newGameCells) => {
    this.gameCells = newGameCells;
  }

  getCellAt = (x, y) => {
    let row = this.gameCells[y];
    let cell = row[x];
    return cell;
  }

  getValueAt = (x, y) => {
    let row = this.gameBoard[y];
    let cell = row[x];
    return cell;
  }

  clearBoard = () => {
    document.getElementById(SUDOKU_UTILS.GAMEBOARD_HTML_REF_ID).innerHTML = "";
  }

  updateDifficulty = async (level) => {
    this.clearBoard();
    this.setLevel(level);
    await this.fetchBoard(this.level);
    this.loadCells();
    this.loadHTMLGrid();
  }

  fetchBoard = async (level) => {
    
    try{
      let gameURL = "https://sugoku.herokuapp.com/board?difficulty=" + level;
      let gameResponse = await fetch(gameURL);
      let gameBoard = await gameResponse.json();
      this.setGameBoard(gameBoard.board);
    } catch (e) {
      console.log("here error", e);
    }
  }

  loadCells = () => {
    let cellMap = this.gameBoard.map((row, rowIdx) => {
      return row.map((cellValue, colIdx) => new Cell(rowIdx, colIdx, cellValue, this.setFocus))
    });

    this.setGameCells(cellMap);
  }

  loadHTMLGrid = () => {

    let boardRef = document.getElementById(SUDOKU_UTILS.GAMEBOARD_HTML_REF_ID);
    
    this.gameCells.map((row, idx) => {
      //1. Create row ref
      let boardRowHTML = document.createElement("div");
      boardRowHTML.setAttribute("class", SUDOKU_UTILS.GAMEBOARD_ROW_CLASS);
      boardRowHTML.setAttribute("id", "game-row-" + idx);

      // Create new cell in HTML
      row.map((cell) => {
        let cellAsHTML = cell.toHTML();
        boardRowHTML.appendChild(cellAsHTML);
      });
      boardRef.appendChild(boardRowHTML);
    });
  }


  createGame = async () => {
  
    //1. Fetch gameboard
    await this.fetchBoard(this.level);

    //2. Create cells
    this.loadCells();

    //3. Load HTML Grid 
    this.loadHTMLGrid();
  }

  toJSON = () => {
    return {board: this.gameCells.map((row) => row.map((cell) => cell.getValue())) };
  }

  validate = () => {

    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

    const encodeParams = (params) => 
      Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');

    const data = this.toJSON();

    let gameURL = "https://sugoku.herokuapp.com/validate";
    let options = {
      method: "POST",
      body: encodeParams(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    fetch(gameURL, options).then((res) => {
      return res.json();
    }).then((res) => {
      console.log('here res', res);
    }).catch((err) => {
      console.log('err', err);
    })
  }

}

exports = Board;