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
    playerDisplay.innerHTML = currentPlayer;
    messageLabel.innerHTML = "";

    if(squares[index].classList.contains('playerX') || squares[index].classList.contains('playerO'))
    {
      console.log('already selected - bale out!');
      playerDisplay.innerHTML = currentPlayer;
      messageLabel.innerHTML = "square already selected";
      return;
    }

    if(currentPlayer === 'playerX') {
      squares[index].classList.add('playerX')
      currentPlayer = 'playerO'
    } else {
      squares[index].classList.add('playerO')
      currentPlayer = 'playerX'
    }

    playerDisplay.innerHTML = currentPlayer;
  }

  function clearBoard(e)
  {
    squares.forEach(square => {
      if(square.classList.contains('playerX'))
      {
        square.classList.remove('playerX')
      }
      if(square.classList.contains('playerO'))
      {
        square.classList.remove('playerO')
      }
    });

    playerDisplay.innerHTML = currentPlayer;
    messageLabel.innerHTML = "Game Reset";
    return;
  }
})
