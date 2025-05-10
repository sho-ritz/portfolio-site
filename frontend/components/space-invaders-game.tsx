"use client";

import { useEffect, useRef, useState } from "react";
import { DotGothic16 } from "next/font/google";

const dotGothic16 = DotGothic16({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dot-gothic-16",
});
const FONT_FAMILY = dotGothic16.style.fontFamily;

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
}

interface Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  type: number; // 0-2 for different enemy types
  health: number;
  formationIndex: number; // To track which formation this enemy belongs to
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  health: number;
}

interface Laser {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  power: number;
}

interface PowerUp {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  type: string; // "double" or "large"
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  life: number;
  maxLife: number;
  color: string;
}

interface Formation {
  enemies: Enemy[];
  speed: number;
}

export function SpaceInvadersGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Game variables
    let animationFrameId: number;
    let mouseX = canvas.width / 2;
    let gameActive = true;
    let currentScore = 0;
    let formationSpawnRate = 3000; // ms between formation spawns
    let lastFormationSpawn = 0;
    let lastLaserFired = 0;
    const laserFireRate = 300; // ms between laser fires
    let difficultyLevel = 1;
    let obstacleSpawnRate = 5000; // ms between obstacle spawns
    let lastObstacleSpawn = 0;
    const powerUpSpawnRate = 15000; // ms between power-up spawns
    let lastPowerUpSpawn = 0;

    // Power-up variables
    let doubleLaserActive = false;
    let doubleLaserEndTime = 0;
    let largeLaserActive = false;
    let largeLaserEndTime = 0;
    const powerUpDuration = 10000; // 10 seconds

    // Create player ship
    const player = {
      x: canvas.width / 2,
      y: canvas.height - 80,
      width: 60,
      height: 40,
      speed: 0.5, // Smoothing factor for mouse following
    };

    // Create arrays for game objects
    const lasers: Laser[] = [];
    const formations: Formation[] = [];
    const obstacles: Obstacle[] = [];
    const powerUps: PowerUp[] = [];
    const stars: Star[] = [];
    const particles: Particle[] = [];

    // Initialize stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 3 + 1,
      });
    }

    // Mouse event listeners
    const mouseMoveHandler = (e: MouseEvent) => {
      mouseX = e.clientX;
    };

    const mouseClickHandler = () => {
      if (!gameActive) {
        // Restart game on click if game over
        resetGame();
      }
    };

    // Touch event handlers
    const touchMoveHandler = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
      }
    };

    const touchStartHandler = () => {
      if (!gameActive) {
        // Restart game on touch if game over
        resetGame();
      }
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("click", mouseClickHandler);
    canvas.addEventListener("touchmove", touchMoveHandler);
    canvas.addEventListener("touchstart", touchStartHandler);

    // Game functions
    const fireLaser = () => {
      const laserWidth = largeLaserActive ? 8 : 3;
      const laserHeight = largeLaserActive ? 30 : 20;
      const laserPower = largeLaserActive
        ? 2 + Math.floor(difficultyLevel / 3)
        : 1 + Math.floor(difficultyLevel / 3);

      if (doubleLaserActive) {
        // Fire two lasers side by side
        lasers.push({
          x: player.x + player.width / 3 - laserWidth / 2,
          y: player.y,
          width: laserWidth,
          height: laserHeight,
          speed: 15,
          power: laserPower,
        });

        lasers.push({
          x: player.x + (player.width * 2) / 3 - laserWidth / 2,
          y: player.y,
          width: laserWidth,
          height: laserHeight,
          speed: 15,
          power: laserPower,
        });

        // Add muzzle flash particles for both lasers
        for (let i = 0; i < 3; i++) {
          particles.push({
            x: player.x + player.width / 3,
            y: player.y,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 2 + 0.5,
            life: 0,
            maxLife: 10,
            color: `hsl(${180 + Math.random() * 60}, 100%, ${
              70 + Math.random() * 30
            }%)`,
          });

          particles.push({
            x: player.x + (player.width * 2) / 3,
            y: player.y,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 2 + 0.5,
            life: 0,
            maxLife: 10,
            color: `hsl(${180 + Math.random() * 60}, 100%, ${
              70 + Math.random() * 30
            }%)`,
          });
        }
      } else {
        // Fire a single laser
        lasers.push({
          x: player.x + player.width / 2 - laserWidth / 2,
          y: player.y,
          width: laserWidth,
          height: laserHeight,
          speed: 15,
          power: laserPower,
        });

        // Add muzzle flash particles
        for (let i = 0; i < 5; i++) {
          particles.push({
            x: player.x + player.width / 2,
            y: player.y,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 2 + 0.5,
            life: 0,
            maxLife: 10,
            color: `hsl(${180 + Math.random() * 60}, 100%, ${
              70 + Math.random() * 30
            }%)`,
          });
        }
      }
    };

    const createFormation = () => {
      const formationTypes = [
        createLineFormation,
        createVFormation,
        createCircleFormation,
        createRandomFormation,
        createDiamondFormation,
      ];

      // Randomly select a formation type
      const formationType = Math.floor(Math.random() * formationTypes.length);
      formationTypes[formationType]();
    };

    const createLineFormation = () => {
      const enemyCount = 5 + Math.floor(difficultyLevel / 2); // More enemies as difficulty increases
      const enemyWidth = 40;
      const enemyHeight = 30;
      const spacing = 20;
      const totalWidth = enemyCount * (enemyWidth + spacing) - spacing;
      const startX = Math.random() * (canvas.width - totalWidth - 100) + 50;
      const startY = -100;

      const enemies: Enemy[] = [];

      for (let i = 0; i < enemyCount; i++) {
        const type = Math.floor(Math.random() * 3); // 0, 1, or 2
        const health = type === 0 ? 1 : type === 1 ? 2 : 3;
        const speed =
          (type === 0 ? 2 : type === 1 ? 1.5 : 1) * (1 + difficultyLevel * 0.2);

        enemies.push({
          x: startX + i * (enemyWidth + spacing),
          y: startY,
          width: enemyWidth,
          height: enemyHeight,
          speed,
          type,
          health,
          formationIndex: formations.length,
        });
      }

      formations.push({
        enemies,
        speed: 1 + difficultyLevel * 0.3,
      });
    };

    const createVFormation = () => {
      const rows = 3;
      const enemiesPerRow = 3;
      const enemyWidth = 40;
      const enemyHeight = 30;
      const spacing = 30;
      const startX = Math.random() * (canvas.width - 300) + 150;
      const startY = -150;

      const enemies: Enemy[] = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < enemiesPerRow; col++) {
          // Skip middle positions except for the lead ship
          if (row > 0 && col === Math.floor(enemiesPerRow / 2)) continue;

          const type = Math.floor(Math.random() * 3);
          const health = type === 0 ? 1 : type === 1 ? 2 : 3;
          const speed =
            (type === 0 ? 2 : type === 1 ? 1.5 : 1) *
            (1 + difficultyLevel * 0.2);

          const offsetX =
            row *
            spacing *
            (col === 0 ? -1 : col === enemiesPerRow - 1 ? 1 : 0);

          enemies.push({
            x: startX + col * (enemyWidth + spacing) + offsetX,
            y: startY + row * (enemyHeight + spacing / 2),
            width: enemyWidth,
            height: enemyHeight,
            speed,
            type,
            health,
            formationIndex: formations.length,
          });
        }
      }

      formations.push({
        enemies,
        speed: 1.5 + difficultyLevel * 0.3,
      });
    };

    const createCircleFormation = () => {
      const enemyCount = 8 + Math.floor(difficultyLevel / 2);
      const radius = 80;
      const centerX = Math.random() * (canvas.width - 300) + 150;
      const centerY = -50;

      const enemies: Enemy[] = [];

      for (let i = 0; i < enemyCount; i++) {
        const angle = (i / enemyCount) * Math.PI * 2;
        const type = Math.floor(Math.random() * 3);
        const health = type === 0 ? 1 : type === 1 ? 2 : 3;
        const enemyWidth = type === 0 ? 30 : type === 1 ? 40 : 50;
        const enemyHeight = type === 0 ? 30 : type === 1 ? 40 : 50;
        const speed =
          (type === 0 ? 2 : type === 1 ? 1.5 : 1) * (1 + difficultyLevel * 0.2);

        enemies.push({
          x: centerX + Math.cos(angle) * radius - enemyWidth / 2,
          y: centerY + Math.sin(angle) * radius - enemyHeight / 2,
          width: enemyWidth,
          height: enemyHeight,
          speed,
          type,
          health,
          formationIndex: formations.length,
        });
      }

      formations.push({
        enemies,
        speed: 1.2 + difficultyLevel * 0.25,
      });
    };

    const createRandomFormation = () => {
      const enemyCount = 10 + Math.floor(difficultyLevel / 2);
      const areaWidth = 300;
      const areaHeight = 200;
      const startX = Math.random() * (canvas.width - areaWidth - 100) + 50;
      const startY = -areaHeight;

      const enemies: Enemy[] = [];

      for (let i = 0; i < enemyCount; i++) {
        const type = Math.floor(Math.random() * 3);
        const health = type === 0 ? 1 : type === 1 ? 2 : 3;
        const enemyWidth = type === 0 ? 30 : type === 1 ? 40 : 50;
        const enemyHeight = type === 0 ? 30 : type === 1 ? 40 : 50;
        const speed =
          (type === 0 ? 2 : type === 1 ? 1.5 : 1) * (1 + difficultyLevel * 0.2);

        enemies.push({
          x: startX + Math.random() * (areaWidth - enemyWidth),
          y: startY + Math.random() * (areaHeight - enemyHeight),
          width: enemyWidth,
          height: enemyHeight,
          speed,
          type,
          health,
          formationIndex: formations.length,
        });
      }

      formations.push({
        enemies,
        speed: 1 + difficultyLevel * 0.2,
      });
    };

    const createDiamondFormation = () => {
      const rows = 5;
      const enemyWidth = 40;
      const enemyHeight = 30;
      const spacing = 25;
      const startX = Math.random() * (canvas.width - 300) + 150;
      const startY = -200;

      const enemies: Enemy[] = [];

      for (let row = 0; row < rows; row++) {
        const enemiesInRow =
          row < Math.ceil(rows / 2) ? row * 2 + 1 : (rows - row - 1) * 2 + 1;
        const rowStartX =
          startX - (enemiesInRow * (enemyWidth + spacing)) / 2 + enemyWidth / 2;

        for (let col = 0; col < enemiesInRow; col++) {
          const type = Math.floor(Math.random() * 3);
          const health = type === 0 ? 1 : type === 1 ? 2 : 3;
          const speed =
            (type === 0 ? 2 : type === 1 ? 1.5 : 1) *
            (1 + difficultyLevel * 0.2);

          enemies.push({
            x: rowStartX + col * (enemyWidth + spacing),
            y: startY + row * (enemyHeight + spacing),
            width: enemyWidth,
            height: enemyHeight,
            speed,
            type,
            health,
            formationIndex: formations.length,
          });
        }
      }

      formations.push({
        enemies,
        speed: 1.3 + difficultyLevel * 0.3,
      });
    };

    const createObstacle = () => {
      const width = 80 + Math.random() * 40;
      const height = 80 + Math.random() * 40;
      const x = Math.random() * (canvas.width - width);

      obstacles.push({
        x,
        y: -height,
        width,
        height,
        health: 5 + Math.floor(difficultyLevel / 2),
      });
    };

    const createPowerUp = () => {
      const size = 30;
      const x = Math.random() * (canvas.width - size);
      const type = Math.random() < 0.5 ? "double" : "large";

      powerUps.push({
        x,
        y: -size,
        width: size,
        height: size,
        speed: 2,
        type,
      });
    };

    const createExplosion = (
      x: number,
      y: number,
      size: number,
      color = "blue"
    ) => {
      const particleCount = size * 3;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x,
          y,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 3 + 1,
          life: 0,
          maxLife: 30 + Math.random() * 20,
          color:
            color === "blue"
              ? `hsl(${180 + Math.random() * 60}, 100%, ${
                  70 + Math.random() * 30
                }%)`
              : color === "orange"
              ? `hsl(${20 + Math.random() * 30}, 100%, ${
                  70 + Math.random() * 30
                }%)`
              : color === "purple"
              ? `hsl(${280 + Math.random() * 60}, 100%, ${
                  70 + Math.random() * 30
                }%)`
              : `hsl(${60 + Math.random() * 30}, 100%, ${
                  70 + Math.random() * 30
                }%)`, // Yellow for power-ups
        });
      }
    };

    const resetGame = () => {
      formations.length = 0;
      lasers.length = 0;
      obstacles.length = 0;
      powerUps.length = 0;
      particles.length = 0;
      currentScore = 0;
      difficultyLevel = 1;
      doubleLaserActive = false;
      largeLaserActive = false;
      setScore(0);
      gameActive = true;
      setGameOver(false);
    };

    const gameOverSequence = () => {
      gameActive = false;
      setGameOver(true);

      // Create big explosion at player position
      createExplosion(
        player.x + player.width / 2,
        player.y + player.height / 2,
        15,
        "orange"
      );

      // Restart game after 1 second
      setTimeout(resetGame, 5000);
    };

    // Update functions
    const updatePlayer = () => {
      // Smooth movement towards mouse
      player.x += (mouseX - player.width / 2 - player.x) * player.speed;

      // Keep player within canvas bounds
      if (player.x < 0) player.x = 0;
      if (player.x + player.width > canvas.width)
        player.x = canvas.width - player.width;

      // Auto-fire lasers
      const now = Date.now();
      if (now - lastLaserFired > laserFireRate) {
        fireLaser();
        lastLaserFired = now;
      }

      // Check power-up timers
      if (doubleLaserActive && now > doubleLaserEndTime) {
        doubleLaserActive = false;
      }

      if (largeLaserActive && now > largeLaserEndTime) {
        largeLaserActive = false;
      }
    };

    const updateLasers = () => {
      for (let i = lasers.length - 1; i >= 0; i--) {
        lasers[i].y -= lasers[i].speed;

        // Remove lasers that go off screen
        if (lasers[i].y < 0) {
          lasers.splice(i, 1);
          continue;
        }

        // Check for collision with enemies
        let hitEnemy = false;

        for (let f = 0; f < formations.length; f++) {
          for (let e = formations[f].enemies.length - 1; e >= 0; e--) {
            const enemy = formations[f].enemies[e];

            if (
              lasers[i] &&
              lasers[i].x < enemy.x + enemy.width &&
              lasers[i].x + lasers[i].width > enemy.x &&
              lasers[i].y < enemy.y + enemy.height &&
              lasers[i].y + lasers[i].height > enemy.y
            ) {
              // Reduce enemy health
              enemy.health -= lasers[i].power;

              if (enemy.health <= 0) {
                // Create explosion
                createExplosion(
                  enemy.x + enemy.width / 2,
                  enemy.y + enemy.height / 2,
                  enemy.width / 10
                );

                // Remove enemy
                formations[f].enemies.splice(e, 1);

                // Increase score based on enemy type
                const pointValue =
                  enemy.type === 0 ? 10 : enemy.type === 1 ? 20 : 30;
                currentScore += pointValue;
                setScore(currentScore);

                // Update difficulty level
                difficultyLevel = 1 + Math.floor(currentScore / 200);

                // Small chance to spawn a power-up when enemy is destroyed
                if (Math.random() < 0.05) {
                  // 5% chance
                  powerUps.push({
                    x: enemy.x + enemy.width / 2 - 15,
                    y: enemy.y,
                    width: 30,
                    height: 30,
                    speed: 2,
                    type: Math.random() < 0.5 ? "double" : "large",
                  });
                }
              } else {
                // Create small hit effect
                createExplosion(lasers[i].x, lasers[i].y, 2, "blue");
              }

              // Remove laser
              lasers.splice(i, 1);
              hitEnemy = true;
              break;
            }
          }

          if (hitEnemy) break;
        }

        // Check for collision with obstacles if laser wasn't already removed
        if (!hitEnemy && lasers[i]) {
          for (let o = obstacles.length - 1; o >= 0; o--) {
            if (
              lasers[i].x < obstacles[o].x + obstacles[o].width &&
              lasers[i].x + lasers[i].width > obstacles[o].x &&
              lasers[i].y < obstacles[o].y + obstacles[o].height &&
              lasers[i].y + lasers[i].height > obstacles[o].y
            ) {
              // Reduce obstacle health
              obstacles[o].health -= lasers[i].power;

              if (obstacles[o].health <= 0) {
                // Create explosion
                createExplosion(
                  obstacles[o].x + obstacles[o].width / 2,
                  obstacles[o].y + obstacles[o].height / 2,
                  obstacles[o].width / 10,
                  "purple"
                );

                // Remove obstacle
                obstacles.splice(o, 1);

                // Small score for destroying obstacle
                currentScore += 5;
                setScore(currentScore);
              }

              // Remove laser
              lasers.splice(i, 1);
              break;
            }
          }
        }
      }
    };

    const updateFormations = () => {
      // Spawn new formations
      const now = Date.now();
      if (now - lastFormationSpawn > formationSpawnRate && gameActive) {
        createFormation();
        lastFormationSpawn = now;

        // Adjust spawn rate based on difficulty
        formationSpawnRate = Math.max(1000, 3000 - difficultyLevel * 200);
      }

      // Update existing formations
      for (let f = formations.length - 1; f >= 0; f--) {
        const formation = formations[f];

        // Check if formation is empty
        if (formation.enemies.length === 0) {
          formations.splice(f, 1);
          continue;
        }

        // Move all enemies in formation directly downward
        for (let e = 0; e < formation.enemies.length; e++) {
          const enemy = formation.enemies[e];

          // Move enemy directly downward at its own speed
          enemy.y += enemy.speed;

          // Check if enemy collided with player
          if (
            gameActive &&
            enemy.x < player.x + player.width &&
            enemy.x + enemy.width > player.x &&
            enemy.y < player.y + player.height &&
            enemy.y + enemy.height > player.y
          ) {
            gameOverSequence();
            return;
          }

          // Remove enemies that go off screen
          if (enemy.y > canvas.height) {
            formation.enemies.splice(e, 1);
            e--;
          }
        }
      }
    };

    const updateObstacles = () => {
      // Spawn new obstacles
      const now = Date.now();
      if (now - lastObstacleSpawn > obstacleSpawnRate && gameActive) {
        createObstacle();
        lastObstacleSpawn = now;

        // Adjust spawn rate based on difficulty
        obstacleSpawnRate = Math.max(3000, 5000 - difficultyLevel * 300);
      }

      // Update existing obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].y += 1 + difficultyLevel * 0.2;

        // Remove obstacles that go off screen
        if (obstacles[i].y > canvas.height) {
          obstacles.splice(i, 1);
          continue;
        }

        // Check for collision with player
        if (
          gameActive &&
          obstacles[i].x < player.x + player.width &&
          obstacles[i].x + obstacles[i].width > player.x &&
          obstacles[i].y < player.y + player.height &&
          obstacles[i].y + obstacles[i].height > player.y
        ) {
          gameOverSequence();
          return;
        }
      }
    };

    const updatePowerUps = () => {
      // Spawn new power-ups
      const now = Date.now();
      if (now - lastPowerUpSpawn > powerUpSpawnRate && gameActive) {
        createPowerUp();
        lastPowerUpSpawn = now;
      }

      // Update existing power-ups
      for (let i = powerUps.length - 1; i >= 0; i--) {
        powerUps[i].y += powerUps[i].speed;

        // Remove power-ups that go off screen
        if (powerUps[i].y > canvas.height) {
          powerUps.splice(i, 1);
          continue;
        }

        // Check for collision with player
        if (
          gameActive &&
          powerUps[i].x < player.x + player.width &&
          powerUps[i].x + powerUps[i].width > player.x &&
          powerUps[i].y < player.y + player.height &&
          powerUps[i].y + powerUps[i].height > player.y
        ) {
          // Apply power-up effect
          if (powerUps[i].type === "double") {
            doubleLaserActive = true;
            doubleLaserEndTime = now + powerUpDuration;
          } else if (powerUps[i].type === "large") {
            largeLaserActive = true;
            largeLaserEndTime = now + powerUpDuration;
          }

          // Create power-up collection effect
          createExplosion(
            powerUps[i].x + powerUps[i].width / 2,
            powerUps[i].y + powerUps[i].height / 2,
            powerUps[i].width / 2,
            "yellow"
          );

          // Remove power-up
          powerUps.splice(i, 1);
        }
      }
    };

    const updateStars = () => {
      for (let i = 0; i < stars.length; i++) {
        stars[i].y += stars[i].speed;

        // Reset stars that go off screen
        if (stars[i].y > canvas.height) {
          stars[i].y = 0;
          stars[i].x = Math.random() * canvas.width;
        }
      }
    };

    const updateParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].life++;

        // Random movement
        particles[i].x += (Math.random() - 0.5) * particles[i].speed;
        particles[i].y += (Math.random() - 0.5) * particles[i].speed;

        // Remove particles that exceed their lifespan
        if (particles[i].life > particles[i].maxLife) {
          particles.splice(i, 1);
        }
      }
    };

    // Draw functions
    const drawPlayer = () => {
      ctx.fillStyle = "#0066ff";

      // Draw ship body
      ctx.beginPath();
      ctx.moveTo(player.x + player.width / 2, player.y);
      ctx.lineTo(player.x + player.width, player.y + player.height);
      ctx.lineTo(player.x, player.y + player.height);
      ctx.closePath();
      ctx.fill();

      // Draw cockpit
      ctx.fillStyle = "#99ccff";
      ctx.beginPath();
      ctx.ellipse(
        player.x + player.width / 2,
        player.y + player.height / 2,
        player.width / 6,
        player.height / 3,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Draw engine glow
      ctx.fillStyle = "#ff6600";
      ctx.beginPath();
      ctx.moveTo(player.x + player.width / 3, player.y + player.height);
      ctx.lineTo(player.x + player.width / 2, player.y + player.height + 15);
      ctx.lineTo(player.x + (player.width * 2) / 3, player.y + player.height);
      ctx.closePath();
      ctx.fill();

      // Draw power-up indicators
      if (doubleLaserActive || largeLaserActive) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.beginPath();
        ctx.arc(
          player.x + player.width / 2,
          player.y + player.height / 2,
          player.width / 1.5,
          0,
          Math.PI * 2
        );
        ctx.fill();

        const now = Date.now();

        if (doubleLaserActive) {
          const timeLeft = (doubleLaserEndTime - now) / powerUpDuration;
          ctx.fillStyle = "#00ffff";
          ctx.font = "12px Arial";
          ctx.textAlign = "center";
          ctx.fillText("2x", player.x + player.width / 2 - 15, player.y - 10);

          // Draw timer bar
          ctx.fillStyle = "rgba(0, 255, 255, 0.7)";
          ctx.fillRect(player.x, player.y - 5, player.width * timeLeft, 3);
        }

        if (largeLaserActive) {
          const timeLeft = (largeLaserEndTime - now) / powerUpDuration;
          ctx.fillStyle = "#ffcc00";
          ctx.font = "12px Arial";
          ctx.textAlign = "center";
          ctx.fillText("BIG", player.x + player.width / 2 + 15, player.y - 10);

          // Draw timer bar
          ctx.fillStyle = "rgba(255, 204, 0, 0.7)";
          ctx.fillRect(player.x, player.y - 2, player.width * timeLeft, 3);
        }
      }
    };

    const drawLasers = () => {
      ctx.shadowColor = "#00ffff";
      ctx.shadowBlur = 10;

      lasers.forEach((laser) => {
        // Draw laser beam
        const gradient = ctx.createLinearGradient(
          laser.x,
          laser.y,
          laser.x,
          laser.y + laser.height
        );
        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(0.5, "#00ffff");
        gradient.addColorStop(1, "#0066ff");

        ctx.fillStyle = gradient;
        ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
      });

      ctx.shadowBlur = 0;
    };

    const drawEnemies = () => {
      formations.forEach((formation) => {
        formation.enemies.forEach((enemy) => {
          // Different enemy types
          if (enemy.type === 0) {
            // Small fast enemy
            ctx.fillStyle = "#ff3366";
            ctx.beginPath();
            ctx.moveTo(enemy.x + enemy.width / 2, enemy.y);
            ctx.lineTo(enemy.x + enemy.width, enemy.y + enemy.height);
            ctx.lineTo(enemy.x, enemy.y + enemy.height);
            ctx.closePath();
            ctx.fill();

            // Health indicator
            const healthPercent =
              enemy.health / (enemy.type === 0 ? 1 : enemy.type === 1 ? 2 : 3);
            ctx.fillStyle = `rgba(255, 255, 255, ${healthPercent})`;
            ctx.fillRect(enemy.x, enemy.y - 5, enemy.width * healthPercent, 3);
          } else if (enemy.type === 1) {
            // Medium enemy
            ctx.fillStyle = "#ff6600";
            ctx.beginPath();
            ctx.ellipse(
              enemy.x + enemy.width / 2,
              enemy.y + enemy.height / 2,
              enemy.width / 2,
              enemy.height / 2,
              0,
              0,
              Math.PI * 2
            );
            ctx.fill();

            // Add details
            ctx.fillStyle = "#ffcc00";
            ctx.beginPath();
            ctx.ellipse(
              enemy.x + enemy.width / 2,
              enemy.y + enemy.height / 2,
              enemy.width / 4,
              enemy.height / 4,
              0,
              0,
              Math.PI * 2
            );
            ctx.fill();

            // Health indicator
            const healthPercent =
              enemy.health / (enemy.type === 0 ? 1 : enemy.type === 1 ? 2 : 3);
            ctx.fillStyle = `rgba(255, 255, 255, ${healthPercent})`;
            ctx.fillRect(enemy.x, enemy.y - 5, enemy.width * healthPercent, 3);
          } else {
            // Large enemy
            ctx.fillStyle = "#9933ff";
            ctx.beginPath();
            ctx.moveTo(enemy.x + enemy.width / 2, enemy.y);
            ctx.lineTo(enemy.x + enemy.width, enemy.y + enemy.height / 2);
            ctx.lineTo(enemy.x + enemy.width / 2, enemy.y + enemy.height);
            ctx.lineTo(enemy.x, enemy.y + enemy.height / 2);
            ctx.closePath();
            ctx.fill();

            // Add details
            ctx.fillStyle = "#cc99ff";
            ctx.beginPath();
            ctx.arc(
              enemy.x + enemy.width / 2,
              enemy.y + enemy.height / 2,
              enemy.width / 4,
              0,
              Math.PI * 2
            );
            ctx.fill();

            // Health indicator
            const healthPercent =
              enemy.health / (enemy.type === 0 ? 1 : enemy.type === 1 ? 2 : 3);
            ctx.fillStyle = `rgba(255, 255, 255, ${healthPercent})`;
            ctx.fillRect(enemy.x, enemy.y - 5, enemy.width * healthPercent, 3);
          }
        });
      });
    };

    const drawObstacles = () => {
      obstacles.forEach((obstacle) => {
        // Draw asteroid-like obstacle
        ctx.fillStyle = "#666666";
        ctx.beginPath();
        ctx.ellipse(
          obstacle.x + obstacle.width / 2,
          obstacle.y + obstacle.height / 2,
          obstacle.width / 2,
          obstacle.height / 2,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Add texture/details
        ctx.fillStyle = "#444444";
        for (let i = 0; i < 5; i++) {
          const size =
            obstacle.width / 10 + Math.random() * (obstacle.width / 5);
          const x = obstacle.x + Math.random() * obstacle.width;
          const y = obstacle.y + Math.random() * obstacle.height;

          // Only draw if within the obstacle
          const dx = x - (obstacle.x + obstacle.width / 2);
          const dy = y - (obstacle.y + obstacle.height / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < obstacle.width / 2) {
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Health indicator
        const healthPercent =
          obstacle.health / (5 + Math.floor(difficultyLevel / 2));
        ctx.fillStyle = `rgba(255, 255, 255, ${healthPercent})`;
        ctx.fillRect(
          obstacle.x,
          obstacle.y - 10,
          obstacle.width * healthPercent,
          5
        );
      });
    };

    const drawPowerUps = () => {
      powerUps.forEach((powerUp) => {
        // Draw power-up
        if (powerUp.type === "double") {
          // Double laser power-up (blue)
          ctx.fillStyle = "#00ffff";
          ctx.beginPath();
          ctx.arc(
            powerUp.x + powerUp.width / 2,
            powerUp.y + powerUp.height / 2,
            powerUp.width / 2,
            0,
            Math.PI * 2
          );
          ctx.fill();

          // Draw icon
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(
            powerUp.x + powerUp.width / 3 - 2,
            powerUp.y + powerUp.height / 4,
            4,
            powerUp.height / 2
          );
          ctx.fillRect(
            powerUp.x + (powerUp.width * 2) / 3 - 2,
            powerUp.y + powerUp.height / 4,
            4,
            powerUp.height / 2
          );

          // Add glow effect
          ctx.shadowColor = "#00ffff";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(
            powerUp.x + powerUp.width / 2,
            powerUp.y + powerUp.height / 2,
            powerUp.width / 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          // Large laser power-up (yellow)
          ctx.fillStyle = "#ffcc00";
          ctx.beginPath();
          ctx.arc(
            powerUp.x + powerUp.width / 2,
            powerUp.y + powerUp.height / 2,
            powerUp.width / 2,
            0,
            Math.PI * 2
          );
          ctx.fill();

          // Draw icon
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(
            powerUp.x + powerUp.width / 2 - 5,
            powerUp.y + powerUp.height / 4,
            10,
            powerUp.height / 2
          );

          // Add glow effect
          ctx.shadowColor = "#ffcc00";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(
            powerUp.x + powerUp.width / 2,
            powerUp.y + powerUp.height / 2,
            powerUp.width / 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Add pulsing animation
        const pulseSize = Math.sin(Date.now() / 200) * 3;
        ctx.strokeStyle = powerUp.type === "double" ? "#00ffff" : "#ffcc00";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(
          powerUp.x + powerUp.width / 2,
          powerUp.y + powerUp.height / 2,
          powerUp.width / 2 + pulseSize,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      });
    };

    const drawStars = () => {
      ctx.fillStyle = "#ffffff";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawParticles = () => {
      particles.forEach((particle) => {
        const alpha = 1 - particle.life / particle.maxLife;
        ctx.fillStyle = particle.color.replace(")", `, ${alpha})`);
        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.size * (1 - particle.life / particle.maxLife),
          0,
          Math.PI * 2
        );
        ctx.fill();
      });
    };

    const drawScore = () => {
      ctx.fillStyle = "#00ffff";
      ctx.font = `bold 24px ${FONT_FAMILY}`;
      ctx.textAlign = "right";
      ctx.fillText(
        `SCORE: ${currentScore}`,
        canvas.width - 20,
        canvas.height - 20
      );

      // Also display difficulty level
      ctx.fillText(
        `LEVEL: ${difficultyLevel}`,
        canvas.width - 20,
        canvas.height - 50
      );

      // Display active power-ups
      if (doubleLaserActive || largeLaserActive) {
        ctx.textAlign = "left";
        ctx.font = "bold 18px Arial";
        let yPos = canvas.height - 20;

        if (doubleLaserActive) {
          const timeLeft = Math.ceil((doubleLaserEndTime - Date.now()) / 1000);
          ctx.fillStyle = "#00ffff";
          ctx.font = `bold 24px ${FONT_FAMILY}`;
          ctx.fillText(`DOUBLE LASER: ${timeLeft}s`, 20, yPos);
          yPos -= 25;
        }

        if (largeLaserActive) {
          const timeLeft = Math.ceil((largeLaserEndTime - Date.now()) / 1000);
          ctx.fillStyle = "#ffcc00";
          ctx.font = `bold 24px ${FONT_FAMILY}`;
          ctx.fillText(`LARGE LASER: ${timeLeft}s`, 20, yPos);
        }
      }
    };

    const drawGameOver = () => {
      if (!gameActive) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#ff3366";
        ctx.font = `bold 48px ${FONT_FAMILY}`;
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);

        ctx.fillStyle = "#ffffff";
        ctx.font = `bold 24px ${FONT_FAMILY}`;
        ctx.fillText(
          `Score: ${currentScore}`,
          canvas.width / 2,
          canvas.height / 2 + 50
        );

        ctx.fillStyle = "#00ffff";
        ctx.font = `bold 18px ${FONT_FAMILY}`;
        ctx.fillText(
          "Restarting in 5 second...",
          canvas.width / 2,
          canvas.height / 2 + 100
        );
      }
    };

    // Game loop
    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update game objects
      updateStars();
      if (gameActive) {
        updatePlayer();
      }
      updateLasers();
      updateFormations();
      updateObstacles();
      updatePowerUps();
      updateParticles();

      // Draw game objects
      drawStars();
      drawLasers();
      drawEnemies();
      drawObstacles();
      drawPowerUps();
      if (gameActive) {
        drawPlayer();
      }
      drawParticles();
      drawScore();
      drawGameOver();

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    // Start the game
    gameLoop();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("click", mouseClickHandler);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("touchmove", touchMoveHandler);
      canvas.removeEventListener("touchstart", touchStartHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ touchAction: "none" }}
      />
    </>
  );
}
