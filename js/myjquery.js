$(document).ready(function() {
    //dice roll function
    function d6() {
        return Math.ceil(Math.random() * (6));
    }
    $('.winner').hide();
    // Turn counter
    var turnTag = $('#turn');
    var turn = parseInt(turnTag.text());
    var turnTotal = 1;
    var turnCounter = 0;
    //Player 1 HP variables
    var player1HPTotal = 100;
    var player1HPTag = $('#p1hp');
    var player1HP = parseInt(player1HPTag.text());
    //Player 2 HP Varibales
    var player2HPTotal = 100;
    var player2HPTag = $('#p2hp');
    var player2HP = parseInt(player1HPTag.text());
    //AK shot profile
    function akShotResult(dieroll){
        akResults = [];
        if(dieroll == 6){
            shotResult = 30;
            resultText = 'You rolled a 6, LUCKY SHOT!';
        } else if(dieroll == 5) {
            shotResult = 10;
            resultText = 'You rolled a 5,Direct Hit!';
        } else if(dieroll == 4){
            shotResult = 10
            resultText = 'You rolled a 4, Normal hit'
        } else if(dieroll == 3){
            shotResult = 5;
            resultText = 'You rolled a 3, Weak shot...';
        } else if(dieroll == 2){
            shotResult = 0;
            resultText = 'You rolled a 2, You missed!';
        } else if(dieroll == 1){
            shotResult = 4;
            resultText = 'You rolled a 1, Critical FAIL!';
        }
        akResults.push(shotResult);
        akResults.push(resultText);

        return akResults;
    }
    //Revolver profile goes below
    function revolverShotResult(dieroll){
        revolverResults = [];
        if(dieroll == 6){
            shotResult = 16;
            resultText = 'You rolled a 6, LUCKY SHOT!';
        } else if(dieroll == 5) {
            shotResult = 8;
            resultText = 'You rolled a 5, Direct Hit!';
        } else if(dieroll == 4){
            shotResult = 8;
            resultText = 'You rolled a 4, Normal hit'
        } else if(dieroll == 3){
            shotResult = 4;
            resultText = 'You rolled a 3, Weak shot...';
        } else if(dieroll == 2){
            shotResult = 0;
            resultText = 'You rolled a 2, You missed!';
        } else if(dieroll == 1){
            shotResult = 4;
            resultText = 'You rolled a 1, Critical FAIL!';
        }
        revolverResults.push(shotResult);
        revolverResults.push(resultText);

        return revolverResults;
    }
    //Pistol profile goes below

    $( ".two_hander" ).on('click',function() {
        event.stopPropagation();
        if(turnCounter == 0){
            dieroll = d6();
            akShotResult(dieroll);
            if($(this).parent('.first_player_box').length){
                //rolling a 1 penalty
                if(dieroll == 1){
                    player1HPTotal = Number(player1HPTotal) - akResults[0];
                    player1HPTag.text(player1HPTotal)
                    $(".activity_player1").prepend(`<p>${akResults[1]} self inflicting ${akResults[0]} damage!</p>`)
                    winnerCheck()
                } else {
                    player2HPTotal = Number(player2HPTotal) - akResults[0];
                    player2HPTag.text(player2HPTotal)
                    if(dieroll == 6){
                        $(".activity_player1").prepend(`<p class='red'>${akResults[1]} AK47 deals ${akResults[0]} damage</p>`)
                    } else {
                        $(".activity_player1").prepend(`<p>${akResults[1]} AK47 deals ${akResults[0]} damage</p>`)
                    }
                }
                
            }
            if($(this).parent('.second_player_box').length){
                if(dieroll == 1){
                    player2HPTotal = Number(player2HPTotal) - akResults[0];
                    player2HPTag.text(player2HPTotal)
                    $(".activity_player2").prepend(`<p>${akResults[1]} self inflicting ${akResults[0]} damage!</p>`)
                } else {
                    player1HPTotal = Number(player1HPTotal) - akResults[0];
                    player1HPTag.text(player1HPTotal)
                    if(dieroll == 6){
                        $(".activity_player2").prepend(`<p class='red'>${akResults[1]} the AK47 deals ${akResults[0]} damage</p>`)
                    }else{
                        $(".activity_player2").prepend(`<p>${akResults[1]} the AK47 deals ${akResults[0]} damage</p>`)
                    }
                }    
            }
            console.log(dieroll);
            turnCounter = 2;
            winnerCheck();    
        }
    });
    // one hander does not prevent the same one hander being used at this time
    $( ".one_hander" ).on('click',function() {
        event.stopPropagation();
        if(turnCounter < 2){
            if($(this).parent('.first_player_box').length){
                dieroll = d6();
                revolverShotResult(dieroll);
                player2HPTotal = Number(player2HPTotal) - revolverResults[0];
                player2HPTag.text(player2HPTotal)
                $(".activity_player1").prepend(`<p>${revolverResults[1]}  ${revolverResults[0]}  Damage dealt </p>`)
                turnCounter += 1;

            }
            if($(this).parent('.second_player_box').length){
                dieroll = d6();
                revolverShotResult(dieroll);
                player1HPTotal = Number(player1HPTotal) - revolverResults[0];
                player1HPTag.text(player1HPTotal)
                $(".activity_player2").prepend(`<p>${revolverResults[1]}  ${revolverResults[0]}  Damage dealt </p>`)
                turnCounter += 1;

            }
            console.log(dieroll)
            winnerCheck();
        }
    

    });

    $('.second_player_box').hide();
    $('.endturn').on('click',function(){
        if(turnCounter == 2){
        $('.first_player_box, .second_player_box').toggle()
        turnCounter = 0;
        turnTotal += .5;
        turnTag.text(Math.floor(turnTotal))
        console.log(turnTotal)
        }
    });

    //End of game check
    function winnerCheck(){
        if(player1HPTotal <= 0){
            $('.winner').prepend(`<p>Player 2 has won the duel!</p>`);
            $('.winner').show();
            $('#container').hide()
        }
        if(player2HPTotal <= 0){
            $('.winner').prepend(`<p>Player 1 has won the duel!</p>`);
            $('.winner').show();
            $('#container').hide()
        }
    } 
    $('.restart').click(function() {
        location.reload();
    });   
});
