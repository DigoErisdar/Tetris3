<template>
  <div>
    <p>Скорость: {{ tetris.game.speed }} мс</p>
    <p>Очков: {{ tetris.game.score }}</p>
    <p v-show="tetris.isPause">Игра остановлена или окончена</p>
    <div>
      Управление:
      <p>w - Поворот</p>
      <p>p - Пауза</p>
      <p>Пробел - До конца вниз</p>
    </div>
  </div>
  <div style="display: flex; gap: 15px; height: 100px; align-items: center; justify-content: center;">
    <TableWidget v-for="figure in tetris.figuresSequence.items.value" :matrix="figure?.matrix"
                 style="background: transparent; border: none;"/>
  </div>
  <div :class="style.VGame">
    <div>
      <h2>Table</h2>
      <div style="display: flex; gap: 5px;">
        <TableWidget :matrix="tetris.game.matrix"/>
      </div>
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
