app.factory('GameFactory', function(StateFactory){
    
    // creates a "game object"
    var Game = function(compPlayer) {
        // initialize computer Player
        this.comp = compPlayer;
        // initialize the state of the board as it stands
        this.currentState = new StateFactory();
        //null stands for empty board cell
        this.currentState.board = [null, null, null,
                                   null, null, null,
                                   null, null, null];
        this.currentState.turn = "X"; //X plays first
        // initialize status to the beginning of the game
        this.status = "beginning";
        // advances the game to the next "state"
        this.advanceTo = function(_state) {
            this.currentState = _state;
            if(_state.checkWinner()) {
                this.status = "ended";
                var array = _state.checkWinner();
                if(_state.result === "X-won"){
                    for (var i = 0; i < array.length; i++) {
                        $('#' + array[i]).addClass('winner');
                    }
                    switchViewTo("won");
                }else if(_state.result === "O-won"){
                    for (var i = 0; i < array.length; i++) {
                        $('#' + array[i]).addClass('winner');
                    }
                    switchViewTo("lost");
                }else{
                    switchViewTo("draw");
                }
                
                markWinCells = function (a, b, c) {
                    var board = $('.cell');
                    $(board[a]).addClass('winner');
                    $(board[b]).addClass('winner');
                    $(board[c]).addClass('winner');
                }
            }else{
                //the game is still running
                if(this.currentState.turn === "X") {
                    switchViewTo("human");
                }else{
                    switchViewTo("comp");
                    //computer turn
                    this.comp.compDifficulty("O");
                }
            }
        };
        // begins the game
        this.start = function() {
            if(this.status = "beginning") {
                //invoke advanceTo with the intial state
                this.advanceTo(this.currentState);
                this.status = "running";
            }
        }
    };

    return Game;

});
