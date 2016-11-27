$(document).ready(function() {
    function d6(min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }
    // Turn counter
    var turnCounter = 0;
    //Player 1 HP variables
    var player1HPTotal = 100;
    var player1HPTag = $('#player_1_hp p');
    var player1HP = parseInt(player1HPTag.text());
    //Player 2 HP Varibales
    var player2HPTotal = 100;
    var player2HPTag = $('#player_2_hp p');
    var player2HP = parseInt(player1HPTag.text());
    //AK shot profile
    function akShotResult(dieroll){
        akResults = [];
        if(dieroll == 6){
            shotResult = 20;
            resultText = 'You rolled a 6, LUCKY SHOT!';
        } else if(dieroll == 5) {
            shotResult = 14;
            resultText = 'You rolled a 5,Direct Hit!';
        } else if(dieroll == 4){
            shotResult = 14
            resultText = 'You rolled a 4, Normal hit'
        } else if(dieroll == 3){
            shotResult = 3;
            resultText = 'You rolled a 3, Weak shot...';
        } else if(dieroll == 2){
            shotResult = 0;
            resultText = 'You rolled a 2, You missed!';
        } else if(dieroll == 1){
            shotResult = 0;
            resultText = 'You rolled a 1, Critical FAIL!';
        }
        akResults.push(shotResult);
        akResults.push(resultText);

        return akResults;
    }

    $( ".two_hander" ).on('click',function() {
        event.stopPropagation();
        if(turnCounter == 0){
            dieroll = d6(1,6);
            akShotResult(dieroll);
            player1HPTotal = Number(player1HPTotal) - akResults[0];
            player1HPTag.text(player1HPTotal)
            $(".activity").append(`<p>${akResults[1]},${akResults[0]} Damage dealt </p>`)
            turnCounter = 2;
        }
    });
    $( ".one_hander" ).on('click',function() {
        event.stopPropagation();
        if(turnCounter < 2){
            dieroll = d6(1,6);
            akShotResult(dieroll);
            if($(this).parent('.first_player_box').length){
                console.log('this was clicked from first player box');
                akShotResult(dieroll);
                player2HPTotal = Number(player2HPTotal) - akResults[0];
                player2HPTag.text(player2HPTotal)
                $(".activity").append(`<p>Player 1, ${akResults[1]},${akResults[0]}  Damage dealt </p>`)
                turnCounter += 1;
                console.log(turnCounter);

            }
            if($(this).parent('.second_player_box').length){
                console.log('this was clicked from second player box');
                akShotResult(dieroll);
                player1HPTotal = Number(player1HPTotal) - akResults[0];
                player1HPTag.text(player1HPTotal)
                $(".activity").append(`<p>Player 2, ${akResults[1]},${akResults[0]}  Damage dealt </p>`)
                turnCounter += 1;

            }
        }
    

    });

    $('.second_player_box').hide();
    $('.endturn').on('click',function(){
        if(turnCounter == 2){
        $('.first_player_box, .second_player_box').toggle()
        turnCounter = 0;
        }
    });


});