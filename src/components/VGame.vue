<template>
  <div :class="style.VGame">
    <TableWidget :matrix="tetris.game.matrix"/>
    <CanvasWidget :matrix="tetris.game.matrix"/>
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
  rows: 16,
  cols: 10,
})
const tetris = useTetris(props.cols, props.rows);
onMounted(() => {
  tetris.start();
})
</script>
