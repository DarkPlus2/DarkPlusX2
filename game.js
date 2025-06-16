import { gameConfig } from './config.js';

// Game Variables
let canvas, ctx;
let gameRunning = false;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let level = 1;
let lives = 3;
let gameSpeed = gameConfig.difficulty[gameConfig.defaultDifficulty].speed;
let spawnRate = gameConfig.difficulty[gameConfig.defaultDifficulty].spawnRate;

// Game Objects
const player = {
  x: 0,
  y: 0,
  size: gameConfig.playerSize,
  speed: 5,
  dx: 0,
  dy: 0,
  color: gameConfig.colors.player,
  powerups: {
    shield: false,
    speed: false,
    multishot: false
  }
};

const enemies = [];
const projectiles = [];
const powerups = [];
const particles = [];

// Initialize Game
export function initGame() {
  canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');
  
  // Set canvas size
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  
  // Set player initial position
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  
  // Event listeners
  document.getElementById('start-game').addEventListener('click', startGame);
  document.getElementById('reset-game').addEventListener('click', resetGame);
  canvas.addEventListener('mousemove', movePlayer);
  canvas.addEventListener('click', shoot);
  
  // Update high score display
  document.getElementById('high-score').textContent = highScore;
  
  // Draw initial state
  draw();
}

// Start Game
function startGame() {
  if (gameRunning) return;
  
  gameRunning = true;
  score = 0;
  lives = 3;
  level = 1;
  updateGameSpeed();
  
  // Clear all objects
  enemies.length = 0;
  projectiles.length = 0;
  powerups.length = 0;
  particles.length = 0;
  
  // Reset player
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  player.powerups = {
    shield: false,
    speed: false,
    multishot: false
  };
  
  // Update UI
  updateScore();
  document.getElementById('game-level').textContent = level;
  
  // Start game loop
  gameLoop();
}

// Game Loop
function gameLoop() {
  if (!gameRunning) return;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update game state
  updatePlayer();
  updateEnemies();
  updateProjectiles();
  updatePowerups();
  updateParticles();
  
  // Spawn new enemies randomly
  if (Math.random() * 100 < spawnRate) {
    spawnEnemy();
  }
  
  // Spawn powerups occasionally
  if (Math.random() * 1000 < 2) {
    spawnPowerup();
  }
  
  // Draw everything
  drawPlayer();
  drawEnemies();
  drawProjectiles();
  drawPowerups();
  drawParticles();
  drawUI();
  
  // Continue loop
  requestAnimationFrame(gameLoop);
}

// Update Player
function updatePlayer() {
  // Move player
  player.x += player.dx;
  player.y += player.dy;
  
  // Boundary check
  player.x = Math.max(player.size, Math.min(canvas.width - player.size, player.x));
  player.y = Math.max(player.size, Math.min(canvas.height - player.size, player.y));
}

// Move Player with Mouse
function movePlayer(e) {
  const rect = canvas.getBoundingClientRect();
  player.x = e.clientX - rect.left;
  player.y = e.clientY - rect.top;
}

// Shoot Projectiles
function shoot() {
  if (!gameRunning) return;
  
  // Create projectile
  const angle = Math.atan2(
    player.y - canvas.height / 2,
    player.x - canvas.width / 2
  );
  
  const speed = 10;
  
  if (player.powerups.multishot) {
    // Triple shot
    for (let i = -1; i <= 1; i++) {
      const adjustedAngle = angle + (i * 0.3);
      projectiles.push({
        x: player.x,
        y: player.y,
        size: 8,
        speed: speed,
        dx: -Math.cos(adjustedAngle) * speed,
        dy: -Math.sin(adjustedAngle) * speed,
        color: gameConfig.colors.projectile
      });
    }
  } else {
    // Single shot
    projectiles.push({
      x: player.x,
      y: player.y,
      size: 8,
      speed: speed,
      dx: -Math.cos(angle) * speed,
      dy: -Math.sin(angle) * speed,
      color: gameConfig.colors.projectile
    });
  }
}

// Spawn Enemy
function spawnEnemy() {
  // Random side (0: top, 1: right, 2: bottom, 3: left)
  const side = Math.floor(Math.random() * 4);
  let x, y;
  
  switch (side) {
    case 0: // top
      x = Math.random() * canvas.width;
      y = -20;
      break;
    case 1: // right
      x = canvas.width + 20;
      y = Math.random() * canvas.height;
      break;
    case 2: // bottom
      x = Math.random() * canvas.width;
      y = canvas.height + 20;
      break;
    case 3: // left
      x = -20;
      y = Math.random() * canvas.height;
      break;
  }
  
  // Random size
  const sizeIndex = Math.floor(Math.random() * gameConfig.enemySizes.length);
  const size = gameConfig.enemySizes[sizeIndex];
  
  // Calculate direction toward player
  const angle = Math.atan2(player.y - y, player.x - x);
  const speed = gameSpeed + Math.random() * 2;
  
  enemies.push({
    x: x,
    y: y,
    size: size,
    speed: speed,
    dx: Math.cos(angle) * speed,
    dy: Math.sin(angle) * speed,
    color: gameConfig.colors.enemy,
    health: size / 10
  });
}

