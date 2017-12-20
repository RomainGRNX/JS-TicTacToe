var table = document.getElementById("tic-tac-toe");
for(var i=0; i<3; i++){
  for(var j=0; j<3; j++){
    table.rows[i].cells[j].addEventListener("click", cellClick, false);
  }
}

var current_player = "player1";

window.addEventListener("load", function(){setInterval(update, 10);}, false);
function update(){

}

function cellClick(){
  if(this.className == ""){
    this.className = current_player;
    if(current_player == "player1") current_player = "player2";
    else current_player = "player1";
  }
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
}
