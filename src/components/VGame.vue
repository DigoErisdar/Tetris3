<template>
  <table :class="[style.VGame]">
    <tr v-for="row in game.matrix">
      <td v-for="block in row" :style="{backgroundColor: block.color}"></td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import style from './VGame.module.scss';
import {onMounted, reactive} from "vue";
import {Game} from "@/types/Game.ts";
import {Figure, FIGURES} from "@/types/Figure.ts";
import useMatrix from "@/composables/useMatrix.ts";

interface GameProps {
  rows?: number,
  cols?: number,
}

const props = withDefaults(defineProps<GameProps>(), {
  rows: 20,
  cols: 10,
})
const matrix = useMatrix();

const game = reactive<Game>({
  rows: props.rows,
  cols: props.cols,
  isPlayed: false,
  matrix: matrix.get(props.rows, props.cols),
  currentFigure: getRandomFigure(),
})


function getRandomFigure(): Figure {
  return FIGURES[Math.floor(Math.random() * FIGURES.length)];
}


function draw(figure: Figure) {
  for (const {
    block,
    position
  } of matrix.iter(figure.matrix)) {
    const newX = figure.position.x + position.x;
    const newY = figure.position.y + position.y;
    game.matrix[newY][newX] = block;
  }
}

function erase(figure: Figure) {
  for (const {
    position
  } of matrix.iter(figure.matrix)) {
    const newX = figure.position.x + position.x;
    const newY = figure.position.y + position.y;
    game.matrix[newY][newX] = {};
  }
}

function action(action: CallableFunction, cancel?: CallableFunction) {
  return new Promise(() => {
    erase(game.currentFigure);
    action()
    const hasMove = matrix.checkIntersection(game.currentFigure.matrix, game.matrix, game.currentFigure.position)
    if (!hasMove && cancel) cancel()
    draw(game.currentFigure);
  })
}

function move(x: number = 0, y: number = 0) {
  return action(() => {
    game.currentFigure.position.x += x;
    game.currentFigure.position.y += y;
  }, () => {
    game.currentFigure.position.x -= x;
    game.currentFigure.position.y -= y;
  })
}

function rotate() {
  const matrix = game.currentFigure.matrix;
  const N = matrix?.length - 1;
  let oldMatrix = matrix.copyWithin(0, 0);
  const tempMatrix = matrix.map((row, i) => row.map((_, j) => matrix[N - j][i]));
  return action(() => game.currentFigure.matrix = tempMatrix, () => game.currentFigure.matrix = oldMatrix)
}


onMounted(() => {
  draw(game.currentFigure);


  window.addEventListener('keydown', e => {
    const {key} = e;
    switch (key) {
      case 'a':
        move(-1);
        break;
      case 'd':
        move(1);
        break;
      case 's':
        move(0, 1);
        break;
      case 'w':
        move(0, -1);
        break;
      case 'r':
        rotate();
        break;
    }
  })
})
</script>
