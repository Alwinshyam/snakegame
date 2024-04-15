const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Handle requests
  if (req.url === '/' || req.url === '/index.html') {
    // Set the response header
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Write the HTML content as a response
    res.write(`<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Snake Game</title>
        <style>
            /* Write CSS Here */
            body, html {
                margin: 0;
                padding: 0;
                height: 100%;
            }
    
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: black;
            }
    
            canvas {
                background-color: green;
            }
            #restartBtn {
                margin-top: 20px; /* Add margin to separate button from game */
                background-color: green; /* Change button background color to green */
                color: white; /* Change button text color to white */
                border: none; /* Remove button border */
                padding: 10px 20px; /* Add padding to button */
                cursor: pointer; /* Change cursor to pointer on hover */
                border-radius: 5px; /* Add border radius to button */
            }
        </style>
        <script>
            let blockSize = 25;
            let total_row = 17; //total row number
            let total_col = 17; //total column number
            let board;
            let context;
    
            let snakeX = blockSize * 5;
            let snakeY = blockSize * 5;
    
            // Set the total number of rows and columns
            let speedX = 0; //speed of snake in x coordinate.
            let speedY = 0; //speed of snake in Y coordinate.
    
            let snakeBody = [];
    
            let foodX;
            let foodY;
    
            let gameOver = false;
    
            window.onload = function () {
                // Set board height and width
                board = document.getElementById("board");
                board.height = total_row * blockSize;
                board.width = total_col * blockSize;
                context = board.getContext("2d");
    
                placeFood();
                document.addEventListener("keyup", changeDirection); //for movements
                // Set snake speed
                setInterval(update, 1000 / 10);
            }
    
            function update() {
                if (gameOver) {
                    return;
                }
    
                // Background of a Game
                context.fillStyle = "green";
                context.fillRect(0, 0, board.width, board.height);
    
                // Set food color and position
                context.fillStyle = "yellow";
                context.fillRect(foodX, foodY, blockSize, blockSize);
    
                if (snakeX == foodX && snakeY == foodY) {
                    snakeBody.push([foodX, foodY]);
                    placeFood();
                }
    
                // body of snake will grow
                for (let i = snakeBody.length - 1; i > 0; i--) {
                    // it will store previous part of snake to the current part
                    snakeBody[i] = snakeBody[i - 1];
                }
                if (snakeBody.length) {
                    snakeBody[0] = [snakeX, snakeY];
                }
    
                context.fillStyle = "white";
                snakeX += speedX * blockSize; //updating Snake position in X coordinate.
                snakeY += speedY * blockSize; //updating Snake position in Y coordinate.
                context.fillRect(snakeX, snakeY, blockSize, blockSize);
                for (let i = 0; i < snakeBody.length; i++) {
                    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
                }
    
                if (snakeX < 0
                    || snakeX > total_col * blockSize
                    || snakeY < 0
                    || snakeY > total_row * blockSize) {
    
                    // Out of bound condition
                    endGame();
                }
    
                for (let i = 0; i < snakeBody.length; i++) {
                    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
    
                        // Snake eats own body
                        endGame();
                    }
                }
            }
    
            // Movement of the Snake - We are using addEventListener
            function changeDirection(e) {
                if (e.code == "ArrowUp" && speedY != 1) {
                    // If up arrow key pressed with this condition...
                    // snake will not move in the opposite direction
                    speedX = 0;
                    speedY = -1;
                }
                else if (e.code == "ArrowDown" && speedY != -1) {
                    //If down arrow key pressed
                    speedX = 0;
                    speedY = 1;
                }
                else if (e.code == "ArrowLeft" && speedX != 1) {
                    //If left arrow key pressed
                    speedX = -1;
                    speedY = 0;
                }
                else if (e.code == "ArrowRight" && speedX != -1) {
                    //If Right arrow key pressed
                    speedX = 1;
                    speedY = 0;
                }
            }
    
            // Randomly place food
            function placeFood() {
    
                // in x coordinates.
                foodX = Math.floor(Math.random() * total_col) * blockSize;
    
                //in y coordinates.
                foodY = Math.floor(Math.random() * total_row) * blockSize;
            }
    
            function endGame() {
                gameOver = true;
                alert("Game Over");
    
                // Show restart button
                document.getElementById("restartBtn").style.display = "inline";
            }
    
            function restartGame() {
                // Reset variables
                gameOver = false;
                snakeX = blockSize * 5;
                snakeY = blockSize * 5;
                speedX = 0;
                speedY = 0;
                snakeBody = [];
                placeFood();
    
                // Hide restart button
                document.getElementById("restartBtn").style.display = "none";
            }
        </script>
    </head>
    <body>
        <canvas id="board"></canvas>
        <button id="restartBtn" style="display: none;" onclick="restartGame()">Restart Game</button>
    </body>
    </html>
    
    
    `);

    // End the response
    res.end();
  } else {
    // For any other route, send a 404 (Not Found) response
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Not Found');
  }
});

// Set the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
