
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////       Blackjack: A game built in vanilla js.
////
////
////       UNIT TESTING: To turn on unit testing, change the test_running variable to TRUE; Tests will be run and
////        shown in the console. Scroll down to view the unit testing 
////        function and see what parameters it takes and what default variables it creates. 
////
        var test_running = false;
////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////  UNIT TEST: To use unit test, change the test_running variable to true (above).  Test automatically
////  creates 4 players and a dealer with a fresh deck. Change test_running to false to turn off testing
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


function unit_test(function1, expected, name_of_test, times, arguments){
    window.alert = function() {};
    if(test_running === true){

        // DEFAULT VARIABLES TO TEST CASES
        num_players = 5;
        counter = 1;
        var length1 = times;

        //Used to test the calculate_winner function. Lose key values are set at real settings.
        players = [ 0, player = {hand: ['five_heart'], hand_value: 5, lose: false, name: "Joshua"}, player = {hand: ['five_spades', "ten_heart", "jack_clubs"], hand_value: 25, lose: true, name: "Sophia"}, player = {hand: ['nine_diamonds', 'six_clubs'], hand_value: 15, lose: false, name: "Esther"}, player = {hand: ['king_clubs', 'ace_heart'], hand_value: 21, lose: false, name: "Paul"}]

        //Used to test the check_lose function. lose key values are all set to false.
        players2 = [ 0, player = {hand: ['five_heart'], hand_value: 5, lose: false, name: "Joshua"}, player = {hand: ['five_spades', "ten_heart", "jack_clubs"], hand_value: 25, lose: false, name: "Sophia"}, player = {hand: ['nine_diamonds', 'six_clubs'], hand_value: 15, lose: false, name: "Esther"}, player = {hand: ['king_clubs', 'ace_heart'], hand_value: 21, lose: false, name: "Paul"}]

        var test_result = "PASSED"

      
        
            for(var i=1; i<length1+1; i++){
                if(arguments){
                    // console.log(arguments[i-1]);
                    if(function1(arguments[i-1]) === expected[i-1]){

                    }
                }
                else if(function1() === expected[i-1]){

                }
                else{
                    test_result = "FAILED";
                }
            }
            console.log(name_of_test + " : " + test_result);
        

    }
    else{
        console.log("TESTING IS TURNED OFF");
    }
   
}



//Diplays in the console instructions for running unit test and unit test status. 
function display1(){
    if(test_running){
        console.log("Unit Testing is Running. Please Set Unit testing to 'false' to play the game.")
        console.log("PLEASE START GAME TO SEE Button Switch Unit Test")
    }
    else{
        console.log("Unit Testing is turned off and application is running in game mode. Please set Unit testing to 'true' to see unit tests of functions.")
    }
}

display1();


///////////////////////////////////////////// END UNIT TEST //////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////  Global Variables  //////////////////////////////////////////////////

//Default game Deck
var deck1;

//Array that keeps track of players. New players are pushed into this array. 0 is a placeholder for the zero index.
var players = [0];
var players2 = [0];

//Counter keeps track of which players turn it is.
var counter = 1;

//Var to keep track of the number of players
var num_players = 0;

//Global length variable for testing.
var length1;
////////////////////////////////////    End Global Variables    ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////    FUNCTIONS    ///////////////////////////////////////////////////////



//Disables the start game button after start and enables the rest of the game control buttons.
function able_switch(){
    $(".disabled_button").prop("disabled",true);
    $(".enabled_button").prop("disabled",false);
    var status = false;
    var disabled = document.getElementsByClassName("disabled_button");
    var enabled = document.getElementsByClassName("enabled_button");
    for(var i=0; i<disabled.length; i++){
        if(disabled[0].disabled){
            status = true;
            // console.log("true1")
        }
        else{
            return false;
            // console.log("false1")
        }
    }
    for(var j=0; j<enabled.length; j++){
        if(enabled[0].disabled){
            return false;
            // console.log("false2")
        }
        else{
            status = true;
            // console.log("true2")
        }
    }
    return status;
}

//able switch test is on or near line 366


//Cycles the turn to the next player. If the last player hits this function,
// it invokes the function to calculate the winner

function next_turn(){
    //if its the last player's turn, it will invoke the calculate winner function.
    if(counter === num_players){
        calculate_winner();
        var calculation = "calculating winner"
        return(calculation);
    }

    //Logic for dealer drawing cards. Automatically draws two cards. Dealer holds on 17.
    if(counter === num_players -1){
        counter++;
        var dealer_draw = function(){
            players[counter].draw(deck1);
        }
        dealer_draw();
        dealer_draw();
        while(players[counter].hand_value < 17){
            setTimeout( dealer_draw(), 8000 );
        }
        if(players[counter].hand_value > 21){
            players[counter].lose = true;
        }
        next_turn();

    }
    //Skip to next players turn
    else{
        counter++;
        // console.log("here " + players[counter]['name']);
        alert("It is " + players[counter].name +"'s turn.");
        return(players[counter]['name']);
    }

};

