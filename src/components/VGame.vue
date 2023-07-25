<template>
  <div>
    <p>Скорость: {{ tetris.game.speed }} мс</p>
    <p>Очков: {{ tetris.game.score }}</p>
    <p v-show="tetris.game.isPause">Игра остановлена</p>
  </div>
  <div :class="style.VGame">
    <div>
      <h2>Table</h2>
      <TableWidget :matrix="tetris.game.matrix"/>
    </div>
    <div>
      <h2>Canvas</h2>
      <CanvasWidget :matrix="tetris.game.matrix"/>
    </div>
  </div>

</template>

<script setup lang="ts">
import useTetris from "@/composables/useTetris.ts";
import {onMounted} from "vue";
import TableWidget from "@/components/TableWidget.vue";
import CanvasWidget from "@/components/CanvasWidget.vue";
import style from "@/components/VGame.module.scss";

interface GameProps {
  rows?: number,
  cols?: number,
}

const props = withDefaults(defineProps<GameProps>(), {
  rows: 20,
  cols: 10,
})
const tetris = useTetris(props.cols, props.rows);
onMounted(() => {
  tetris.start();
})
</script>
