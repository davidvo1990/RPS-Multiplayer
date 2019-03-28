// Initialize Firebase
var config = {
    apiKey: "AIzaSyAZQXpszs7ThkspsqNpBhD7CyemiZfij88",
    authDomain: "rps-multiplayer-c5787.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-c5787.firebaseio.com",
    projectId: "rps-multiplayer-c5787",
    storageBucket: "rps-multiplayer-c5787.appspot.com",
    messagingSenderId: "729360784289"
};
firebase.initializeApp(config);

var database = firebase.database();
var tie = 0;
var p1win = 0;
var p1loss = 0;
var p2win = 0;
var p2loss = 0;
//////////////////
//All function run here
refresh();
getData();
vs();
//////////////////
//remove all players data when new player join refresh
function refresh() {
    database.ref().remove();


    //tie = 0;
    //p1win = 0;
    //p1loss = 0;
    //p2win = 0;
    //p2loss = 0;
};
//END

//chat popup
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

/////////////////////////////////////////////////////////
//create player1 and player2
$(document).on("click", ".pickP1", function (event) {
    event.preventDefault();
    var bigDivP1 = $('<form class ="player-one"><div class="form-group"><lable for="player1">Player One Name:</lable><input type="text" class="form-control" id="player1"></div><div class="form-group"><div>Pick Rock, Paper, or Scissors</div><button type="submit" class="btn btn-primary choice1 mr-2" value="r" id="p1choice">Rock</button><button type="submit" class="btn btn-primary choice1 mr-2" value="p" id="p1choice">Paper</button><button type="submit" class="btn btn-primary choice1" value="s" id="p1choice">Scissor</button></div><button type="submit" class="btn btn-primary p1btn">Submit</button></form>')

    $(".Player1").html(bigDivP1);

    //$(document).off("click", ".pickP2")
});
//END

$(document).on("click", ".pickP2", function (event) {
    event.preventDefault();
    var bigDivP2 = $('<form class ="player-two"><div class="form-group"><lable for="player2">Player Two Name:</lable><input type="text" class="form-control" id="player2"></div><div class="form-group"><div>Pick Rock, Paper, or Scissors</div><button type="submit" class="btn btn-primary choice2 mr-2" value="r" id="p2choice">Rock</button><button type="submit" class="btn btn-primary choice2 mr-2" value="p" id="p2choice">Paper</button><button type="submit" class="btn btn-primary choice2" value="s" id="p2choice">Scissor</button></div><button type="submit" class="btn btn-primary p2btn">Submit</button></form>')

    $(".Player2").html(bigDivP2);

    //$(document).off("click", ".pickP1")
});
//END


//////////////////////////////////////////////////////


var p1Name;
var p1Choice = "";
$(document).on("click", ".choice1", function (event) {
    event.preventDefault();
    p1Choice = $(this).attr("value")
});
//END

$(document).on("click", ".p1btn", function (event) {
    event.preventDefault();

    if (p1Choice !== "") {
        console.log("Player 1 selected");

        p1Name = $("#player1").val().trim();
        //var p1Choice = $("#p1choice").val().trim();

        player1 = {
            p1Name: p1Name,
            p1Choice: p1Choice,
            //tie:tie,
            //win:p1win,
            //loss:p1loss
        }

        database.ref("/player1").set(player1);
        //clear out input box
        //$("#player1").val("");
    } else {
        console.log("Please pick either Rock, Paper or Scissors")
        $(".whowin").html("Please pick either Rock, Paper or Scissors");
    }

});
//END

var p2Choice = "";
var p2Name;
$(document).on("click", ".choice2", function (event) {
    event.preventDefault();
    p2Choice = $(this).attr("value")
});
//END

$(document).on("click", ".p2btn", function (event) {
    event.preventDefault();

    if (p2Choice !== "") {
        console.log("Player 2 selected");
        p2Name = $("#player2").val().trim();
        //var p2Choice = $("#p2choice").val().trim();

        player2 = {
            p2Name: p2Name,
            p2Choice: p2Choice,
            //tie:tie,
            //win:p2win,
            //loss:p2loss
        }

        database.ref("/player2").set(player2);

        //clear out input box
        //$("#player2").val("");
    } else {
        console.log("Please pick either Rock, Paper or Scissors")
        $(".whowin").html("Please pick either Rock, Paper or Scissors");
    }

});
//END
var keys;

