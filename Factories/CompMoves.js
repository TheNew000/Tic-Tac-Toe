app.factory('CompMovesFactory', function(StateFactory){

    var CompMoves = function(cell) {
        // the cell to be marked
        this.markCell = cell;
        // the value of the state that the marked cell could lead to
        this.miniMaxScore = 0;
        // starts creating the "tree" of states to see into the depth of possibilities
        this.applyTo = function(state) {
            var next = new StateFactory(state);
            //mark the cell with the appropriate letter
            next.board[this.markCell] = state.turn;
            if (state.turn === "O"){
                next.movesCounter++;
            }
            next.advanceTurn();
            return next;
        }
    };
    return CompMoves;
});
