app.controller('duoPlayCtrl', function ($scope, $http, $location, $cookies) {
    var whosTurn = 1; //start off on player 1's turn

    var winners = [
    ["A1", "A2", "A3"],
    ["B1", "B2", "B3"],
    ["C1", "C2", "C3"],
    ["A1", "B2", "C3"],
    ["A1", "B1", "C1"],
    ["A2", "B2", "C2"],
    ["A3", "B3", "C3"],
    ["A3", "B2", "C1"]
    ];


     //Array where we will stash the squares player1 has checked
    player1 = [];
    var player2 = []; //Array for player2
    var someoneWon = false;

    var A1 = document.getElementById('A1');
    var A2 = document.getElementById('A2');
    var A3 = document.getElementById('A3');
    var B1 = document.getElementById('B1');
    var B2 = document.getElementById('B2');
    var B3 = document.getElementById('B3');
    var C1 = document.getElementById('C1');
    var C2 = document.getElementById('C2');
    var C3 = document.getElementById('C3');

    var win1 = [["A3", "A2"], ["C3", "B2"], ["B1", "C1"]];
    var win2 = [["A3", "A1"], ["C2", "B2"]];
    var win3 = [["A1", "A2"], ["C1", "B2"], ["B3", "C3"]];
    var win4 = [["A1", "B2"], ["A3", "B3"], ["C2", "C1"]];
    var win5 = [["B2", "A3"], ["A1", "B1"], ["C2", "C3"]];
    var win6 = [["A2", "B2"], ["C1", "C3"]];
    var win7 = [["B3", "B2"], ["A1", "C1"]];
    var win8 = [["A3", "C3"], ["B1", "B2"]];
    var win9 = [["A3", "C1"], ["C3", "A1"], ["B3", "B1"], ["C2", "A2"]];



    var possCombo = [win1, win2, win3, win4, win5, win6, win7, win8, win9];


    // Functions for two players:

    $scope.markSquare = function (square){
        console.log(square.currentTarget);
        if(someoneWon){
            console.log("Someone already won");
        }else if(player1.indexOf(square.currentTarget.id) == -1 && player2.indexOf(square.currentTarget.id) == -1){
            if(whosTurn == 1){
                square.currentTarget.innerHTML = 'X';
                square.currentTarget.style.color = "rgb(135,250,179)";
                whosTurn = 2;
                player1.push(square.currentTarget.id);
                checkWin(player1, 1);
            }else{
                square.currentTarget.innerHTML = 'O';
                square.currentTarget.style.color = "rgb(250,135,206)";
                whosTurn = 1;
                player2.push(square.currentTarget.id);
                checkWin(player2, 2);
            }
        }else{
            alert("Somethings already there!! No cheating!!");
        }
    }

    function checkWin(currentPlayer, whoJustMarked){
        var rowCount = 0;
        // Loops through the outer array
        for (var i = 0; i < winners.length; i++) {
            // Loop through each row's (inner array)
            rowCount = 0;
            for (var j = 0; j < winners[i].length; j++) {
                if(currentPlayer.indexOf(winners[i][j]) > -1){
                    //HIT!
                    rowCount++;
                }
                if(rowCount == 3){
                    gameOver(whoJustMarked, winners[i]);
                }
            }
        }
    }

    function checkWin2(currentPlayer, whoJustPlayed){
        var rowCount = 0;
        // Loops through the outer array
        for (var i = 0; i < winners2.length; i++) {
            // Loop through each row's (inner array)
            rowCount = 0;
            for (var j = 0; j < winners2[i].length; j++) {
                if(currentPlayer.indexOf(winners2[i][j]) > -1){
                    //HIT!
                    rowCount++;
                }
                if(rowCount == 3){
                    gameOver(whoJustPlayed, winners2[i]);
                }
            }
        }
    }

    function gameOver(whoWon, winningCombo){
        var message = document.getElementById('message');
        if(whoWon == 1 || whoWon == 2){
            message.innerHTML = "Congratulations Player " + whoWon + "!! You slayed with " + winningCombo.join(', ');
        }else if(whoWon == 0){
            message.innerHTML = "Unfortunately you were slain with this combo: " + winningCombo.join(', ');
        }
        for (var i = 0; i < winningCombo.length; i++) {
            document.getElementById(winningCombo[i]).className += ' winner';
        }

    }

});
