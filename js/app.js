/*-------------------------------- Constants --------------------------------*/
const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]


/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.square')
const messageEl = document.querySelector("#message")
const resetBtnEl = document.querySelector('#reset-button')

console.log(squareEls)
console.log(messageEl)


/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square)=> 
  square.addEventListener('click', handleClick)
)

resetBtnEl.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/

init()

function init() {
  board = [null, null, null, null, null, null, null, null, null] //top-left-middle-right, etc. 
  turn = 1 //represents player X
  winner = null
  render()
}

function render() {
  board.forEach((squares, idx) => {
   squareEls[idx].textContent = squares //allowing each square that is clicked to be assigned a text 
    if(squares === 1) {
      squareEls[idx].textContent = 'x'
      //squareEls[idx].style.backgroundColor = 'purple'  - is a way to add more color
    } else if(squares === -1) {         
      squareEls[idx].textContent = 'o'
    } else { 
      squareEls[idx].textContent = ' ' //when something hasn't happened yet
    }
    if(winner === null) {
      return (turn === 1 ? messageEl.textContent = "Player X's turn!!": messageEl.textContent = "Player O's turn!!")
    } else if (winner === 'T') {
      return messageEl.textContent = 'Tie Game!'
    } else {
      return(winner === 1 ? messageEl.textContent = "Player X has won!" : messageEl.textContent = "Player O has won!")  
    }
  }) 
}


function handleClick(evt) {
  let sqIdx = parseInt(evt.target.id[2]) //parseInt assigns sqIdx an integer from the string. The event is targeting the 2nd index from the id from the square. It is getting rid of the sq part and leaving me with a string value of a number which is then going to be parsed out. 
  console.log(evt.target.id[2])
  if (board[sqIdx] !== null) { //means that the square on the board already has a value, someone already clicked that square, we don't want someone to be able to click a square that has already been clicked
    return
  } else if (winner !== null) {
    return
  } else {
    board.splice(sqIdx, 1, turn)
    turn *= -1
  }
  console.log(board[sqIdx])
  getWinner()
  render()
}

function getWinner(){
  winningCombos.forEach(winningCombo => { // need to fix, can't return with a forEach loop, need to use a for loop
    let points = 0
    winningCombo.forEach(idx => { //adding points
      points += board[idx]
    })
    if (points === 3) {
      return winner = 1 
    } else if (points === -3){
      return winner = -1
    } else {
      if(board.some(square => //if block inside else so that it doesn't return tie when the game is still going
        square === null
      )=== false){
        return winner = 'T'
      }
    } 
    })
    render()
  }


