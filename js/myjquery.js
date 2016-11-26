$(document).ready(function() {
    function d6(min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }
    //Player 1 HP variables
    var player1HPTotal = 100;
    var player1HPTag = $('#player_1_hp p');
    var player1HP = parseInt(player1HPTag.text());
    //Player 2 HP Varibales
    var player2HPTotal = 100;
    var player2HPTag = $('#player_1_hp p');
    //AK shot profile
    //alerts need be changed to append to html because alerts suck
    function akShotResult(dieroll){
        if(dieroll == 6){
            shotResult = 20;
            alert('You rolled a 6, LUCKY SHOT!');
        } else if(dieroll == 5) {
            shotResult = 14;
            alert('You rolled a 5,Direct Hit!');
        } else if(dieroll == 4){
            shotResult = 14
            alert('You rolled a 4, Normal hit.')
        } else if(dieroll == 3){
            shotResult = 3;
            alert('You rolled a 3, Weak shot...');
        } else if(dieroll == 2){
            shotResult = 0;
            alert('You rolled a 2, You missed!');
        } else if(dieroll == 1){
            shotResult = 0;
            alert('You rolled a 1, Critical FAIL!');
        }

        return shotResult;
    }

    $( ".two_hander" ).on('click',function() {
        console.log(d6(1,6));
        dieroll = d6(1,6);
        akShotResult(dieroll);
        player1HPTotal = Number(player1HPTotal) - shotResult;
        player1HPTag.text(player1HPTotal)

    });
    $( ".one_hander" ).on('click',function() {
        console.log(d6roll(1,6));
    });

});