unit_test(next_turn, ["Sophia", "Esther", "Paul"], "next_turn", 3);




//Check if a player has lost and automatically skips to the next players turn if they have.
//1. Checks if the players hand is over 21. If it is your turn, skips your turn and moved on and
//2. Appends lost status to activity.
//3. Automatically call the next_turn function. 
function check_lose(player){
    // console.log("player: " + player);
    // console.log(players)
    if(player['hand_value'] > 21){
        player.lose = true;
    }
    if(player.lose === true){
        $( "#"+player.name+"_score" ).html( "YOU LOST! - Hand Value: "+player.hand_value+"" );
        $(".activity").append("<li>" + player.name + " LOST!!!</li>");
        next_turn();
        return true;
    }
    else if(player.lose === false){
        return false;
    }
}

unit_test(check_lose, [false, true, false, false], "check_lose", 4, [players2[1], players2[2], players2[3], players2[4]]);
// function unit_test(function1, expected, name_of_test, times, arguments)




////Calculates the highest score among people who have not gone over 21
function calculate_winner(){
    var num_max = 0;
    var max = 0;
    var winner;
    var ties = [];
    var ands = [""];

    // forEach(1, players, function(players){
    //     if(players.hand_value > max && players.lose === false){
    //             max = players.hand_value;
    //             winner = players.name;
    //         }
    // });
    for(var i=1; i<players.length; i++){
        if(players[i].hand_value > max && players[i].lose === false){
            max = players[i].hand_value;
            winner = players[i].name;
        }
    }


    // forEach(1, players, function(players){
    //     if(players.hand_value === max){
    //         ties.push(counter);
    //         num_max += 1;
    //         ands.unshift("<p style = 'text-align: center;'>&<p>");
    //     }
    // })
    for(var j=1; j<players.length; j++){
        if(players[j].hand_value === max){
            ties.push(j);
            num_max += 1;
            ands.unshift("<p style = 'text-align: center;'>&<p>");
        }
    }
    if(num_max === 1){
        $( "#title").html( "<h1>PLAYERS - "+winner+" is the winner!!</h1>" );
    //$("#winners_slot").append("<div>"+winner+" is the winner!!"+"</div>")
    }
    else{
        $( "#title").html( "<h1>PLAYERS - " +num_max+ " Push: </h1>" );
        for(var k=0; k<ties.length; k++){
            $( "#title").append("<h2 style = 'text-align: center;'> Player "+players[ties[k]].name+ " " + ands[k+1] +"</h2>");
        }

    }
    return winner;
    
}

unit_test(calculate_winner, ["Paul"], "calculate_winner", 1);

function draw_card(){
    players[counter].draw(deck1);
    // console.log(players[counter].name);
    check_lose(players[counter]);

}
/////////////////////////////////////////    END FUNCTIONS    ////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////    CONSTRUCTORS    /////////////////////////////////////////////////



//Creating a new Deck
var deck = function(){
    this.cards = this.default_cards;
    this.dealt = [];
    //randomly shuffles the deck.
    this.shuffle = function() {
        $(".activity").append("<li>Shuffled Deck!</li>")
        var counter = this.cards.length, temp, index;
        while (counter > 0) {
            index = Math.floor(Math.random() * counter);
            counter--;
            temp = this.cards[counter];
            this.cards[counter] = this.cards[index];
            this.cards[index] = temp;
        }
        return this.cards;

    };
    //resets the deck to initial state
    this.reset = function(){
        $(".activity").append("<li>Deck Reset!</li>")
        this.cards = [];
        for(var i=0; i<this.reset_cards.length; i++){
            this.cards.push(this.reset_cards[i]);
        }
        return (this.cards);
    };


    //deal card function. Takes in a player as the argument
    this.deal = function(argument){
        $(".activity").append("<li>" + players[counter].name +" drew a "+ this.cards[0] +"</li>");
        //$('#'+players[counter].name).append(''+this.cards[0]+'<br>')
        $('#'+players[counter].name).append("<img src='"+deck1.object_cards_pics[this.cards[0]]+"' style = 'width: 50px;height: 73px;'>");


        //<img src="images/2_of_clubs.png" style = "width: 5%;height: 5%;">

        console.log("Dealt a " + this.cards[0] );
        var drawn_card = this.cards[0];
        this.dealt.push(this.cards[0]);
        this.cards.splice(0,1);
        argument.hand.push(drawn_card);
        argument.checkhand(deck1);
    };

};

