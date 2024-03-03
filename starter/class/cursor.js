const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
    Screen.render()
  }

  up =() => {
    this.resetBackgroundColor()
    if(this.row <= 0) {
      this.row = 0
      this.setBackgroundColor()
      return this.row
    }
    this.row--
    this.setBackgroundColor()
    return this.row
  }

  down =() =>{
    this.resetBackgroundColor()
    if(this.row >= this.numRows-1) {
      this.row = this.numRows-1
      this.setBackgroundColor()
      return this.row
    }
    this.row++
    this.setBackgroundColor()
    return this.row
  }

  left =() =>{
    this.resetBackgroundColor()
    if(this.col <= 0) {
      this.col = 0
      this.setBackgroundColor()
      return this.col
    }
    this.col--
    this.setBackgroundColor()
    return this.col
  }

  right =() =>{
    this.resetBackgroundColor()
    if(this.col >= this.numCols-1) {
      this.col = this.numCols-1
      this.setBackgroundColor()
      return this.col
    }
    this.col++
    this.setBackgroundColor()
    return this.col
  }

}


module.exports = Cursor;
