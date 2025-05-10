"use client";

import { useEffect, useRef, useState } from "react";

// テトロミノの形状定義
const TETROMINOES = [
  // I
  {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#00FFFF", // シアン
  },
  // J
  {
    shape: [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ],
    color: "#0000FF", // 青
  },
  // L
  {
    shape: [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0],
    ],
    color: "#FF7F00", // オレンジ
  },
  // O
  {
    shape: [
      [4, 4],
      [4, 4],
    ],
    color: "#FFFF00", // 黄色
  },
  // S
  {
    shape: [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
    ],
    color: "#00FF00", // 緑
  },
  // T
  {
    shape: [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0],
    ],
    color: "#800080", // 紫
  },
  // Z
  {
    shape: [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
    ],
    color: "#FF0000", // 赤
  },
];

// ゲームの状態
interface GameState {
  grid: number[][];
  activeTetromino: {
    shape: number[][];
    color: string;
    position: { x: number; y: number };
    rotation: number;
  } | null;
  nextTetromino: {
    shape: number[][];
    color: string;
  };
  score: number;
  level: number;
  linesCleared: number;
  gameOver: boolean;
}

export function TetrisGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    grid: Array(20)
      .fill(null)
      .map(() => Array(10).fill(0)),
    activeTetromino: null,
    nextTetromino: TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)],
    score: 0,
    level: 1,
    linesCleared: 0,
    gameOver: false,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number>(null);
  const lastDropTime = useRef<number>(0);
  const cellSize = useRef<number>(30); // セルサイズ
  const gridOffsetX = useRef<number>(0); // グリッドのX位置オフセット
  const gridOffsetY = useRef<number>(0); // グリッドのY位置オフセット

  // マウス位置をグリッド座標に変換
  const getGridPosition = (mouseX: number, mouseY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(
      (mouseX - rect.left - gridOffsetX.current) / cellSize.current
    );
    return { x: Math.max(0, Math.min(9, x)), y: 0 };
  };

  // テトロミノの回転
  const rotateTetromino = () => {
    if (!gameState.activeTetromino) return;

    const { shape, position, rotation } = gameState.activeTetromino;
    const newRotation = (rotation + 1) % 4;

    // 回転行列を適用
    const rotatedShape = rotateMatrix(shape, newRotation);

    // 回転後の位置が有効かチェック
    if (isValidPosition(rotatedShape, position)) {
      setGameState((prev) => ({
        ...prev,
        activeTetromino: {
          ...prev.activeTetromino!,
          shape: rotatedShape,
          rotation: newRotation,
        },
      }));
    }
  };

  // 行列の回転
  const rotateMatrix = (matrix: number[][], rotation: number) => {
    // 元の行列をコピー
    const result = JSON.parse(JSON.stringify(matrix));

    // 回転回数に応じて回転
    for (let r = 0; r < rotation; r++) {
      const n = result.length;
      // 一時的な行列を作成
      const temp = Array(n)
        .fill(null)
        .map(() => Array(n).fill(0));

      // 90度回転
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          temp[j][n - 1 - i] = result[i][j];
        }
      }

      // 結果を更新
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          result[i][j] = temp[i][j];
        }
      }
    }

    return result;
  };

  // 位置が有効かチェック
  const isValidPosition = (
    shape: number[][],
    position: { x: number; y: number }
  ) => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const newX = position.x + x;
          const newY = position.y + y;

          // 境界チェック
          if (newX < 0 || newX >= 10 || newY < 0 || newY >= 20) {
            return false;
          }

          // 他のブロックとの衝突チェック
          if (newY >= 0 && gameState.grid[newY][newX] !== 0) {
            return false;
          }
        }
      }
    }
    return true;
  };

  // テトロミノを固定
  const lockTetromino = () => {
    if (!gameState.activeTetromino) return;

    const { shape, position, color } = gameState.activeTetromino;
    const newGrid = [...gameState.grid];

    // グリッドにテトロミノを追加
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const gridY = position.y + y;
          const gridX = position.x + x;

          if (gridY >= 0 && gridY < 20 && gridX >= 0 && gridX < 10) {
            newGrid[gridY][gridX] = shape[y][x];
          }
        }
      }
    }

    // 揃った行を確認
    const { clearedGrid, linesCleared } = clearLines(newGrid);

    // スコア計算
    const additionalScore = calculateScore(linesCleared, gameState.level);
    const newLinesTotal = gameState.linesCleared + linesCleared;
    const newLevel = Math.floor(newLinesTotal / 10) + 1;

    // 次のテトロミノを生成
    const nextTetromino =
      TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)];

    // 新しいテトロミノの初期位置
    const newPosition = { x: 3, y: 0 };

    // ゲームオーバーチェック
    const isGameOver = !isValidPosition(nextTetromino.shape, newPosition);

    setGameState((prev) => ({
      ...prev,
      grid: clearedGrid,
      activeTetromino: isGameOver
        ? null
        : {
            shape: nextTetromino.shape,
            color: nextTetromino.color,
            position: newPosition,
            rotation: 0,
          },
      nextTetromino:
        TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)],
      score: prev.score + additionalScore,
      level: newLevel,
      linesCleared: newLinesTotal,
      gameOver: isGameOver,
    }));
  };

  // 揃った行を消去
  const clearLines = (grid: number[][]) => {
    const newGrid = [...grid];
    let linesCleared = 0;

    for (let y = 0; y < 20; y++) {
      if (newGrid[y].every((cell) => cell !== 0)) {
        // 揃った行を消去して上から新しい行を追加
        newGrid.splice(y, 1);
        newGrid.unshift(Array(10).fill(0));
        linesCleared++;
      }
    }

    return { clearedGrid: newGrid, linesCleared };
  };

  // スコア計算
  const calculateScore = (lines: number, level: number) => {
    const basePoints = [0, 40, 100, 300, 1200]; // 0, 1, 2, 3, 4行消しの点数
    return basePoints[lines] * level;
  };

  // テトロミノを下に移動
  const moveDown = () => {
    if (!gameState.activeTetromino) return false;

    const { shape, position } = gameState.activeTetromino;
    const newPosition = { ...position, y: position.y + 1 };

    if (isValidPosition(shape, newPosition)) {
      setGameState((prev) => ({
        ...prev,
        activeTetromino: {
          ...prev.activeTetromino!,
          position: newPosition,
        },
      }));
      return true;
    } else {
      lockTetromino();
      return false;
    }
  };

  // テトロミノを横に移動
  const moveHorizontal = (direction: number) => {
    if (!gameState.activeTetromino) return;

    const { shape, position } = gameState.activeTetromino;
    const newPosition = { ...position, x: position.x + direction };

    if (isValidPosition(shape, newPosition)) {
      setGameState((prev) => ({
        ...prev,
        activeTetromino: {
          ...prev.activeTetromino!,
          position: newPosition,
        },
      }));
    }
  };

  // ゲームループ
  const gameLoop = (time: number) => {
    // 落下速度の計算（レベルに応じて速くなる）
    const dropInterval = Math.max(100, 1000 - (gameState.level - 1) * 100);

    if (time - lastDropTime.current > dropInterval) {
      if (gameState.activeTetromino) {
        moveDown();
      } else if (!gameState.gameOver) {
        // 新しいテトロミノを生成
        const newTetromino = gameState.nextTetromino;
        const newPosition = { x: 3, y: 0 };

        // ゲームオーバーチェック
        if (!isValidPosition(newTetromino.shape, newPosition)) {
          setGameState((prev) => ({ ...prev, gameOver: true }));
        } else {
          setGameState((prev) => ({
            ...prev,
            activeTetromino: {
              shape: newTetromino.shape,
              color: newTetromino.color,
              position: newPosition,
              rotation: 0,
            },
            nextTetromino:
              TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)],
          }));
        }
      }
      lastDropTime.current = time;
    }

    // マウス位置に基づいてテトロミノを移動
    if (gameState.activeTetromino) {
      const gridPos = getGridPosition(mousePosition.x, mousePosition.y);
      if (gridPos.x !== gameState.activeTetromino.position.x) {
        const direction =
          gridPos.x > gameState.activeTetromino.position.x ? 1 : -1;
        moveHorizontal(direction);
      }
    }

    draw();
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  // 描画関数
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // グリッドサイズの計算
    const gridWidth = 10 * cellSize.current;
    const gridHeight = 20 * cellSize.current;

    // グリッドの中央配置
    gridOffsetX.current = (canvas.width - gridWidth) / 2;
    gridOffsetY.current = (canvas.height - gridHeight) / 2;

    // 背景を描画
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // グリッドの背景
    ctx.fillStyle = "rgba(40, 40, 40, 0.8)";
    ctx.fillRect(
      gridOffsetX.current,
      gridOffsetY.current,
      gridWidth,
      gridHeight
    );

    // グリッドの枠線
    ctx.strokeStyle = "rgba(100, 100, 100, 0.3)";
    ctx.lineWidth = 1;

    // 縦線
    for (let x = 0; x <= 10; x++) {
      ctx.beginPath();
      ctx.moveTo(
        gridOffsetX.current + x * cellSize.current,
        gridOffsetY.current
      );
      ctx.lineTo(
        gridOffsetX.current + x * cellSize.current,
        gridOffsetY.current + gridHeight
      );
      ctx.stroke();
    }

    // 横線
    for (let y = 0; y <= 20; y++) {
      ctx.beginPath();
      ctx.moveTo(
        gridOffsetX.current,
        gridOffsetY.current + y * cellSize.current
      );
      ctx.lineTo(
        gridOffsetX.current + gridWidth,
        gridOffsetY.current + y * cellSize.current
      );
      ctx.stroke();
    }

    // 固定されたブロックを描画
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 10; x++) {
        if (gameState.grid[y][x] !== 0) {
          const blockType = gameState.grid[y][x];
          const color = TETROMINOES[blockType - 1].color;
          drawBlock(ctx, x, y, color);
        }
      }
    }

    // アクティブなテトロミノを描画
    if (gameState.activeTetromino) {
      const { shape, position, color } = gameState.activeTetromino;
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x] !== 0) {
            drawBlock(ctx, position.x + x, position.y + y, color);
          }
        }
      }

      // 落下位置のプレビュー
      let dropY = position.y;
      while (isValidPosition(shape, { x: position.x, y: dropY + 1 })) {
        dropY++;
      }

      // 落下位置が現在位置と異なる場合のみプレビューを描画
      if (dropY !== position.y) {
        ctx.globalAlpha = 0.3;
        for (let y = 0; y < shape.length; y++) {
          for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x] !== 0) {
              drawBlock(ctx, position.x + x, dropY + y, color);
            }
          }
        }
        ctx.globalAlpha = 1.0;
      }
    }

    // スコアとレベルを表示
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "right";
    ctx.fillText(
      `SCORE: ${gameState.score}`,
      canvas.width - 20,
      canvas.height - 60
    );
    ctx.fillText(
      `LEVEL: ${gameState.level}`,
      canvas.width - 20,
      canvas.height - 20
    );

    // ゲームオーバー表示
    if (gameState.gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#FF0000";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "24px Arial";
      ctx.fillText(
        `Score: ${gameState.score}`,
        canvas.width / 2,
        canvas.height / 2 + 50
      );

      ctx.fillStyle = "#00FFFF";
      ctx.font = "18px Arial";
      ctx.fillText(
        "Click to restart",
        canvas.width / 2,
        canvas.height / 2 + 100
      );
    }
  };

  // ブロックを描画
  const drawBlock = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string
  ) => {
    const blockX = gridOffsetX.current + x * cellSize.current;
    const blockY = gridOffsetY.current + y * cellSize.current;
    const size = cellSize.current;

    // ブロックの背景
    ctx.fillStyle = color;
    ctx.fillRect(blockX, blockY, size, size);

    // ハイライト（光の効果）
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.beginPath();
    ctx.moveTo(blockX, blockY);
    ctx.lineTo(blockX + size, blockY);
    ctx.lineTo(blockX, blockY + size);
    ctx.fill();

    // シャドウ（影の効果）
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.beginPath();
    ctx.moveTo(blockX + size, blockY);
    ctx.lineTo(blockX + size, blockY + size);
    ctx.lineTo(blockX, blockY + size);
    ctx.fill();

    // 枠線
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.lineWidth = 1;
    ctx.strokeRect(blockX, blockY, size, size);
  };

  // ゲームのリセット
  const resetGame = () => {
    setGameState({
      grid: Array(20)
        .fill(null)
        .map(() => Array(10).fill(0)),
      activeTetromino: null,
      nextTetromino:
        TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)],
      score: 0,
      level: 1,
      linesCleared: 0,
      gameOver: false,
    });
    lastDropTime.current = 0;
  };

  // マウス移動イベントハンドラ
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // マウスクリックイベントハンドラ
  const handleMouseClick = () => {
    if (gameState.gameOver) {
      resetGame();
    } else if (gameState.activeTetromino) {
      rotateTetromino();
    }
  };

  // キャンバスのリサイズ
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 画面サイズに応じてセルサイズを調整
    cellSize.current = Math.min(
      Math.floor(window.innerWidth / 20),
      Math.floor(window.innerHeight / 30)
    );
  };

  // 初期化と後処理
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // キャンバスのサイズ設定
    handleResize();
    window.addEventListener("resize", handleResize);

    // イベントリスナー
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleMouseClick);

    // ゲームループ開始
    requestRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("click", handleMouseClick);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameState]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
      style={{ touchAction: "none" }}
    />
  );
}
