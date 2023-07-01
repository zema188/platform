<script setup>
import SnakeField from '@/components/games/snake/SnakeField.vue';
import { ref, onMounted } from 'vue';
import SnakeActions from './SnakeActions.vue';
import { db } from '@/firebase/config.js'
import { collection, where, query, doc, addDoc, setDoc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { useUser } from '@/stores/user'
import TheButton from '@/components/UI/TheButton.vue'

const user = useUser()

const gameConfig = {
  step: 0,
  maxStep: 4,
  dx: 15,
  dy: 15
};

const snake = {
  segments: [
    // { x: 3, y: 5 },
    // { x: 2, y: 5 },
    // { x: 1, y: 5 },
    // { x: 0, y: 5 },
  ],
  directionX: 1,
  directionY: 0
};


const gameInfo = ref({
  minutes: 0,
  seconds: 0,
  foodEat: 0,
  recordFoodEat: 0,
})
let intervalId;
let animationId;
let actionPopupIsActive = ref(true)



const food = {

}

const gameField = ref([]);

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


function gameLoop() {
  animationId = requestAnimationFrame(gameLoop);
  if (++gameConfig.step < gameConfig.maxStep) {
    return;
  }
  gameConfig.step = 0;
  clearField();
  moveSnake(snake.directionX, snake.directionY);
  if(checkDie()) {
    gameOver()
  }
  drowFood()
}


function moveSnake(x, y) {

    snake.segments.unshift(cheackClashes(x,y));

    if (!ateFood()) {
        snake.segments.pop();
    } else {
      createFood()
      gameInfo.value.foodEat++
    }
    // Обновление координат сегментов хвоста
    for (let i = 0; i < snake.segments.length; i++) {
      if(i === 0) {
        const segment = snake.segments[i];
        gameField.value[segment.y][segment.x] = 2;
      } else {
        const segment = snake.segments[i];
        gameField.value[segment.y][segment.x] = 1;
      }

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
  return (snake.segments[0].x === food.x && snake.segments[0].y === food.y)
}

function createFood() {
  const field = [...gameField.value.map((row) => [...row])];

  let occupiedCells = [...snake.segments];
  let save = [];

  for (let i = 0; i < occupiedCells.length; i++) {
    field[occupiedCells[i].y][occupiedCells[i].x] = 1;
  }

  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] !== 1) {
        save.push({ x: j, y: i });
      }
    }
  }

  if (save.length === 0) {
    // Все ячейки на поле заняты змеей, невозможно разместить еду
    return;
  }

  const randomIndex = randomInteger(0, save.length - 1);
  const foodLocation = save[randomIndex];

  food.x = foodLocation.x;
  food.y = foodLocation.y;
}

function checkDie() {
  const head = snake.segments[0];

  // Проверка столкновения с самой змейкой
  for (let i = 1; i < snake.segments.length; i++) {
    if (head.x === snake.segments[i].x && head.y === snake.segments[i].y) {
      return true
    }
  }
}

function drowFood() {
  gameField.value[food.y][food.x] = -1
}

function addControl() {
  window.addEventListener('keydown', function (e) {
    const key = e.key;
    
    if (key === 'ArrowRight' || key === 'd') {
      if(snake.directionX !== -1) {
        snake.directionX = 1;
        snake.directionY = 0;
      }
    }
    if (key === 'ArrowLeft' || key === 'a') {
      if(snake.directionX !== 1) {
        snake.directionX = -1;
        snake.directionY = 0;
      }
    }
    if (key === 'ArrowDown' || key === 's') {
      if(snake.directionY !== -1) {
        snake.directionY = 1;
        snake.directionX = 0;
      }
    }
    if (key === 'ArrowUp' || key === 'w') {
      if(snake.directionY !== 1) {
        snake.directionY = -1;
        snake.directionX = 0;
      }
    }
  });
}

