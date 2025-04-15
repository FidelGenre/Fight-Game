// Game state
const gameState = {
    player1: {
        health: 100,
        position: 100,
        isBlocking: false,
        isAttacking: false,
        isJumping: false
    },
    player2: {
        health: 100,
        position: 620,
        isBlocking: false,
        isAttacking: false,
        isJumping: false
    },
    gameActive: true,
    timeRemaining: 60
};

// DOM Elements
const player1Element = document.getElementById('player');
const player2Element = document.getElementById('enemy');
const player1HealthBar = document.getElementById('player-health');
const player2HealthBar = document.getElementById('enemy-health');
const player1Shield = document.getElementById('player-shield');
const player2Shield = document.getElementById('enemy-shield');
const timerElement = document.getElementById('timer');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart');

// Key states
const keys = {
    // Player 1 keys
    a: false,
    d: false,
    w: false,
    s: false,
    space: false,
    
    // Player 2 keys
    arrowLeft: false,
    arrowRight: false,
    arrowUp: false,
    arrowDown: false,
    enter: false
};

// Initialize the game
function initGame() {
    // Reset game state
    gameState.player1.health = 100;
    gameState.player1.position = 100;
    gameState.player1.isBlocking = false;
    gameState.player1.isAttacking = false;
    gameState.player1.isJumping = false;
    
    gameState.player2.health = 100;
    gameState.player2.position = 620;
    gameState.player2.isBlocking = false;
    gameState.player2.isAttacking = false;
    gameState.player2.isJumping = false;
    
    gameState.gameActive = true;
    gameState.timeRemaining = 60;
    
    // Update UI
    updateHealthBars();
    timerElement.textContent = gameState.timeRemaining;
    resultElement.style.display = 'none';
    
    // Position characters
    player1Element.style.left = `${gameState.player1.position}px`;
    player2Element.style.right = `${800 - gameState.player2.position}px`;
    
    // Remove any active classes
    player1Element.classList.remove('blocking', 'attacking', 'hit', 'jump');
    player2Element.classList.remove('blocking', 'attacking', 'hit', 'jump');
    
    // Start game timer
    if (window.gameTimer) {
        clearInterval(window.gameTimer);
    }
    window.gameTimer = setInterval(updateTimer, 1000);
}

// Update health bars
function updateHealthBars() {
    player1HealthBar.style.width = `${gameState.player1.health}%`;
    player2HealthBar.style.width = `${gameState.player2.health}%`;
    
    // Change color based on health
    if (gameState.player1.health < 30) {
        player1HealthBar.style.backgroundColor = '#F44336';
    } else if (gameState.player1.health < 60) {
        player1HealthBar.style.backgroundColor = '#FFC107';
    } else {
        player1HealthBar.style.backgroundColor = '#4CAF50';
    }
    
    if (gameState.player2.health < 30) {
        player2HealthBar.style.backgroundColor = '#F44336';
    } else if (gameState.player2.health < 60) {
        player2HealthBar.style.backgroundColor = '#FFC107';
    } else {
        player2HealthBar.style.backgroundColor = '#4CAF50';
    }
}

// Update game timer
function updateTimer() {
    if (!gameState.gameActive) return;
    
    gameState.timeRemaining--;
    timerElement.textContent = gameState.timeRemaining;
    
    if (gameState.timeRemaining <= 0) {
        // Determine winner based on health
        if (gameState.player1.health > gameState.player2.health) {
            endGame('¡Jugador 1 Gana!');
        } else if (gameState.player2.health > gameState.player1.health) {
            endGame('¡Jugador 2 Gana!');
        } else {
            endGame('¡Empate!');
        }
    }
}

// Player 1 movement
function movePlayer1() {
    if (!gameState.gameActive) return;
    
    if (keys.a && gameState.player1.position > 50) {
        gameState.player1.position -= 5;
    }
    
    if (keys.d && gameState.player1.position < gameState.player2.position - 100) {
        gameState.player1.position += 5;
    }
    
    player1Element.style.left = `${gameState.player1.position}px`;
}

// Player 2 movement
function movePlayer2() {
    if (!gameState.gameActive) return;
    
    if (keys.arrowLeft && gameState.player2.position > gameState.player1.position + 100) {
        gameState.player2.position -= 5;
    }
    
    if (keys.arrowRight && gameState.player2.position < 750) {
        gameState.player2.position += 5;
    }
    
    player2Element.style.right = `${800 - gameState.player2.position}px`;
}

// Player 1 attack
function player1Attack() {
    if (!gameState.gameActive || gameState.player1.isAttacking || gameState.player1.isJumping || gameState.player1.isBlocking) return;
    
    gameState.player1.isAttacking = true;
    player1Element.classList.add('attacking');
    
    // Check if hit
    const player1Right = gameState.player1.position + 80;
    const player2Left = gameState.player2.position - 80;
    
    if (player1Right >= player2Left) {
        if (gameState.player2.isBlocking) {
            // Blocked attack - reduced damage
            player2Element.classList.add('hit');
            gameState.player2.health -= 2; // Reduced damage when blocking
            updateHealthBars();
            
            setTimeout(() => {
                player2Element.classList.remove('hit');
            }, 300);
        } else {
            // Full damage
            player2Element.classList.add('hit');
            gameState.player2.health -= 10;
            updateHealthBars();
            
            setTimeout(() => {
                player2Element.classList.remove('hit');
            }, 300);
        }
        
        if (gameState.player2.health <= 0) {
            endGame('¡Jugador 1 Gana!');
        }
    }
    
    setTimeout(() => {
        player1Element.classList.remove('attacking');
        gameState.player1.isAttacking = false;
    }, 300);
}