// Update Enemies
function updateEnemies() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    
    // Move enemy
    enemy.x += enemy.dx;
    enemy.y += enemy.dy;
    
    // Check collision with player
    const distance = Math.sqrt(
      Math.pow(player.x - enemy.x, 2) + 
      Math.pow(player.y - enemy.y, 2)
    );
    
    if (distance < player.size + enemy.size) {
      if (player.powerups.shield) {
        player.powerups.shield = false;
        createParticles(enemy.x, enemy.y, enemy.size, enemy.color);
        enemies.splice(i, 1);
      } else {
        lives--;
        if (lives <= 0) {
          gameOver();
          return;
        }
        createParticles(enemy.x, enemy.y, enemy.size, enemy.color);
        enemies.splice(i, 1);
      }
    }
    
    // Remove if out of bounds
    if (
      enemy.x < -100 || enemy.x > canvas.width + 100 ||
      enemy.y < -100 || enemy.y > canvas.height + 100
    ) {
      enemies.splice(i, 1);
    }
  }
}

// Update Projectiles
function updateProjectiles() {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const projectile = projectiles[i];
    
    // Move projectile
    projectile.x += projectile.dx;
    projectile.y += projectile.dy;
    
    // Check collision with enemies
    for (let j = enemies.length - 1; j >= 0; j--) {
      const enemy = enemies[j];
      const distance = Math.sqrt(
        Math.pow(projectile.x - enemy.x, 2) + 
        Math.pow(projectile.y - enemy.y, 2)
      );
      
      if (distance < projectile.size + enemy.size) {
        // Hit enemy
        enemy.health--;
        
        // Create hit particles
        createParticles(
          projectile.x, projectile.y, 
          projectile.size, 
          projectile.color
        );
        
        // Remove projectile
        projectiles.splice(i, 1);
        
        // Check if enemy is dead
        if (enemy.health <= 0) {
          // Add score based on enemy size
          score += Math.floor(100 / enemy.size);
          updateScore();
          
          // Chance to drop powerup
          if (Math.random() < 0.1) {
            spawnPowerup(enemy.x, enemy.y);
          }
          
          // Create explosion particles
          createParticles(
            enemy.x, enemy.y, 
            enemy.size * 2, 
            enemy.color
          );
          
          // Remove enemy
          enemies.splice(j, 1);
        }
        
        break;
      }
    }
    
    // Remove if out of bounds
    if (
      projectile.x < -50 || projectile.x > canvas.width + 50 ||
      projectile.y < -50 || projectile.y > canvas.height + 50
    ) {
      projectiles.splice(i, 1);
    }
  }
}

// Spawn Powerup
function spawnPowerup(x, y) {
  const spawnX = x || Math.random() * canvas.width;
  const spawnY = y || Math.random() * canvas.height;
  
  // Random powerup type
  const typeIndex = Math.floor(Math.random() * gameConfig.powerupTypes.length);
  const type = gameConfig.powerupTypes[typeIndex];
  
  powerups.push({
    x: spawnX,
    y: spawnY,
    size: 15,
    type: type,
    color: gameConfig.colors.powerup
  });
}

// Update Powerups
function updatePowerups() {
  for (let i = powerups.length - 1; i >= 0; i--) {
    const powerup = powerups[i];
    
    // Check collision with player
    const distance = Math.sqrt(
      Math.pow(player.x - powerup.x, 2) + 
      Math.pow(player.y - powerup.y, 2)
    );
    
    if (distance < player.size + powerup.size) {
      // Apply powerup
      applyPowerup(powerup.type);
      
      // Create collect particles
      createParticles(
        powerup.x, powerup.y, 
        powerup.size * 2, 
        powerup.color
      );
      
      // Remove powerup
      powerups.splice(i, 1);
    }
  }
}

// Apply Powerup
function applyPowerup(type) {
  switch (type) {
    case 'shield':
      player.powerups.shield = true;
      break;
    case 'speed':
      player.powerups.speed = true;
      setTimeout(() => {
        player.powerups.speed = false;
      }, 10000);
      break;
    case 'multishot':
      player.powerups.multishot = true;
      setTimeout(() => {
        player.powerups.multishot = false;
      }, 15000);
      break;
  }
  
  // Create powerup text effect
  createParticles(
    player.x, player.y - 50, 
    10, 
    gameConfig.colors.powerup,
    type.toUpperCase()
  );
}

// Create Particles
function createParticles(x, y, count, color, text) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    
    particles.push({
      x: x,
      y: y,
      size: Math.random() * 4 + 2,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      color: color || '#ffffff',
      life: 60 + Math.random() * 40,
      text: text,
      alpha: 1
    });
  }
}