//default cards is originally unshuffled  deck but can be shuffled with the shuffle function.
deck.prototype.default_cards = ['two_heart', 'two_spades', 'two_diamonds', "two_clubs", 'three_heart', 'three_spades', 'three_diamonds', "three_clubs", 'four_heart', 'four_spades', 'four_diamonds', "four_clubs", 'five_heart', 'five_spades', 'five_diamonds', "five_clubs", 'six_heart', 'six_spades', 'six_diamonds', "six_clubs", 'seven_heart', 'seven_spades', 'seven_diamonds', "seven_clubs", 'eight_heart', 'eight_spades', 'eight_diamonds', "eight_clubs", 'nine_heart', 'nine_spades', 'nine_diamonds', "nine_clubs", 'ten_heart', 'ten_spades', 'ten_diamonds', "ten_clubs", 'jack_heart', 'jack_spades', 'jack_diamonds', "jack_clubs", 'queen_heart', 'queen_spades', 'queen_diamonds', "queen_clubs", 'king_heart', 'king_spades', 'king_diamonds', "king_clubs", 'ace_heart', 'ace_spades', 'ace_diamonds', "ace_clubs"];

//Deck used to reset default cards
deck.prototype.reset_cards = ['two_heart', 'two_spades', 'two_diamonds', "two_clubs", 'three_heart', 'three_spades', 'three_diamonds', "three_clubs", 'four_heart', 'four_spades', 'four_diamonds', "four_clubs", 'five_heart', 'five_spades', 'five_diamonds', "five_clubs", 'six_heart', 'six_spades', 'six_diamonds', "six_clubs", 'seven_heart', 'seven_spades', 'seven_diamonds', "seven_clubs", 'eight_heart', 'eight_spades', 'eight_diamonds', "eight_clubs", 'nine_heart', 'nine_spades', 'nine_diamonds', "nine_clubs", 'ten_heart', 'ten_spades', 'ten_diamonds', "ten_clubs", 'jack_heart', 'jack_spades', 'jack_diamonds', "jack_clubs", 'queen_heart', 'queen_spades', 'queen_diamonds', "queen_clubs", 'king_heart', 'king_spades', 'king_diamonds', "king_clubs", 'ace_heart', 'ace_spades', 'ace_diamonds', "ace_clubs"];

//deck represented as a object with key values to store card values
deck.prototype.object_cards = {'two_heart': 2, 'two_spades': 2, 'two_diamonds': 2, "two_clubs": 2, 'three_heart': 3, 'three_spades': 3, 'three_diamonds': 3, "three_clubs": 3, 'four_heart': 4, 'four_spades': 4, 'four_diamonds': 4, "four_clubs": 4, 'five_heart': 5, 'five_spades': 5, 'five_diamonds': 5, "five_clubs": 5, 'six_heart': 6, 'six_spades': 6, 'six_diamonds': 6, "six_clubs": 6, 'seven_heart': 7, 'seven_spades': 7, 'seven_diamonds': 7, "seven_clubs": 7, 'eight_heart': 8, 'eight_spades': 8, 'eight_diamonds': 8, "eight_clubs": 8, 'nine_heart': 9, 'nine_spades': 9, 'nine_diamonds': 9, "nine_clubs": 9, 'ten_heart': 10, 'ten_spades': 10, 'ten_diamonds': 10, "ten_clubs": 10, 'jack_heart': 10, 'jack_spades': 10, 'jack_diamonds': 10, "jack_clubs": 10, 'queen_heart': 10, 'queen_spades': 10, 'queen_diamonds': 10, "queen_clubs": 10, 'king_heart': 10, 'king_spades': 10, 'king_diamonds': 10, "king_clubs": 10, 'ace_heart': 11, 'ace_spades': 11, 'ace_diamonds': 11, "ace_clubs": 11};

