let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); // trata como um plano 2d
let box = 32;
let snake = [];
snake[0] = { 
    x: 8 * box, 
    y: 8 * box
}

let direction = "right";

let food = { // comida aparecera aleatoriamente no mapa
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle ="lightgreen"; // muda a cor de fundo
    context.fillRect(0,0,16 * box, 16 * box); // cria a caixa com o tamanho desejado
}

//crece a cobrinha aparitir da codernada da cabeça
function criarCobrinha(){
    for (i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawFood(){
    context.fillStyle = "red";
        context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}


function iniciarJogo(){
    // faz a cobrinha nunca sair da tela, mas sim aparecer do outro lado
    if(snake[0].x > 15 * box && direction =='right') snake[0].x = 0; 
    if(snake[0].x < 0 && direction =='left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction =='down') snake[0].y = 0;
    if(snake[0].y < 0 && direction =='up') snake[0].y = 16 * box;

    //verifica se a cobra se enrrosca
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y ){
            clearInterval(iniciarJogo);
            alert('Game Over :(')
        }
    }

    // cria o espaço e a cobrinha
    criarBG();
    criarCobrinha();
    drawFood();

    //definindo a moviemntacao da cobra
    let snakeX = snake[0].x, snakeY = snake[0].y;

    if(direction == 'right') snakeX += box;
    if(direction == 'left') snakeX -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;

    // definindo se a comida foi devorada ou não
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    
    //faz as novas posicoes da cobra
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); // coloca no inicio do array
}

let jogo = setInterval(iniciarJogo, 100);