// Update Particles
function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    
    // Update position
    p.x += p.dx;
    p.y += p.dy;
    
    // Apply gravity if no text
    if (!p.text) {
      p.dy += 0.1;
    }
    
    // Fade out
    p.life--;
    p.alpha = p.life / 100;
    
    // Remove if dead
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

// Draw Player
function drawPlayer() {
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  ctx.fillStyle = player.color;
  ctx.fill();
  
  // Draw shield if active
  if (player.powerups.shield) {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size + 10, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(100, 200, 255, 0.7)';
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

// Draw Enemies
function drawEnemies() {
  enemies.forEach(enemy => {
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
    ctx.fillStyle = enemy.color;
    ctx.fill();
    
    // Draw health bar
    const healthPercent = enemy.health / (enemy.size / 10);
    if (healthPercent < 1) {
      ctx.fillStyle = 'red';
      ctx.fillRect(
        enemy.x - enemy.size, 
        enemy.y - enemy.size - 10, 
        enemy.size * 2, 
        3
      );
      
      ctx.fillStyle = 'lime';
      ctx.fillRect(
        enemy.x - enemy.size, 
        enemy.y - enemy.size - 10, 
        enemy.size * 2 * healthPercent, 
        3
      );
    }
  });
}

// Draw Projectiles
function drawProjectiles() {
  projectiles.forEach(projectile => {
    ctx.beginPath();
    ctx.arc(projectile.x, projectile.y, projectile.size, 0, Math.PI * 2);
    ctx.fillStyle = projectile.color;
    ctx.fill();
  });
}

// Draw Powerups
function drawPowerups() {
  powerups.forEach(powerup => {
    ctx.beginPath();
    ctx.arc(powerup.x, powerup.y, powerup.size, 0, Math.PI * 2);
    ctx.fillStyle = powerup.color;
    ctx.fill();
    
    // Draw icon based on type
    ctx.fillStyle = 'white';
    ctx.font = `${powerup.size}px FontAwesome`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    let icon;
    switch (powerup.type) {
      case 'shield': icon = ''; break;
      case 'speed': icon = ''; break;
      case 'multishot': icon = ''; break;
    }
    
    ctx.fillText(icon, powerup.x, powerup.y);
  });
}

// Draw Particles
function drawParticles() {
  particles.forEach(p => {
    ctx.globalAlpha = p.alpha;
    
    if (p.text) {
      // Draw text particle
      ctx.fillStyle = p.color;
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.text, p.x, p.y);
    } else {
      // Draw regular particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
    
    ctx.globalAlpha = 1;
  });
}

// Draw UI
function drawUI() {
  // Draw score
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`Score: ${score}`, 10, 10);
  
  // Draw lives
  for (let i = 0; i < lives; i++) {
    ctx.beginPath();
    ctx.arc(20 + (i * 30), 40, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
  }
  
  // Draw active powerups
  let powerupY = 70;
  if (player.powerups.shield) {
    ctx.fillStyle = 'cyan';
    ctx.font = '16px Arial';
    ctx.fillText('SHIELD', 10, powerupY);
    powerupY += 20;
  }
  if (player.powerups.speed) {
    ctx.fillStyle = 'lime';
    ctx.font = '16px Arial';
    ctx.fillText('SPEED', 10, powerupY);
    powerupY += 20;
  }
  if (player.powerups.multishot) {
    ctx.fillStyle = 'yellow';
    ctx.font = '16px Arial';
    ctx.fillText('TRIPLE SHOT', 10, powerupY);
    powerupY += 20;
  }
}

// Update Score
function updateScore() {
  document.getElementById('game-score').textContent = score;
  
  // Check for level up
  if (score >= level * 1000) {
    level++;
    document.getElementById('game-level').textContent = level;
    updateGameSpeed();
    
    // Level up effect
    createParticles(
      canvas.width / 2, canvas.height / 2, 
      50, 
      'gold',
      `LEVEL ${level}!`
    );
  }
}

// Update Game Speed
function updateGameSpeed() {
  gameSpeed = gameConfig.difficulty[gameConfig.defaultDifficulty].speed * (1 + (level * 0.1));
  spawnRate = gameConfig.difficulty[gameConfig.defaultDifficulty].spawnRate * (1 - (level * 0.05));
}

// Game Over
function gameOver() {
  gameRunning = false;
  
  // Update high score
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
    document.getElementById('high-score').textContent = highScore;
  }
  
  // Game over effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = 'white';
  ctx.font = '40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);
  
  ctx.font = '24px Arial';
  ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
  
  ctx.font = '20px Arial';
  ctx.fillText('Click Start to play again', canvas.width / 2, canvas.height / 2 + 60);
}

// Reset Game
function resetGame() {
  gameRunning = false;
  draw();
}