//deck represented as a object with key values to store card picture source addresses
deck.prototype.object_cards_pics = {'two_heart': "images/2_of_hearts.png", 'two_spades': "images/2_of_spades.png", 'two_diamonds': "images/2_of_diamonds.png", "two_clubs": "images/2_of_clubs.png", 'three_heart': "images/3_of_hearts.png", 'three_spades': "images/3_of_spades.png", 'three_diamonds': "images/3_of_diamonds.png", "three_clubs": "images/3_of_clubs.png", 'four_heart': "images/4_of_hearts.png", 'four_spades': "images/4_of_spades.png", 'four_diamonds': "images/4_of_diamonds.png", "four_clubs": "images/4_of_clubs.png", 'five_heart': "images/5_of_hearts.png", 'five_spades': "images/5_of_spades.png", 'five_diamonds': "images/5_of_diamonds.png", "five_clubs": "images/5_of_clubs.png", 'six_heart': "images/6_of_hearts.png", 'six_spades': "images/6_of_spades.png", 'six_diamonds': "images/6_of_diamonds.png", "six_clubs": "images/6_of_clubs.png", 'seven_heart': "images/7_of_hearts.png", 'seven_spades': "images/7_of_spades.png", 'seven_diamonds': "images/7_of_diamonds.png", "seven_clubs": "images/7_of_clubs.png", 'eight_heart': "images/8_of_hearts.png", 'eight_spades': "images/8_of_spades.png", 'eight_diamonds': "images/8_of_diamonds.png", "eight_clubs": "images/8_of_clubs.png", 'nine_heart': "images/9_of_hearts.png", 'nine_spades': "images/9_of_spades.png", 'nine_diamonds': "images/9_of_diamonds.png", "nine_clubs": "images/9_of_clubs.png", 'ten_heart': "images/10_of_hearts.png", 'ten_spades': "images/10_of_spades.png", 'ten_diamonds': "images/10_of_diamonds.png", "ten_clubs": "images/10_of_clubs.png", 'jack_heart': "images/jack_of_hearts.png", 'jack_spades': "images/jack_of_spades.png", 'jack_diamonds': "images/jack_of_diamonds.png", "jack_clubs": "images/jack_of_clubs.png", 'queen_heart': "images/queen_of_hearts.png", 'queen_spades': "images/queen_of_spades.png", 'queen_diamonds': "images/queen_of_diamonds.png", "queen_clubs": "images/queen_of_clubs.png", 'king_heart': "images/king_of_hearts.png", 'king_spades': "images/king_of_spades.png", 'king_diamonds': "images/king_of_diamonds.png", "king_clubs": "images/king_of_clubs.png", 'ace_heart': "images/ace_of_hearts.png", 'ace_spades': "images/ace_of_spades.png", 'ace_diamonds': "images/ace_of_diamonds.png", "ace_clubs": "images/ace_of_clubs.png"};


//creating a new player. Has a draw card, discard card, and checkhand method
var player = function(name){
    this.name = name;
    this.hand = [];
    this.hand_value = 0;
    this.lose = false;
};



//Draws a card from the deck used in argument and pushes the card into the current players hand
player.prototype.draw = function(deck){
    deck.deal(this);
};
//Discards the last card in this players hand
player.prototype.discard = function(){
    this.hand.pop();
};
//Checks the total value of cards in the players hand
player.prototype.checkhand = function(deck){
    this.hand_value = 0;
    for(var i=0; i<this.hand.length; i++){
        this.hand_value += deck.object_cards[this.hand[i]];
    }
    console.log(this.name + " has a hand value of " + this.hand_value);
    $( "#"+this.name+"_score" ).html( "Hand Value: "+this.hand_value+"" );
};




var dealer = {
    create_dealer : function(){
        var firstname = "Dealer";
        var firstname_score = "Dealer_score"
        num_players += 1;
        players.push("Dealer")
        players[num_players] = new player("Dealer");
        $(".activity").append("<li> Dealer joined the Game!</li>")
        $('#players').append('<div id="' + firstname + '"><h3>' + firstname + '</h3><div id="' + firstname_score + '">Hand Value: 0</div></div>');
    }
}


//Invokes the start of the game. Creates players. Creates a new deck.
var game = function(){



    deck1 = new deck();
    num_players_1 = prompt("Welcome to Blackjack! How many players (1-4) do we have?");
    if(num_players_1 != '' && num_players_1 != null) {
        num_players = parseInt(num_players_1);
        if(isNaN(num_players)){
            alert("Number of players must be a numerical input (0,1,2,3,4,5,6,7,8,9)");
            return;
        }
        for (var i = 1; i <= num_players; i++) {
            var firstname = prompt("What is Player " + i + "'s Name?");
            var firstname_score = firstname + "_score";
            $(".activity").append("<li>" + firstname + " joined the Game!</li>")
            players.push(firstname);
            players[i] = new player("" + firstname + "");
            //$( "#players" ).append( "<div id = firstname>"+firstname+"</div>" );
            $('#players').append('<div id="' + firstname + '"><h3>' + firstname + '</h3><div id="' + firstname_score + '">Hand Value: 0</div></div>');

        }
        able_switch();
        dealer.create_dealer();

        /////able_switch test
        unit_test(able_switch, [true], "able_switch", 1)

    }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////