var p1C;
var p2C;
function getData() {
    database.ref().on("value", function (snapshot) {
        p1C = snapshot.child("player1/p1Choice").val()
        p2C = snapshot.child("player2/p2Choice").val()
        //console.log("Player 1 pick "+p1C)
        //console.log("Player 2 pick "+p2C)

        //player 1 print out result
        var p1nameGet = snapshot.child("player1/p1Name").val();
        var p1winGet = snapshot.child("player1/win").val();
        var p1lossGet = snapshot.child("player1/loss").val();
        var p1tieGet = snapshot.child("player1/tie").val();

        if (p1nameGet !== null && p1winGet !== null && p1lossGet !== null && p1tieGet !== null) {
            var p1Div = $("<div class='p1Div'></div>")
            var p1nameDiv = $("<h3>Player 1: " + p1nameGet + "</h3>");
            var p1winDiv = $("<div>Win: " + p1winGet + "</div>")
            var p1lossDiv = $("<div>Loss: " + p1lossGet + "</div>")
            var p1tieDiv = $("<div>Tie: " + p1tieGet + "</div>")

            p1Div.append(p1nameDiv).append(p1winDiv).append(p1lossDiv).append(p1tieDiv)
            $(".data1").html(p1Div)
        }

        //player 2 print out result
        var p2nameGet = snapshot.child("player2/p2Name").val();
        var p2winGet = snapshot.child("player2/win").val();
        var p2lossGet = snapshot.child("player2/loss").val();
        var p2tieGet = snapshot.child("player2/tie").val();

        if (p2nameGet !== null && p2winGet !== null && p2lossGet !== null && p2tieGet !== null) {
            var p2Div = $("<div class='p2Div'></div>")
            var p2nameDiv = $("<h3>Player 2: " + p2nameGet + "</h3>");
            var p2winDiv = $("<div>Win: " + p2winGet + "</div>")
            var p2lossDiv = $("<div>Loss: " + p2lossGet + "</div>")
            var p2tieDiv = $("<div>Tie: " + p2tieGet + "</div>")

            p2Div.append(p2nameDiv).append(p2winDiv).append(p2lossDiv).append(p2tieDiv)
            $(".data2").html(p2Div)
        }

        //console.log(snapshot.child("player1/tie").val());


        if (snapshot.child("player1").exists()) {
            if (snapshot.child("player1/tie").exists()) {
                tie = snapshot.child("player1/tie").val();
            }
            if (snapshot.child("player1/win").exists()) {
                p1win = snapshot.child("player1/win").val();
            }
            if (snapshot.child("player1/loss").exists()) {
                p1loss = snapshot.child("player1/loss").val();
            }
            if (snapshot.child("player1/p1Name").exists()) {
                p1Name = snapshot.child("player1/p1Name").val();
            }
        }

        if (snapshot.child("player2").exists()) {
            if (snapshot.child("player2/tie").exists()) {
                tie = snapshot.child("player2/tie").val();
            }
            if (snapshot.child("player2/win").exists()) {
                p2win = snapshot.child("player2/win").val();
            }
            if (snapshot.child("player2/loss").exists()) {
                p2loss = snapshot.child("player2/loss").val();
            }
            if (snapshot.child("player2/p2Name").exists()) {
                p2Name = snapshot.child("player2/p2Name").val();
            }
        }


    })
};
//END

function chatmessage() {
    database.ref("/chatmessage/").on("child_added", function (snapshot) {
        //chat message print out 
        var idMessArr = snapshot.val()
        //keys = Object.values(idMessArr)
        //console.log(idMessArr)
        if (keys !== null) {
            //var chatprintout = $("<div id='chatprintout'>"+keys[keys.length-1]+"</div>")
            var chatprintout = $("<div id='chatprintout'>" + idMessArr + "</div>")
            var chatDiv = $("<div class='chatDiv'></div>")
            //chatDiv.prepend(chatprintout)
            //$(".text-display").prepend(chatDiv);
            $(".text-display").prepend(chatprintout);
        }
    })
};
//END
chat();
chatmessage();



function chat() {
    $(document).on("click", ".send", function (event) {
        var chatmess = $("#message").val().trim()
        //console.log(chatmess);

        database.ref().child("/chatmessage/").push(chatmess);

        //clear out the chat box
        $("#message").val("");
    })
};
//END

function rps() {
    if ((p1C !== null) && (p2C !== null)) {

        if (p1C === p2C) {
            tie++;
            $(".whowin").text("Tie!")
            database.ref().child("player1/p1Choice/").remove();
            database.ref().child("player2/p2Choice/").remove();
        } else if ((p1C === 'r' && p2C === 's') ||
            (p1C === 'p' && p2C === 'r') ||
            (p1C === 's' && p2C === 'p')) {
            p1win++;
            p2loss++;
            $(".whowin").text("Player 1 win!")
            database.ref().child("player1/p1Choice/").remove();
            database.ref().child("player2/p2Choice/").remove();
        } else {
            p2win++;
            p1loss++;
            $(".whowin").text("Player 2 win!")
            database.ref().child("player1/p1Choice/").remove();
            database.ref().child("player2/p2Choice/").remove();
        }

    } else {
        console.log("Please make your pick!")
    }


};
//END

function vs() {
    $(document).on("click", ".vs", function (event) {
        event.preventDefault();
        rps();


        //update firebase after compare
        database.ref("/player1/tie").set(tie);
        database.ref("/player2/tie").set(tie);
        database.ref("/player1/win").set(p1win);
        database.ref("/player2/win").set(p2win);
        database.ref("/player1/loss").set(p1loss);
        database.ref("/player2/loss").set(p2loss);

    });
}
//END

$(document).on("click", ".reset", function (event) {
    event.preventDefault();
    database.ref("player1/").remove();
    database.ref("player2/").remove();
    $(".data1").html("");
    $(".data2").html("");
    $(".whowin").html("");
    tie = 0;
    p1win = 0;
    p1loss = 0;
    p2win = 0;
    p2loss = 0;
    count = 0
});
//END

$(document).on("click", ".clear-chat", function (event) {
    event.preventDefault();
    database.ref("chatmessage/").remove();
    $(".text-display").html("");
});
//END