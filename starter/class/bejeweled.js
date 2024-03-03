const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {

  constructor(numRows=8,numCols=8) {

    this.playerTurn = "O";
    this.numRows = numRows
    this.numCols = numCols
    // Initialize this
    this.grid = new Array(numRows).fill().map(row =>{
      return new Array(numCols).fill()
    });

    this.cursor = new Cursor(8, 8);

    Screen.initialize(8, 8);
    Screen.setGridlines(false);
    this.elements()
    this.upgradeGrid()
    this.cursor.setBackgroundColor();
    Screen.render();
    Screen.addCommand('w','move up',this.cursor.up)
    Screen.addCommand('d','move right',this.cursor.right)
    Screen.addCommand('s','move down',this.cursor.down)
    Screen.addCommand('a','move left',this.cursor.left)
    Screen.addCommand('j','swap left',this.swapleft)
    Screen.addCommand('l','swap right',this.swapright)
    Screen.addCommand('i','swap up',this.swapup)
    Screen.addCommand('m','swap down',this.swapdown)
  }
  static arr = ['🍉','🍍','🍊','🍋','🍒','🍇']
  score = 0
  elements = () =>{ //fills the grid will given elements
    this.grid.forEach((rows,i) =>{
      rows.forEach((cols,j)=>{
        let input = Math.floor(Math.random()*Bejeweled.arr.length)
        this.grid[i][j] = Bejeweled.arr[input]
        Screen.setGrid(i,j,Bejeweled.arr[input])
      })
    })
  }
  static checkForMatches(grid) {
    let count = 0
    for(let i=0; i<grid.length; i++) {
      for(let j=0; j+2<grid[i].length; j++){
        if((grid[i][j] === grid[i][j+1]) && (grid[i][j] === grid[i][j+2])) {
            count++
        }
      }
    }
    for(let i=0; i+2<grid.length; i++) {
      for(let j=0; j<grid[i].length; j++){
        if((grid[i][j] === grid[i+1][j]) && (grid[i][j] === grid[i+2][j]) ) {
          count++
        }
      }
    }
    return count
  }
  upgradeGrid =() =>{ //Checks if matches exits in initial grid and removes
    for(let i=0; i<this.grid.length; i++) {
      for(let j=0; j+2<this.grid[i].length; j++){
      if((this.grid[i][j] === this.grid[i][j+1]) && (this.grid[i][j] === this.grid[i][j+2])) {
          let input = Math.floor(Math.random()*Bejeweled.arr.length)
          this.grid[i][j] = Bejeweled.arr[input]
          Screen.setGrid(i,j,Bejeweled.arr[input])
          input = Math.floor(Math.random()*Bejeweled.arr.length)
          this.grid[i][j+1] = Bejeweled.arr[input]
          Screen.setGrid(i,j+1,Bejeweled.arr[input])
          input = Math.floor(Math.random()*Bejeweled.arr.length)
          this.grid[i][j+2] = Bejeweled.arr[input]
          Screen.setGrid(i,j+2,Bejeweled.arr[input])
          Screen.render()
          this.upgradeGrid()
        }
      }
    }
    for(let i=0; i+2<this.grid.length; i++) {
      for(let j=0; j<this.grid[i].length; j++){
        if((this.grid[i][j] === this.grid[i+1][j]) && (this.grid[i][j] === this.grid[i+2][j]) ) {
          let input = Math.floor(Math.random()*Bejeweled.arr.length)
          this.grid[i][j] = Bejeweled.arr[input]
          Screen.setGrid(i,j,Bejeweled.arr[input])
          input = Math.floor(Math.random()*Bejeweled.arr.length)
          this.grid[i+1][j] = Bejeweled.arr[input]
          Screen.setGrid(i+1,j,Bejeweled.arr[input])
          input = Math.floor(Math.random()*Bejeweled.arr.length)
          this.grid[i+2][j] = Bejeweled.arr[input]
          Screen.setGrid(i+2,j,Bejeweled.arr[input])
          Screen.render()
          this.upgradeGrid()
        }
      }
    }
  }

  swapleft =()=>{
    if(this.cursor.col === 0) return 'There are no elements to swap'
    else {
      let current = this.grid[this.cursor.row][this.cursor.col]
      let left = this.grid[this.cursor.row][this.cursor.col-1]
      this.grid[this.cursor.row][this.cursor.col]= left
      Screen.setGrid(this.cursor.row,this.cursor.col,left)
      this.grid[this.cursor.row][this.cursor.col-1] = current
      Screen.setGrid(this.cursor.row,this.cursor.col-1,current)
      Screen.render()
      let count = Bejeweled.checkForMatches(this.grid) //checks number of matches
      if(count > 0) {
        this.score += count
        Screen.setMessage(`Score: ${this.score}`)
        this.upgradeGrid()
      }
      else {  // places elements to original position
        this.grid[this.cursor.row][this.cursor.col] = current
        Screen.setGrid(this.cursor.row,this.cursor.col,current)
        this.grid[this.cursor.row][this.cursor.col-1] = left
        Screen.setGrid(this.cursor.row,this.cursor.col-1,left)
        Screen.render()
      }
    }
  }

  swapright =()=>{
    if(this.cursor.col === this.numCols-1) return 'There are no elements to swap'
    else {
      let current = this.grid[this.cursor.row][this.cursor.col]
      let right = this.grid[this.cursor.row][this.cursor.col+1]
      this.grid[this.cursor.row][this.cursor.col]= right
      Screen.setGrid(this.cursor.row,this.cursor.col,right)
      this.grid[this.cursor.row][this.cursor.col+1] = current
      Screen.setGrid(this.cursor.row,this.cursor.col+1,current)
      Screen.render()
      let count = Bejeweled.checkForMatches(this.grid) //checks number of matches
      if(count > 0) {
        this.score += count
        Screen.setMessage(`Score: ${this.score}`)
        this.upgradeGrid()
      }
      else {
        this.grid[this.cursor.row][this.cursor.col] = current
        Screen.setGrid(this.cursor.row,this.cursor.col,current)
        this.grid[this.cursor.row][this.cursor.col+1] = right
        Screen.setGrid(this.cursor.row,this.cursor.col+1,right)
        Screen.render()
      }
    }
  }

  swapup =()=>{
    if(this.cursor.row === 0) return 'There are no elements to swap'
    else {
      let current = this.grid[this.cursor.row][this.cursor.col]
      let up = this.grid[this.cursor.row-1][this.cursor.col]
      this.grid[this.cursor.row][this.cursor.col]= up
      Screen.setGrid(this.cursor.row,this.cursor.col,up)
      this.grid[this.cursor.row-1][this.cursor.col] = current
      Screen.setGrid(this.cursor.row-1,this.cursor.col,current)
      Screen.render()
      let count = Bejeweled.checkForMatches(this.grid) //checks number of matches
      if(count > 0) {
        this.score += count
        Screen.setMessage(`Score: ${this.score}`)
        this.upgradeGrid()
      }
      else {
        this.grid[this.cursor.row][this.cursor.col]= current
        Screen.setGrid(this.cursor.row,this.cursor.col,current)
        this.grid[this.cursor.row-1][this.cursor.col] = up
        Screen.setGrid(this.cursor.row-1,this.cursor.col,up)
        Screen.render()
      }
    }
  }
  swapdown =()=>{
    if(this.cursor.row === this.numRows-1) return 'There are no elements to swap'
    else {
      let current = this.grid[this.cursor.row][this.cursor.col]
      let down = this.grid[this.cursor.row+1][this.cursor.col]
      this.grid[this.cursor.row][this.cursor.col]= down
      Screen.setGrid(this.cursor.row,this.cursor.col,down)
      this.grid[this.cursor.row+1][this.cursor.col] = current
      Screen.setGrid(this.cursor.row+1,this.cursor.col,current)
      Screen.render()
      let count = Bejeweled.checkForMatches(this.grid) //checks number of matches
      if(count > 0) {
        this.score += count
        Screen.setMessage(`Score: ${this.score}`)
        this.upgradeGrid()
      }
      else {
        this.grid[this.cursor.row][this.cursor.col]= current
        Screen.setGrid(this.cursor.row,this.cursor.col,current)
        this.grid[this.cursor.row+1][this.cursor.col] = down
        Screen.setGrid(this.cursor.row+1,this.cursor.col,down)
        Screen.render()
      }
    }
  }
}

module.exports = Bejeweled;


// let beje = new Bejeweled()

// console.log(beje.grid)
