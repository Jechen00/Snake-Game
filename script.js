var snake = [];
var borderCells = [];
var boardSize = 15;
var food = null;
var cellNum = null;
var facing = null;
var pTime = null;
var tileChange = null;
var points = 0;
var status = "Alive";

start();

$("body").keyup(function() {
    clearInterval(pTime);
    pTime = setInterval(momentum, 100);
    endGame();
});

$("body").keydown(function(e) {
    if (status === "Alive") {
        if (e.which === 37 && facing !== "Right") {
            tileChange = -1;
            eat();
            moveLeft();
            clearInterval(pTime);
        } else if (e.which === 39 && facing !== "Left") {
            tileChange = 1;
            eat();
            moveRight();
            clearInterval(pTime);
        } else if (e.which === 38 && facing !== "Down") {
            tileChange = -(boardSize + 2);
            eat();
            moveUp();
            clearInterval(pTime);
        } else if (e.which === 40 && facing !== "Up") {
            tileChange = (boardSize + 2);
            eat();
            moveDown();
            clearInterval(pTime);
        }
    }
    endGame();
});

$("button").click(function() {
    snake = [];
    borderCells = [];
    boardSize = 15;
    food = null;
    cellNum = null;
    facing = null;
    pTime = null;
    tileChange = null;
    points = 0;
    $("#board").empty();
    start();
});

function gameBoard(row, column) {
    $("#board").css("width", (row + 2) * 30);
    $("#board").css("height", (row + 2) * 30);
    border(row, column);
    for (var i = 0; i < (row + 2) * (column + 2); i++) {
        var tile = $("<div><div>");
        tile.attr("class", "box cell" + (i + 1));
        $("#board").append(tile);
        if (borderCells.includes(".cell" + (i + 1))) {
            $(".cell" + (i + 1)).css("background-color", "#006600");
        }
    }
    createSnake(column + 2);
    spawnFood(column, row);
}

function border(limitX, limitY) {
    for (var i = 0; i < (limitX + 2) * (limitY + 2); i++) {
        if ((i + 1) % (boardSize + 2) === 1 || (i + 1) % (boardSize + 2) === 0) {
            borderCells.push(".cell" + (i + 1));
        }
        if ((1 <= (i + 1) && (i + 1) <= boardSize + 2) || ((boardSize + 2) * (boardSize + 1) + 1 <= (i + 1) && (i + 1) <= (boardSize + 2) ^ 2)) {
            borderCells.push(".cell" + (i + 1));
        }
    }
}

function colorSnake() {
    for (var i = 0; i < snake.length; i++) {
        if (i === 0) {
            $(snake[i]).css("background-color", "black");
        } else {
            $(snake[i]).css("background-color", "#ff6600");
        }
    }
}

function createSnake(boardLength) {
    var center = (Math.round(boardLength / 2) * boardLength) - (Math.round(boardLength / 2) - 1);
    snake[0] = ".cell" + center;
    snake[1] = ".cell" + (center - 1);
    snake[2] = ".cell" + (center - 2);
    snake[3] = ".cell" + (center - 3);
    colorSnake();
}

function moveLeft() {
    cellNum = snake[0].replace(".cell", "");
    cellNum = parseInt(cellNum) + tileChange;
    snake.unshift(".cell" + cellNum);
    $(snake[snake.length - 1]).css("background-color", "#009933");
    snake.pop();
    facing = "Left";
    colorSnake();
}

function moveRight() {
    cellNum = snake[0].replace(".cell", "");
    cellNum = parseInt(cellNum) + tileChange;
    snake.unshift(".cell" + cellNum);
    $(snake[snake.length - 1]).css("background-color", "#009933");
    snake.pop();
    facing = "Right";
    colorSnake();
}

function moveUp() {
    cellNum = snake[0].replace(".cell", "");
    cellNum = parseInt(cellNum) + tileChange;
    snake.unshift(".cell" + cellNum);
    $(snake[snake.length - 1]).css("background-color", "#009933");
    snake.pop();
    facing = "Up";
    colorSnake();
}

function moveDown() {
    cellNum = snake[0].replace(".cell", "");
    cellNum = parseInt(cellNum) + tileChange;
    snake.unshift(".cell" + cellNum);
    $(snake[snake.length - 1]).css("background-color", "#009933");
    snake.pop();
    facing = "Down";
    colorSnake();
}

function spawnFood(limitX, limitY) {
    var random = Math.floor(Math.random() * (limitX * limitY)) + 1;
    while (snake.includes(".cell" + random) || borderCells.includes(".cell" + random)) {
        random = Math.floor(Math.random() * (limitX * limitY)) + 1;
    }
    food = ".cell" + random;
    $(food).css("background-color", "red");

}

function eat() {
    var next = snake[0].replace(".cell", "");
    next = parseInt(next) + tileChange;
    if (".cell" + next === food) {
        snake.push(food);
        points += 1;
        $("#points").text("Score: " + points);
        spawnFood(boardSize, boardSize);
    }
}

function momentum() {
    if (facing === "Left") {
        tileChange = -1;
        eat();
        moveLeft();
    } else if (facing === "Right") {
        tileChange = 1;
        eat();
        moveRight();
    } else if (facing === "Up") {
        tileChange = -(boardSize + 2);
        eat();
        moveUp();
    } else if (facing === "Down") {
        tileChange = (boardSize + 2);
        eat();
        moveDown();
    }
    endGame();
}

function endGame() {
    for (var i = 1; i < snake.length; i++) {
        if (snake[0] === snake[i] || borderCells.includes(snake[0])) {
            $(snake[0]).css("background-color", "white");
            $("#points").text("Final Score: " + points);
            status = "Dead";
            clearInterval(pTime);
            $("#endPage").show();
        }
    }
}

function start() {
    $("#points").text("Score: " + points);
    gameBoard(boardSize, boardSize);
    colorSnake();
    status = "Alive";
    $("#endPage").hide();
}