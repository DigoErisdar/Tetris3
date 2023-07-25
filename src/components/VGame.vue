<template>
  <p>{{ game.currentFigure }}</p>
  <hr>
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

function move(x: number = 0, y: number = 0) {
  erase(game.currentFigure);
  game.currentFigure.position.x += x;
  game.currentFigure.position.y += y;
  const hasMove = matrix.checkIntersection(game.currentFigure.matrix, game.matrix, game.currentFigure.position)
  if (!hasMove) {
    game.currentFigure.position.x -= x;
    game.currentFigure.position.y -= y;
  }
  draw(game.currentFigure);
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
    }
  })
})
</script>
