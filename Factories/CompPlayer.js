app.factory('CompPlayerFactory', function(StateFactory, CompMovesFactory, GameFactory){

    // Computer Player Functionality
    var CompPlayer = function(level) {
        var game = {};
        // minimax algorithm!!  Here it is folks:
        function miniMax(state) {
            // If game is finished the rest of the function doesn't need to run
            if(state.checkWinner()) {
                return GameFactory.score(state);
            }else{
                // Depending on who is playing will depend on whether the computer is trying to minimize or maximize
                var miniMaxScore = (state.turn === "X") ? -100 : 100;
                var openCell = state.emptyCells();
                //create a "tree of possibilities" using the open cells
                var possStates = openCell.map(function(pos) {
                    var action = new CompMovesFactory(pos);
                    var nextState = action.applyTo(state);
                    return nextState;
                });
                // calculate the miniMaxScore for all the branches of possible states
                possStates.forEach(function(nextState) {
                    var nextScore = miniMax(nextState);
                    if(state.turn === 'X'){
                        if (nextScore > miniMaxScore){
                            miniMaxScore = nextScore;
                        } 
                    }else{
                        if(nextScore < miniMaxScore){
                            miniMaxScore = nextScore
                        } 
                    }
                });
                return miniMaxScore;
            }
        }

        this.plays = function(_game){
            game = _game;
        };

        this.compDifficulty = (turn) => {
            var availCells = game.currentState.emptyCells();
            if(level == 'blind'){
                var cellRandom = availCells[Math.floor(Math.random() * availCells.length)];
                var possMove = new CompMovesFactory(cellRandom);
                var nextState = possMove.applyTo(game.currentState);
                insertAt(cellRandom, turn);
                game.advanceTo(nextState);
            }else if(level == 'master' || level == 'novice'){
                //calculate the score for all the possible branch possibilities
                var availActions = availCells.map(function(pos) {
                    //create the object for the next move
                    var possMove =  new CompMovesFactory(pos); 
                    //get next state by applying the possMove
                    var nextState = possMove.applyTo(game.currentState); 
                    //calculate and set the possMove minmax value
                    possMove.miniMaxScore = miniMax(nextState); 
                    return possMove;
                });
                //sort the possible Moves list by score if it's the human players turn then sort the actions in a descending manner to have the possible Move with minimum miniMax value first otherwise sort in an ascending manner to have the poss move with maximum miniMax value first
                var upOrDown = (turn === "X") ? CompMovesFactory.descend : CompMovesFactory.ascend;
                availActions.sort(upOrDown);
                // either choose the possibility for a randomly less optimal position for the novice or the most optimal position for the master  If it's the novice level then it will choose an optimum move only 60% of the time
                if(level == 'novice'){
                    var chosenMove = Math.random()*100 <= 60 ? availActions[0] : (availActions.length >= 2 ? availActions[1] : availActions[0]);
                }else{  
                    var chosenMove = availActions[0];
                }
                var nextMove = chosenMove.applyTo(game.currentState);
                // Physically mark the chosen cell 
                insertAt(chosenMove.markCell, turn);
                game.advanceTo(nextMove);
            }
        }
    };

return CompPlayer;

});
