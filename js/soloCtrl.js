app.controller('soloCtrl', function ($scope, $http, $location, $cookies, StateFactory, CompMovesFactory, GameFactory, CompPlayerFactory) { 

    var globals = {};

    // Here Come the Factory Functions:

        // sorts possible comp moves in ascending order returns integer
    CompMovesFactory.ascend = (firstAction, secondAction) => {
        if(firstAction.miniMaxScore < secondAction.miniMaxScore)
            return -1; //indicates that firstAction goes before secondAction
        else if(firstAction.miniMaxScore > secondAction.miniMaxScore)
            return 1; //indicates that secondAction goes before firstAction
        else
            return 0; //indicates a tie
    }
    // sorts possible comp moves in descending order returns integer
    CompMovesFactory.descend = (firstAction, secondAction) => {
        if(firstAction.miniMaxScore > secondAction.miniMaxScore)
            return -1; //indicates that firstAction goes before secondAction
        else if(firstAction.miniMaxScore < secondAction.miniMaxScore)
            return 1; //indicates that secondAction goes before firstAction
        else
            return 0; //indicates a tie
    }

    GameFactory.score = function(_state) {
        if(_state.result === "X-won"){
            // the human player won with "n" amount of moves
            return 10 - _state.movesCounter;
        }
        else if(_state.result === "O-won") {
            //the computer won with "n" amount of moves
            return _state.movesCounter - 10;
        }
        else {
            //it's a draw
            return 0;
        }
    }


    $(".level").each(function() {
        var $this = $(this);
        $this.click(function() {
            $('.selected').toggleClass('not-selected');
            $('.selected').toggleClass('selected');
            $this.toggleClass('not-selected');
            $this.toggleClass('selected');
            CompPlayerFactory.level = $this.attr("id");
        });
    });

    // Grabs the difficultyLevel selected and prepares the conditions for the beginning of the game
    $(".start").click(function() {
        var diffLevel = $('.selected').attr("id");
        if(typeof diffLevel !== "undefined") {
            var aiPlayer = new CompPlayerFactory(diffLevel);
            globals.game = new GameFactory(aiPlayer);
            aiPlayer.plays(globals.game);
            globals.game.start();
        }else{
            alert('Please Pick a Skill Level for the AI');
        }
    });

    $(".cell").each(function() {
        var $this = $(this);
        $this.click(function() {
            if(globals.game === undefined){
                alert('Please Pick a Skill Level for the AI');
            }else if(globals.game.status === "running" && globals.game.currentState.turn === "X" && !$this.hasClass('occupied')){
                var cell = parseInt($this.attr('id'));
                var nextState = new StateFactory(globals.game.currentState);
                nextState.board[cell] = "X";
                insertAt(cell, "X");
                nextState.advanceTurn();
                globals.game.advanceTo(nextState);
            }
         });
    });


    //holds the state of the intial controls visibility
    intialControlsVisible = true;
    //holds the current visible view
    currentView = "";
    /*
     * starts the flickering effect of the robot image
     */
    flashingBot = function() {
        robotFlickeringHandle = setInterval(function() {
            $("#robot").toggleClass('robot');
        }, 500);
    };

    // Switches the notifications at the bottom of the page
    switchViewTo = function(turn) {
        //helper function for async calling
        function _switch(_turn) {
            currentView = "#" + _turn;
            $(currentView).fadeIn("fast");
            flashingBot();
        }
        if(intialControlsVisible){
            //if the game is just starting
            intialControlsVisible = false;
            $('.intial').fadeOut({
                duration : "slow",
                done : function() {
                    _switch(turn);
                }
            });
        }else{
            //if the game is in an intermediate state
            $(currentView).fadeOut({
                duration: "fast",
                done: function() {
                    _switch(turn);
                }
            });
        }
    };

    // actually marks the board with either an "X" or "O"
    insertAt = function(indx, symbol) {
        var board = $('.cell');
        var targetCell = $(board[indx]);
        if(!targetCell.hasClass('occupied')) {
            targetCell.html(symbol);
            targetCell.css({
                color : symbol == "X" ? "rgb(135,250,179)" : "rgb(250,135,206)"
            });
            targetCell.addClass('occupied');
        }
    }    

});
