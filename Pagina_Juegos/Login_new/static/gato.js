 const spanX = document.getElementById('x')
 const spanO = document.getElementById('o')
 const spanE = document.getElementById('e')
 let origBoard;
 let huPlayer ='O';
 let aiPlayer = 'X';
 let contX = 0;
 let contO = 0;
 let contE = 0;
 const winCombos =[
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 4, 8],
   [6, 4, 2],
   [2, 5, 8],
   [1, 4, 7],
   [0, 3, 6]
 ];
 
 const cells = document.querySelectorAll('.cell');
 startGame();
 
 function selectSym(sym){
   start();
   huPlayer = sym;
   aiPlayer = sym === 'O' ? 'X' :'O';
   origBoard = Array.from(Array(9).keys());
   for (let i = 0; i < cells.length; i++) {
     cells[i].addEventListener('click', turnClick, false);
   }
   if (aiPlayer === 'X') {
     turn(bestSpot(),aiPlayer);
   }
   document.querySelector('.selectSym').style.display = "none";
 }
 
 function startGame() {
   document.querySelector('.endgame').style.display = "none";
   document.querySelector('.endgame .text').innerText ="";
   document.querySelector('.selectSym').style.display = "block";
   for (let i = 0; i < cells.length; i++) {
     cells[i].innerText = '';
     cells[i].style.removeProperty('background-color');
   }

 }
 
  window.onload = () => {
    m = 0;
    s = 0;
    mls = 0;
    timeStarted = 0;
    time = document.getElementById("time");
    btnStart = document.getElementById("btn-start");
    btnStop = document.getElementById("btn-stop");
    btnReset = document.getElementById("btn-reset");
    btnStart.addEventListener("click", start);
    btnStop.addEventListener("click", stop);
    btnReset.addEventListener("click", reset);
  };

  function write() {
    let ht, mt, st, mlst;
    mls++;

    if (mls > 99) {
      s++;
      mls = 0;
    }
    if (s > 59) {
      m++;
      s = 0;
    }
    if (m > 59) {
      h++;
      m = 0;
    }

    mlst = ('0' + mls).slice(-2);
    st = ('0' + s).slice(-2);
    mt = ('0' + m).slice(-2);
    
    time.innerHTML = `${mt}:${st}.${mlst}`;
  }

  function start() {
    write();
    timeStarted = setInterval(write, 10);
  }

  function stop() {
    clearInterval(timeStarted);
  }
 function turnClick(square) {
   if (typeof origBoard[square.target.id] ==='number') {
     turn(square.target.id, huPlayer);
     if (!checkWin(origBoard, huPlayer) && !checkTie())  
       turn(bestSpot(), aiPlayer);
   }
 }
 
 function turn(squareId, player) {
   origBoard[squareId] = player;
   console.log("jugador:"+player)
   document.getElementById(squareId).innerHTML = player;
   if(document.getElementById(squareId).innerHTML === 'O'){
    document.getElementById(squareId).style.color = "white";
   }else {
    document.getElementById(squareId).style.color = "black";

   }
   let gameWon = checkWin(origBoard, player);
   if (gameWon) gameOver(gameWon);
 }
 
 function checkWin(board, player) {
   let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
   let gameWon = null;
   for (let [index, win] of winCombos.entries()) {
     if (win.every(elem => plays.indexOf(elem) > -1)) {
       gameWon = {index: index, player: player};
       break;
     }
   }
   return gameWon;
 }
 
 function gameOver(gameWon){
   for (let index of winCombos[gameWon.index]) {
     document.getElementById(index).style.backgroundColor = 
       gameWon.player === huPlayer ? "blue" : "red";
   }
   for (let i=0; i < cells.length; i++) {
     cells[i].removeEventListener('click', turnClick, false);
   }
   console.log("EL ganador de la partida es: "+gameWon.player)
   if (gameWon.player === 'X'){
    ++contX;
    spanX.textContent = contX
   } else {
    ++contO;
    spanO.textContent = contO
   }
   declareWinner(gameWon.player === huPlayer ? "¡Has ganado!" : "Perdiste.");
 }
 
 function declareWinner(who) {
   document.querySelector(".endgame").style.display = "block";
   document.querySelector(".endgame .text").innerText = who;
 }
 function emptySquares() {
   return origBoard.filter((elm, i) => i===elm);
 }
   
 function bestSpot(){
   return minimax(origBoard, aiPlayer).index;
 }
   
 function checkTie() {
   if (emptySquares().length === 0){
     for (cell of cells) {
       cell.style.backgroundColor = "gold";
       cell.removeEventListener('click',turnClick, false);
     }
     declareWinner("Empate.");
     console.log("Me cicle")
     ++contE;
     spanE.textContent = contE
     return true;
   } 
   return false;
 }
 
 function minimax(newBoard, player) {
   
   var availSpots = emptySquares(newBoard);
   
   if (checkWin(newBoard, huPlayer)) {
     return {score: -10};
   } else if (checkWin(newBoard, aiPlayer)) {
     return {score: 10};
   } else if (availSpots.length === 0) {
     return {score: 0};
   }
   
   var moves = [];
   for (let i = 0; i < availSpots.length; i ++) {
     var move = {};
     move.index = newBoard[availSpots[i]];
     newBoard[availSpots[i]] = player;
     
     if (player === aiPlayer)
       move.score = minimax(newBoard, huPlayer).score;
     else
        move.score =  minimax(newBoard, aiPlayer).score;
     newBoard[availSpots[i]] = move.index;
     if ((player === aiPlayer && move.score === 10) || (player === huPlayer && move.score === -10))
       return move;
     else 
       moves.push(move);
   }
   
   let bestMove, bestScore;
   if (player === aiPlayer) {
     bestScore = -1000;
     for(let i = 0; i < moves.length; i++) {
       if (moves[i].score > bestScore) {
         bestScore = moves[i].score;
         bestMove = i;
       }
     }
   } else {
       bestScore = 1000;
       for(let i = 0; i < moves.length; i++) {
       if (moves[i].score < bestScore) {
         bestScore = moves[i].score;
         bestMove = i;
       }
     }
   }
   
   return moves[bestMove];
 }