function randomNewStateSnake() {
  snake.segments.length = 0
  const y = randomInteger(0, gameConfig.dy-1)
  let x = randomInteger(3, gameConfig.dx-1)
  for(let i = 0; i < 4; i++) {
    snake.segments[i] = new Object
    snake.segments[i].x = x
    snake.segments[i].y = y
    x--
  }
}



function startGame() {
  cancelAnimationFrame(animationId)
  resetGameInfo()
  createField()
  randomNewStateSnake()
  createFood()
  animationId = requestAnimationFrame(gameLoop);
}

function resetGameInfo() {
  gameInfo.value.foodEat = 0
}

function gameOver() {
  cancelAnimationFrame(animationId)
  actionPopupIsActive.value = true
  if(gameInfo.value.foodEat > gameInfo.value.recordFoodEat) {
    gameInfo.value.recordFoodEat = gameInfo.value.foodEat
    setSnakeGameUserInfo()
  }
}


onMounted(() => {
  getSnakeGameUserInfo()
  startGame()
  addControl()
  setTimeout(() => {
  cancelAnimationFrame(animationId)
  }, 200)
});

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

async function setSnakeGameUserInfo () {
  try {
    const collectionRef = collection(db, "snakeGameInfo");
    const docRef = doc(collectionRef, user.userInfo.user_id)

    const response = await setDoc(docRef, {
      food_eat_record: gameInfo.value.recordFoodEat
    });

  } catch(err) {
    console.error(err)
  }
}

async function getSnakeGameUserInfo  () {
  try {
    const docRef = doc(db, "snakeGameInfo", user.userInfo.user_id);
    const response = await getDoc(docRef)

    if(response.exists()) {
      console.log(response.data())
      gameInfo.value.recordFoodEat = response.data().food_eat_record

    } else {
      gameInfo.value.recordFoodEat = 0

    }

  } catch(err) {
    console.error(err)
  }
}

// function startTimer() {
//       intervalId = setInterval(() => {
//         if (gameInfo.value.seconds < 59) {
//           gameInfo.value.seconds++;
//         } else {
//           gameInfo.value.seconds = 0;
//           gameInfo.value.minutes++;
//         }
//       }, 1000);
// }

// function stopTimer() {
//   clearInterval(intervalId);
// }

// function formatTime(value) {
//   return value < 10 ? '0' + value : value;
// }
</script>

















<template>
    <div class="snake__wrapper"
    >
      <div class="snake__header">
        <div class="snake__info">
          <!-- <span>{{ formatTime(gameInfo.minutes) }}:{{ formatTime(gameInfo.seconds) }}</span> -->
          <div class="snake__food-quality">
            <img src="@/assets/images/snake/food.svg">
            <span>
              {{ gameInfo.foodEat }}
            </span>
          </div>
        </div>
      </div>
      <div class="snake__content">
          <snake-field
              :gameField="gameField.flat()"
          />
          <div class="snake__play-btns-main">
            <the-button
              :class="'snake__play-main'"
              @click="startGame()"
            >
              <font-awesome-icon :icon="['', 'play']" />
              Играть
            </the-button>
          </div>
      </div>
      <snake-actions
        :actionPopupIsActive="actionPopupIsActive"
        :gameLoseInfo="gameInfo"
        :userGameInfo="gameInfo"
        @update:isActive="(newValue) => {(actionPopupIsActive=newValue)}"
        @startGame="() => {startGame(), actionPopupIsActive=false}"
      />

    </div>

</template>

<style lang="scss" >
.snake {

&__wrapper {
  max-width: 420px;
  margin: 0 auto;
  background: #578a34;
}

&__header {
  background: #4a752c;
  padding: 10px 20px;
  color: #fff;
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
}

&__food-quality {
  display: flex;
  align-items: center;
  & span {
    padding-top: 6px;
  }
  & img {
    width: 50px;
    height: 50px;
  }
}
&__info {
}
&__content {
  margin: 0 auto;
  width: fit-content;
  padding: 0 20px 20px 20px;
}
&__play-main {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  gap: 10px;
}
&__play-btns-main {
  margin-top: 10px;
}
}

</style>