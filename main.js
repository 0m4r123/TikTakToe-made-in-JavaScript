const inputs = document.querySelectorAll("input"); //Lägger alla inputs i en variabel.
let clicks = 0; //En räknare som håller koll på hur många klick som gjorts
let theWinner = false; //Finns det en vinnare?
document.getElementById("print").innerHTML =
  "The game begun, player X make your move.";
for (let input of inputs) {
  //En funktion som känner av tryck på alla inputs
  input.addEventListener("click", (evt) => {
    //En funktion som känner av tryck på rutorna
    const id = evt.target.id; //Lägger id på rutan i en variabel
    const buttonNr = id[1]; //Lägger in siffran i id på rutan i en variabel
    if (clicks % 2 === 0) {
      // Spelet börjar, X börjar sen skiftar jag till O
      document.getElementById("b" + `${buttonNr}`).value = "X"; //Lägger till X i rutan
      document.getElementById("b" + `${buttonNr}`).disabled = true; // Inaktiverar rutan
      checkWinner();
      document.getElementById("print").innerHTML = "Player O make your move."; //Ändrar texten till O
    } else {
      document.getElementById("b" + `${buttonNr}`).value = "O"; //Lägger till O i rutan
      document.getElementById("b" + `${buttonNr}`).disabled = true; // Inaktiverar rutan
      checkWinner();
      document.getElementById("print").innerHTML = "Player X make your move."; //Ändrar texten till X
    }

    clicks++;
  });
}

