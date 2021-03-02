document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const playerDisplay = document.querySelector('#player')
  const messageLabel = document.querySelector('#message')
  const resetButton = document.querySelector('#clearBtn');

  let currentPlayer = 'playerX'

  resetButton.addEventListener('click', clearBoard);

  squares.forEach(square => {
    square.addEventListener('click', clickOutcome)
  })

  function clickOutcome(e) {
    const squareArray = Array.from(squares);
    const index = squareArray.indexOf(e.target);
    console.log("Index " + index + " clicked.");
    
    let win =  checkForWin(currentPlayer, squareArray);
    playerDisplay.innerHTML = currentPlayer;

    if(win) return;
    
    messageLabel.innerHTML = "";

    if(squares[index].classList.contains('playerX') || squares[index].classList.contains('playerO'))
    {
      console.log('already selected - bale out!');
      playerDisplay.innerHTML = currentPlayer;
      messageLabel.innerHTML = "square already selected";
      return;
    }

    squares[index].classList.add(currentPlayer)
    if(checkForWin(currentPlayer, squareArray)) {
      return;
    }
    
    currentPlayer = _swapPlayer(currentPlayer);
    playerDisplay.innerHTML = currentPlayer;
  }

  function clearBoard(e)
  {
    squares.forEach(square => {
      clearPlayerClass(square, 'playerX');
      clearPlayerClass(square, 'playerO');
    });

    currentPlayer = _swapPlayer(currentPlayer);
    playerDisplay.innerHTML = currentPlayer;
    messageLabel.innerHTML = "Game Reset";
    return;
  }

  function clearPlayerClass(e, className)
  {
    if(e.classList.contains(className))
    {
      e.classList.remove(className);
    }
  }

  function checkForWin(className, squareArray)
  {
    let won = false;

    // rows
    won = _checkforThree(won, squareArray[0] ,squareArray[1], squareArray[2], className);
    won = _checkforThree(won, squareArray[3] ,squareArray[4], squareArray[5], className);
    won = _checkforThree(won, squareArray[6] ,squareArray[7], squareArray[8], className);
    
    // columns
    won = _checkforThree(won, squareArray[0] ,squareArray[3], squareArray[6], className);
    won = _checkforThree(won, squareArray[1] ,squareArray[4], squareArray[7], className);
    won = _checkforThree(won, squareArray[2] ,squareArray[5], squareArray[8], className);

    // diag
    won = _checkforThree(won, squareArray[0] ,squareArray[4], squareArray[8], className);
    won = _checkforThree(won, squareArray[2] ,squareArray[4], squareArray[6], className);

    if(won) messageLabel.innerHTML = className + " won!";
    
    return won;
  }

  function _checkforThree(currentWin, e1, e2, e3, className)
  {
    if (currentWin)
    {
      return currentWin;
    }
    return (e1.classList.contains(className) && e2.classList.contains(className) && e3.classList.contains(className));
  }

  function _swapPlayer(currentPlayer)
  {
    return (currentPlayer === "playerX")? "playerO" : "playerX"; 
  }
})
