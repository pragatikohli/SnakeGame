let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let cellSize = 50;
let width = 1500;
let height = 700;
let snake = [];
let canChangeDirection = true;

let score = 0;

let game;

const random = ()=>{
    let x =  Math.floor(Math.random()* (width/cellSize)) * cellSize;
    let y =  Math.floor(Math.random()* (height/cellSize)) * cellSize;

    if(x == 0 || y == 0 || x == width || y == height ) return random();
    for(let i=0; i<snake.length; i++){
        if(snake[i][0] === x && snake[i][1] === y) 
            return random();
    }

    return [x, y];
}

let food = random();

let direction

const gameOver = ()=>{
    let head = snake[snake.length -1];

    if(head[0] < 0 || head[0] >= width || head[1] < 0 || head[1] >= height) return true;

    for(let i=0; i<snake.length -1; i++){
        if(snake[i][0] === head[0] && snake[i][1] === head[1]) 
            return true;
    }

    return false;

}

const addFood = ()=>{

    ctx.fillStyle = 'orange';
    ctx.fillRect(food[0], food[1], cellSize, cellSize);

}


const draw = ()=>{
    
    if(gameOver()){
        clearInterval(game);
        if(confirm('Game over. Play Again?')){
            score = 0;
            startGame();
        }
    }

    ctx.clearRect(0, 0, width, height);
    addFood();
    for(let cell of snake){
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'white';
        ctx.fillRect(cell[0] , cell[1], cellSize, cellSize);
        ctx.strokeRect(cell[0] , cell[1], cellSize, cellSize);
    }
    ctx.font = '22px sans-sarif';
    ctx.fillText(`Score : ${score}`, 20, 20);
    
}


const eat = ()=>{

    let head = snake[snake.length -1];
    snake.push([head[0] + direction[0], head[1] + direction[1]]);
    ctx.fillRect(head[0] + direction[0], head[1] + direction[1], cellSize, cellSize);

    score += 10;
}

const update = ()=>{

    let head = snake[snake.length -1];
    snake.push([head[0] + direction[0], head[1] + direction[1]]);
    snake.shift();

    head = snake[snake.length -1];


    if(head[0] == food[0] && head[1] == food[1]){
        eat();
        food = random();
    }

}



document.addEventListener('keydown', (e)=>{

    
    switch(e.code){
        case "ArrowUp":
            if(direction[0] != 0 && direction[1] != cellSize && canChangeDirection) {
                direction = [0, -cellSize];
                canChangeDirection = false;
                setTimeout(() => {
                    canChangeDirection = true;
                }, 80);
            }
            break;

        case "ArrowDown":
            if(direction[0] != 0 && direction[1] != -cellSize && canChangeDirection) {
                direction = [0, cellSize];
                canChangeDirection = false;
                setTimeout(() => {
                    canChangeDirection = true;
                }, 80);
            }
            break;

        case "ArrowLeft":
            if(direction[0] != cellSize && direction[1] != 0 && canChangeDirection) {
                direction = [-cellSize, 0];
                canChangeDirection = false;
                setTimeout(() => {
                    canChangeDirection = true;
                }, 80);
            }
            break;

        case "ArrowRight":
            if(direction[0] != -cellSize && direction[1] != 0 && canChangeDirection) {
                direction = [cellSize, 0];
                canChangeDirection = false;
                setTimeout(() => {
                    canChangeDirection = true;
                }, 80);
            }
            break;

        // case "Space":
        //     eat();
        //     score-=10;
        //     break;
    }

    
}) 


const startGame = ()=>{

    snake = [[-cellSize,0]];
    direction = [cellSize, 0];

    addFood(food);

    game = setInterval(()=>{
        update();
        draw();
    }, 120);

}


startGame();

// Copyright Rahul Grover