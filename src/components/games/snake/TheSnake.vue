<script setup>
import SnakeField from '@/components/games/snake/SnakeField.vue';
import { ref, onMounted } from 'vue';

const gameConfig = {
  step: 0,
  maxStep: 6,
  dx: 20,
  dy: 20
};

const snake = {
  segments: [
    { x: 3, y: 5 },
    { x: 2, y: 5 },
    { x: 1, y: 5 },
    { x: 0, y: 5 },
    ],
  directionX: 1,
  directionY: 0
};

const gameField = ref([]);

function gameLoop() {
  requestAnimationFrame(gameLoop);
  if (++gameConfig.step < gameConfig.maxStep) {
    return;
  }
  gameConfig.step = 0;
  clearField();
  moveSnake(snake.directionX, snake.directionY);
}

const createField = () => {
  for (let i = 0; i < gameConfig.dx; i++) {
    gameField.value[i] = [];
    for (let j = 0; j < gameConfig.dy; j++) {
      gameField.value[i][j] = 0;
    }
  }
};

function clearField() {
  for (let i = 0; i < gameConfig.dx; i++) {
    for (let j = 0; j < gameConfig.dy; j++) {
      gameField.value[i][j] = 0;
    }
  }
}

function moveSnake(x, y) {

    snake.segments.unshift(cheackClashes(x,y)); // добавляем новую голову в начало массива

    // Удаление последнего сегмента (хвоста), если змейка не поела
    if (!ateFood()) {
        snake.segments.pop();
    }

    // Обновление координат сегментов хвоста
    for (let i = 0; i < snake.segments.length; i++) {
        const segment = snake.segments[i];
        gameField.value[segment.y][segment.x] = 1;
    }
}

function cheackClashes(x, y) {
  let newX = snake.segments[0].x + x;
  let newY = snake.segments[0].y + y;

  if (newX >= gameConfig.dx) {
    newX = 0;
  } else if (newX < 0) {
    newX = gameConfig.dx - 1;
  } else if (newY >= gameConfig.dy) {
    newY = 0
  } else if(newY < 0) {
    newY = gameConfig.dy - 1;
  }

  return { x: newX, y: newY };
}

function ateFood() {

}

onMounted(() => {
  createField();
  requestAnimationFrame(gameLoop);
  window.addEventListener('keydown', function (e) {
    const key = e.key;
    if (key === 'ArrowRight') {
      snake.directionX = 1;
      snake.directionY = 0;
    }
    if (key === 'ArrowLeft') {
      snake.directionX = -1;
      snake.directionY = 0;
    }
    if (key === 'ArrowDown') {
      snake.directionY = 1;
      snake.directionX = 0;
    }
    if (key === 'ArrowUp') {
      snake.directionY = -1;
      snake.directionX = 0;
    }
  });
});
</script>

<template>
    <div class="snake-wrapper"
        @keypress.enter="test()"
    >
        <snake-field
            :gameField="gameField.flat()"
        />  
    </div>
</template>

<style lang="scss" >

</style>