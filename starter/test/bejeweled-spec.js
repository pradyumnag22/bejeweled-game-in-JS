const { expect } = require('chai');

const Bejeweled = require("../class/bejeweled.js");
const Cursor = require('../class/cursor.js');
const { grid } = require('../class/screen.js');

describe ('Bejeweled', function () {
  let bejeweled = new Bejeweled();
  let grid;
  beforeEach(function(){
    bejeweled.grid = [['🍉','🍍','🍉','🍉'],
                      ['🍊','🍉','🍉','🍋'],
                      ['🍍','🍊','🍍','🍋'],
                      ['🍊','🍊','🍍','🍍']]
  })
  // Add tests for setting up a basic board
  it("grid is of 8x8", function(){
    bejeweled = new Bejeweled()
    expect(bejeweled.grid.length).to.be.equal(8)
    expect(bejeweled.grid[0].length).to.be.equal(8)
  })

  it("test matchings", function(){
      bejeweled.cursor.row = 1
      bejeweled.cursor.col = 0
      expect(bejeweled.validSwap(0,0)).to.be.equal(true)
  })
  it("test matchings", function(){
    bejeweled.cursor.row = 1
    bejeweled.cursor.col = 0
    expect(bejeweled.validSwap(0,2)).to.be.equal(false)
  })
  it("test for combo", function(){
    bejeweled.cursor.row = 1
    bejeweled.cursor.col = 1
    expect(bejeweled.validSwap(0,1)).to.be.equal(true)
  })
  // Add tests for a valid swap that matches 3

  // Add tests for swaps that set up combos
  it('check if there are no possible moves', function(){
    bejeweled.grid = [['🍉','🍍','🍊','🍉'],
                      ['🍊','🍉','🍋','🍊'],
                      ['🍍','🍊','🍍','🍋'],
                      ['🍉','🍋','🍍','🍉']]

    expect(Bejeweled.checkForMatches(grid)).to.be.equal(false)
  })
  it('check for possible moves', function(){
    expect(Bejeweled.checkForMatches(grid)).to.be.equal(true)
  })

  // Add tests to check if there are no possible valid moves

});
