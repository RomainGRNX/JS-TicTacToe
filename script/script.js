var table = document.getElementById("tic-tac-toe");
for(var i=0; i<3; i++){
  for(var j=0; j<3; j++){
    table.rows[i].cells[j].addEventListener("click", cellClick, false);
  }
}

var end = false;
var current_player = "player1";
var step = 1;
var winner = "";

var scores = [0,0];

var view_scores = false;
var score_button = document.getElementById("scores-button");
score_button.onclick = function(){
  if(!end && !view_scores){
    view_scores = true;
    var scoresDiv = document.createElement("div");
    scoresDiv.id = "scores";
    scoresDiv.className = "text";
    var score1 = document.createElement("p");
    var msg1 = document.createTextNode("Player 1: "+scores[0]);
    score1.appendChild(msg1);
    scoresDiv.appendChild(score1);
    var score2 = document.createElement("p");
    var msg2 = document.createTextNode("Player 2: "+scores[1]);
    score2.appendChild(msg2);
    scoresDiv.appendChild(score2);
    document.body.appendChild(scoresDiv);
    document.getElementById("scores").addEventListener("click", backToGame, false);
  }
};

var give_up_button = document.getElementById("give-up-button");
give_up_button.onclick = function(){
  if(!end && !view_scores){
    end = true;
    console.log("Le player "+(current_player == "player1" ? 1 : 2)+" a abandonné!!!");
    scores[0] += (current_player == "player2" ? (11-step)*10 : 0);
    scores[1] += (current_player == "player1" ? (11-step)*10 : 0);
    setEndMsg("Le player "+(current_player == "player1" ? 2 : 1)+" gagne!");
  }
};

function backToGame(){
  view_scores = false;
  var scoresMsg = document.getElementById("scores");
  scoresMsg.parentNode.removeChild(scoresMsg);
}

window.addEventListener("load", function(){setInterval(update, 10);}, false);
function update(){
  if(!end){
    document.getElementById("infos").innerHTML = "Tour "+step+" / Joueur "+(current_player == "player1" ? 1 : 2)+" ";
    document.getElementById("infos").style.paddingRight = "50px";
  }
  else{
    document.getElementById("infos").innerHTML = "";
    document.getElementById("infos").style.paddingRight = "0";
  }
}

function cellClick(){
  if(!end && !view_scores){
    if(this.className == ""){
      console.log("Tour: "+step+" / Cellule "+(getCellIndex(this)+getRowIndex(this)*3)+" cliquée par le joueur "+(current_player == "player1" ? 1 : 2));
      this.className = current_player;
      if(current_player == "player1") current_player = "player2";
      else current_player = "player1";
      step++;
      if(win()){
        end = true;
        winner = checkWinner();
        scores[0] += (winner == "player1" ? (11-step)*10 : 0);
        scores[1] += (winner == "player2" ? (11-step)*10 : 0);
        setEndMsg("Le player "+(winner == "player1" ? 1 : 2)+" gagne!");
      }
      else if(step > 9){
        end = true;
        setEndMsg("Match nul!");
      }
    }
  }
}

function setEndMsg(p_msg){
  var msgDiv = document.createElement("div");
  msgDiv.id = "end-message";
  msgDiv.className = "text endAlert";
  var msg = document.createTextNode(p_msg+"\nNouvelle partie?");
  msgDiv.appendChild(msg);
  document.body.appendChild(msgDiv);
  document.getElementById("end-message").addEventListener("click", resetGame, false);
}

function checkWinner(){
  if(checkDiag1() || checkDiag2() || checkLine(1) || checkColumn(1)) return getCellState(1,1);
  else if(checkLine(0)) return getCellState(1,0);
  else if(checkLine(2)) return getCellState(1,2);
  else if(checkColumn(0)) return getCellState(0,1);
  else return getCellState(2,1);
}

function win(){
  return (checkDiag1() || checkDiag2() || checkLine(0) || checkLine(1) || checkLine(2) || checkColumn(0) || checkColumn(1) || checkColumn(2)) ? true : false;
}

function checkLine(p_c){
  return (getCellState(1,p_c) != "" && getCellState(1,p_c) == getCellState(0,p_c) && getCellState(1,p_c) == getCellState(2,p_c)) ? true : false;
}

function checkColumn(p_l){
  return (getCellState(p_l,1) != "" && getCellState(p_l,1) == getCellState(p_l,0) && getCellState(p_l,1) == getCellState(p_l,2)) ? true : false;
}

function checkDiag1(){
  return (getCellState(1,1) != "" && getCellState(1,1) == getCellState(0,0) && getCellState(1,1) == getCellState(2,2)) ? true : false;
}

function checkDiag2(){
  return (getCellState(1,1) != "" && getCellState(1,1) == getCellState(2,0) && getCellState(1,1) == getCellState(0,2)) ? true : false;
}

function getCellState(p_x, p_y){
  return getCell(p_x, p_y).className;
}

function getCell(p_x, p_y){
  return table.rows[p_y].cells[p_x];
}

function getRowIndex(p_cell){
  for(var i=0; i<3; i++){
    var line = table.rows[i];
    for(var j=0; j<3; j++){
      if(line.cells[j] == p_cell) return i;
    }
  }
}

function getCellIndex(p_cell){
  return p_cell.cellIndex;
}

function resetGame(){
  for(var i=0; i<3; i++){
    for(var j=0; j<3; j++){
      table.rows[i].cells[j].className = "";
    }
  }
  end = false;
  current_player = (scores[0] > scores[1] ? "player2" : "player1");
  step = 1;
  winner = "";
  var endMsg = document.getElementById("end-message");
  endMsg.parentNode.removeChild(endMsg);
  console.log("Score actuel -> Player 1: "+scores[0]+" / Player 2: "+scores[1]);
  console.log("Nouvelle partie...");
}
