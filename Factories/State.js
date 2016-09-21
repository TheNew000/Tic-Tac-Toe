app.factory('StateFactory', function(){

    var State = function(old) {
        this.turn = "";
        this.movesCounter = 0;
        this.result = "still running";
        this.board = [];
        // checking to see if this is a brand new state or will we construct one off of a previous one
        if(typeof old !== "undefined") {
            // this sets the new board to the values of the one passed into the function
            var len = old.board.length;
            this.board = new Array(len);
            for(var i = 0 ; i < len ; i++) {
                this.board[i] = old.board[i];
            }
            this.movesCounter = old.movesCounter;
            this.result = old.result;
            this.turn = old.turn;
        }    
        this.advanceTurn = function() {
            this.turn = (this.turn === "X") ? "O" : "X";
        }
        this.emptyCells = function() {
            var cells = [];
            for(var l = 0; l < 9 ; l++) {
                if(this.board[l] === null) {
                    cells.push(l);
                }
            }
            return cells;
        }
        // Check to see if anyone has won/ any of the diagonals/rows/columns are completed
        this.checkWinner = function() {
            var winCombo = [];
            var board = this.board;
            //check rows
            for(var i = 0; i <= 6; i = i + 3){
                if(board[i] !== null && board[i] === board[i + 1] && board[i + 1] === board[i + 2]){
                    this.result = board[i] + "-won"; //update the state result
                    winCombo.push(i, i+1, i+2);
                    return winCombo;
                }
            }
            //check columns
            for(var i = 0; i <= 2 ; i++) {
                if(board[i] !== null && board[i] === board[i + 3] && board[i + 3] === board[i + 6]){
                    this.result = board[i] + "-won"; //update the state result
                    winCombo.push(i, i+3, i+6);
                    return winCombo;
                }
            }
            //check diagonals
            for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
                if(board[i] !== null && board[i] == board[i + j] && board[i + j] === board[i + (2*j)]) {
                    this.result = board[i] + "-won"; //update the state result
                    winCombo.push(i, i+j, i+(2*j));
                    return winCombo;
                }
            }
            var availableCells = this.emptyCells();
            // If there's no moves left then the game is a draw, otherwise keep playing
            if (availableCells.length == 0){
                this.result = "draw"; 
                return true;
            }else{
                return false; //update the state result
            } 
        };
    }
    return State;
});

