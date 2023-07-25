<template>
  <table :class="[style.VGame]">
    <tr v-for="row in tetris.game.matrix">
      <td v-for="block in row" :style="{backgroundColor: block.color}"></td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import style from './VGame.module.scss';
import useTetris from "@/composables/useTetris.ts";
import {onMounted} from "vue";

interface GameProps {
  rows?: number,
  cols?: number,
}

const props = withDefaults(defineProps<GameProps>(), {
  rows: 20,
  cols: 10,
})
const tetris = useTetris(props.cols, props.rows);
onMounted(() => tetris.start())
</script>