function checkWinner() {
  checkIfAllInputsAreFilled();
  //En funktion som kollar om det finns en vinnare
  class WinnerChecker {
    constructor() {
      this.inputs = [
        // En array med alla inputs
        //pass these inputs to const firstRow etc
        document.getElementById("b1").value, // 0
        document.getElementById("b2").value, // 1
        document.getElementById("b3").value, // 2
        document.getElementById("b4").value, // 3
        document.getElementById("b5").value, // 4
        document.getElementById("b6").value, // 5
        document.getElementById("b7").value, // 6
        document.getElementById("b8").value, // 7
        document.getElementById("b9").value, // 8
      ];
    }

    check(sign = "X" || "O" || "x" || "o") {
      // "X" eller "O" eller "x" eller "o"
      const firstRow = this.inputs[0] + this.inputs[1] + this.inputs[2]; //Första raden 0,1,2
      const secondRow = this.inputs[3] + this.inputs[4] + this.inputs[5]; // Andra raden 3,4,5
      const thirdRow = this.inputs[6] + this.inputs[7] + this.inputs[8]; // Tredje raden 6,7,8
      const firstColumn = this.inputs[0] + this.inputs[3] + this.inputs[6]; // Första kolumnen 0,3,6
      const secondColumn = this.inputs[1] + this.inputs[4] + this.inputs[7]; // Andra kolumnen 1,4,7
      const thirdColumn = this.inputs[2] + this.inputs[5] + this.inputs[8]; // Tredje kolumnen 2,5,8
      const diagonal1 = this.inputs[0] + this.inputs[4] + this.inputs[8]; // Diagonal 1 0,4,8
      const diagonal2 = this.inputs[2] + this.inputs[4] + this.inputs[6]; // Diagonal 2 2,4,6
      if (
        // Om någon av dessa är lika med "XXX" eller "OOO" så har någon vunnit.
        firstRow === sign.repeat(3) || // 0,1,2
        secondRow === sign.repeat(3) || // 3,4,5
        thirdRow === sign.repeat(3) || // 6,7,8
        firstColumn === sign.repeat(3) || // 0,3,6
        secondColumn === sign.repeat(3) || // 1,4,7
        thirdColumn === sign.repeat(3) || // 2,5,8
        diagonal1 === sign.repeat(3) || // 0,4,8
        diagonal2 === sign.repeat(3) // 2,4,6
      ) {
        document.getElementById("print").innerHTML = "The winner is " + sign;
        theWinner = true; // Finns det en vinnare? Ja
        //Markera vinnande rutor i grönt för skoj skull.
        if (firstRow === sign.repeat(3)) {
          document.getElementById("b1").style.backgroundColor = "#2ecc71";
          document.getElementById("b2").style.backgroundColor = "#2ecc71";
          document.getElementById("b3").style.backgroundColor = "#2ecc71";
        } else if (secondRow === sign.repeat(3)) {
          document.getElementById("b4").style.backgroundColor = "#2ecc71";
          document.getElementById("b5").style.backgroundColor = "#2ecc71";
          document.getElementById("b6").style.backgroundColor = "#2ecc71";
        } else if (thirdRow === sign.repeat(3)) {
          document.getElementById("b7").style.backgroundColor = "#2ecc71";
          document.getElementById("b8").style.backgroundColor = "#2ecc71";
          document.getElementById("b9").style.backgroundColor = "#2ecc71";
        } else if (firstColumn === sign.repeat(3)) {
          document.getElementById("b1").style.backgroundColor = "#2ecc71";
          document.getElementById("b4").style.backgroundColor = "#2ecc71";
          document.getElementById("b7").style.backgroundColor = "#2ecc71";
        } else if (secondColumn === sign.repeat(3)) {
          document.getElementById("b2").style.backgroundColor = "#2ecc71";
          document.getElementById("b5").style.backgroundColor = "#2ecc71";
          document.getElementById("b8").style.backgroundColor = "#2ecc71";
        } else if (thirdColumn === sign.repeat(3)) {
          document.getElementById("b3").style.backgroundColor = "#2ecc71";
          document.getElementById("b6").style.backgroundColor = "#2ecc71";
          document.getElementById("b9").style.backgroundColor = "#2ecc71";
        } else if (diagonal1 === sign.repeat(3)) {
          document.getElementById("b1").style.backgroundColor = "#2ecc71";
          document.getElementById("b5").style.backgroundColor = "#2ecc71";
          document.getElementById("b9").style.backgroundColor = "#2ecc71";
        } else if (diagonal2 === sign.repeat(3)) {
          document.getElementById("b3").style.backgroundColor = "#2ecc71";
          document.getElementById("b5").style.backgroundColor = "#2ecc71";
          document.getElementById("b7").style.backgroundColor = "#2ecc71";
        }
        for (let input of inputs) {
          input.disabled = true; //stäng av alla inputs så att spelet inte kan fortsätta
        }
      }
    }
  }

  //få igång winnerchecker
  const winnerChecker = new WinnerChecker();
  winnerChecker.check("X"); //kolla om X har vunnit
  winnerChecker.check("O"); //kolla om O har vunnit
}

// function som kollar alla input är ifyllda och ingen har vunnit
function checkIfAllInputsAreFilled() {
  let allInputsAreFilled = true;
  for (let input of inputs) {
    if (input.value === "") {
      allInputsAreFilled = false;
    }
  }
  // timmer som triggar functionen ändringen av texten med någon mili sekunds delay.
  setTimeout(function () {
    //setTimeout är en funktion som triggar en annan funktion efter en viss tid.
    if (allInputsAreFilled && !theWinner) {
      //om alla inputs är ifyllda och ingen har vunnit
      document.getElementById("print").innerHTML = "It's a tie!"; // Om alla inputs är ifyllda och ingen har vunnit så är det oavgjort.
    }
  }, 1);
}
document.getElementById("but").onclick = function () {
  //En funktion som startar om spelet
  clicks = 0; //Räknaren nollställs
  theWinner = false; // Startar om spelet genom att återställa värdet till false
  document.getElementById("print").innerHTML =
    "The game has restarted, player X make your move."; //Återställer texten
  for (let i = 1; i < 10; i++)
    for (let a = 0; a < 9; a++) {
      document.getElementById("b" + i).disabled = false;
      document.getElementById("b" + i).style.backgroundColor = "#FFF";
      const elements = document.querySelectorAll("input"); //Lägger alla inputs i en variabel.
      elements[+a].value = ""; // Tar bort X och O i rutona så ett nytt spel kan påbörjas.
    }
};