// Player 2 attack
function player2Attack() {
    if (!gameState.gameActive || gameState.player2.isAttacking || gameState.player2.isJumping || gameState.player2.isBlocking) return;
    
    gameState.player2.isAttacking = true;
    player2Element.classList.add('attacking');
    
    // Check if hit
    const player2Left = gameState.player2.position - 80;
    const player1Right = gameState.player1.position + 80;
    
    if (player2Left <= player1Right) {
        if (gameState.player1.isBlocking) {
            // Blocked attack - reduced damage
            player1Element.classList.add('hit');
            gameState.player1.health -= 2; // Reduced damage when blocking
            updateHealthBars();
            
            setTimeout(() => {
                player1Element.classList.remove('hit');
            }, 300);
        } else {
            // Full damage
            player1Element.classList.add('hit');
            gameState.player1.health -= 10;
            updateHealthBars();
            
            setTimeout(() => {
                player1Element.classList.remove('hit');
            }, 300);
        }
        
        if (gameState.player1.health <= 0) {
            endGame('¡Jugador 2 Gana!');
        }
    }
    
    setTimeout(() => {
        player2Element.classList.remove('attacking');
        gameState.player2.isAttacking = false;
    }, 300);
}

// Player 1 jump
function player1Jump() {
    if (!gameState.gameActive || gameState.player1.isJumping || gameState.player1.isBlocking) return;
    
    gameState.player1.isJumping = true;
    player1Element.classList.add('jump');
    
    setTimeout(() => {
        player1Element.classList.remove('jump');
        gameState.player1.isJumping = false;
    }, 500);
}

// Player 2 jump
function player2Jump() {
    if (!gameState.gameActive || gameState.player2.isJumping || gameState.player2.isBlocking) return;
    
    gameState.player2.isJumping = true;
    player2Element.classList.add('jump');
    
    setTimeout(() => {
        player2Element.classList.remove('jump');
        gameState.player2.isJumping = false;
    }, 500);
}

// Player 1 block
function player1Block(isBlocking) {
    if (!gameState.gameActive || gameState.player1.isAttacking || gameState.player1.isJumping) return;
    
    gameState.player1.isBlocking = isBlocking;
    
    if (isBlocking) {
        player1Element.classList.add('blocking');
    } else {
        player1Element.classList.remove('blocking');
    }
}

// Player 2 block
function player2Block(isBlocking) {
    if (!gameState.gameActive || gameState.player2.isAttacking || gameState.player2.isJumping) return;
    
    gameState.player2.isBlocking = isBlocking;
    
    if (isBlocking) {
        player2Element.classList.add('blocking');
    } else {
        player2Element.classList.remove('blocking');
    }
}

// End game
function endGame(message) {
    gameState.gameActive = false;
    clearInterval(window.gameTimer);
    
    resultElement.textContent = message;
    resultElement.style.display = 'block';
}

// Event listeners
document.addEventListener('keydown', (e) => {
    // Player 1 controls
    if (e.key === 'a' || e.key === 'A') keys.a = true;
    if (e.key === 'd' || e.key === 'D') keys.d = true;
    if (e.key === 'w' || e.key === 'W') {
        keys.w = true;
        player1Jump();
    }
    if (e.key === 's' || e.key === 'S') {
        keys.s = true;
        player1Block(true);
    }
    if (e.key === ' ') {
        keys.space = true;
        player1Attack();
    }
    
    // Player 2 controls
    if (e.key === 'ArrowLeft') keys.arrowLeft = true;
    if (e.key === 'ArrowRight') keys.arrowRight = true;
    if (e.key === 'ArrowUp') {
        keys.arrowUp = true;
        player2Jump();
    }
    if (e.key === 'ArrowDown') {
        keys.arrowDown = true;
        player2Block(true);
    }
    if (e.key === 'Enter') {
        keys.enter = true;
        player2Attack();
    }
});

document.addEventListener('keyup', (e) => {
    // Player 1 controls
    if (e.key === 'a' || e.key === 'A') keys.a = false;
    if (e.key === 'd' || e.key === 'D') keys.d = false;
    if (e.key === 'w' || e.key === 'W') keys.w = false;
    if (e.key === 's' || e.key === 'S') {
        keys.s = false;
        player1Block(false);
    }
    if (e.key === ' ') keys.space = false;
    
    // Player 2 controls
    if (e.key === 'ArrowLeft') keys.arrowLeft = false;
    if (e.key === 'ArrowRight') keys.arrowRight = false;
    if (e.key === 'ArrowUp') keys.arrowUp = false;
    if (e.key === 'ArrowDown') {
        keys.arrowDown = false;
        player2Block(false);
    }
    if (e.key === 'Enter') keys.enter = false;
});

restartButton.addEventListener('click', initGame);

// Game loop
function gameLoop() {
    movePlayer1();
    movePlayer2();
    requestAnimationFrame(gameLoop);
}

// Initialize and start game
initGame();
gameLoop();