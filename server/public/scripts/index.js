const { movePlayer } = require("./player.js");
const { calculator } = require("./calculator.js");
const { gradeCalculator } = require("./grade.js");
function getElement(key) {
  return document.getElementById(key);
}

const playerImages = {
  up: "Player_run_up.gif",
  down: "Player_run_down.gif",
  left: "Player_run_left.gif",
  right: "Player_run_right.gif",
  idle: "Player_idle.gif",
};

const baseAssetAddress = "asset/";

const element = {
  startGame: "start-game",
  boardGame: "board-game",
  player: "player",
  answerGrade: "answer-grade",
  gradeInput: "grade-input",
  number1: "number1",
  number2: "number2",
  gradeButton: "grade-button",
  plus: "+",
  minus: "-",
  multiple: "*",
  divide: "/",
  result: "result",
};

const startgame = document.getElementById(element.startGame);
let hasPress = false;

startgame.addEventListener("click", (e) => {
  startgame.style.display = "none";
  const gameboard = document.getElementById(element.boardGame);
  var elem = document.createElement("img");
  elem.setAttribute("src", baseAssetAddress + playerImages.idle);
  elem.setAttribute("height", "50");
  elem.setAttribute("width", "50");
  elem.setAttribute("id", element.player);
  elem.style.top = gameboard.style.top;
  elem.style.left = gameboard.style.left;
  elem.style.position = "absolute";

  gameboard.appendChild(elem);
  document.addEventListener("keypress", async (e) => {
    if (hasPress) return;

    const keyboardPressed = e.key;
    const player = getElement(element.player);
    const maxDistance = 50;
    hasPress = true;
    if (keyboardPressed === "w") {
      player.src = baseAssetAddress + playerImages.up;
      await movePlayer(player, "top", -maxDistance);
    } else if (keyboardPressed === "s") {
      player.src = baseAssetAddress + playerImages.down;
      await movePlayer(player, "top", maxDistance);
    } else if (keyboardPressed === "a") {
      player.src = baseAssetAddress + playerImages.left;
      await movePlayer(player, "left", -maxDistance);
    } else if (keyboardPressed === "d") {
      player.src = baseAssetAddress + playerImages.right;
      await movePlayer(player, "left", maxDistance);
    }
    player.src = baseAssetAddress + playerImages.idle;
    hasPress = false;
  });
});

const number1 = getElement(element.number1);
const number2 = getElement(element.number2);
const result = getElement(element.result);

const plus = getElement(element.plus);
plus.addEventListener("click", (e) => {
  result.innerText = calculator(+number1.value, +number2.value, element.plus);
});

const minus = getElement(element.minus);
minus.addEventListener("click", (e) => {
  result.innerText = calculator(+number1.value, +number2.value, element.minus);
});

const divide = getElement(element.divide);
divide.addEventListener("click", (e) => {
  result.innerText = calculator(+number1.value, +number2.value, element.divide);
});

const multiple = getElement(element.multiple);
multiple.addEventListener("click", (e) => {
  result.innerText = calculator(
    +number1.value,
    +number2.value,
    element.multiple
  );
});

const gradeButton = getElement(element.gradeButton);
const gradeInput = getElement(element.gradeInput);
const answerGrade = getElement(element.answerGrade);

gradeButton.addEventListener("click", (e) => {
  answerGrade.innerText = gradeCalculator(+gradeInput.value);
});
