
// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const GameOverSound = new Audio('music/gameover.mp3')
const MoveSound = new Audio('music/move.mp3');
const MusicSound = new Audio('music/music.mp3');
let speed = 6;
let score = 0;
let lastPaintTime = 0;
window.requestAnimationFrame(main);
let snakeArr = [
    { x: 13, y: 15 }
]

food = { x: 5, y: 7 };

// Game Function

if (score > 5) {
    speed = 8;
}

else if (score > 8) {
    speed = 10;
}

else if (score > 15) {
    speed = 13;
}

else if (score > 20) {
    speed = 16;
}

else if (score > 25) {
    speed = 19;
}

else if (score > 32) {
    speed = 22;
}

else {
    speed = 6;
}
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    lastPaintTime = ctime;
    GameEngine();
}

function isCollide(snake) {
    // If you bump into yoursefl
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // if you hit the boundary
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}
function GameEngine() {
    // Part 1 :Updating snake array &  Food


    if (isCollide(snakeArr)) {
        location.reload();
        GameOverSound.play();
        MusicSound.pause();
        MoveSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over!. Press Enter To Play Again");
        snakeArr = [
            { x: 13, y: 15 }
        ]
        score = 0;
        MusicSound.play();
        MoveSound.play();
    }

    // If you eaten the food , encriment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = `High Score: ${hiscoreval}`

        }
        scoreBox.innerHTML = `Score: ${score}`
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }


    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2 : Display the snake and food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        sankeElement = document.createElement('div');
        sankeElement.style.gridRowStart = e.y;
        sankeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            sankeElement.classList.add('head');
        }
        else {
            sankeElement.classList.add('snake');
        }
        board.appendChild(sankeElement);
    })

    // Display the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}

// Main Logic starts From Here 
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}

else {
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = `High Score: ${hiscore}`
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }; // Start The Game
    MusicSound.play();

    switch (e.key) {
        case "ArrowUp":
            MoveSound.play();
            inputDir.x = 0;
            inputDir.y = -1;
            break;


        case "ArrowDown":
            MoveSound.play();
            inputDir.x = 0;
            inputDir.y = 1;
            break;


        case "ArrowLeft":
            MoveSound.play();
            inputDir.x = -1;
            inputDir.y = 0;
            break;


        case "ArrowRight":
            MoveSound.play();
            inputDir.x = 1;
            inputDir.y = 0;
            break;


        default:
            break;
    }
});