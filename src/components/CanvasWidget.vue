<template>
  <canvas :class="[style.CanvasWidget]"
          ref="canvas"
          :width="SIDE * props.matrix[0]?.length"
          :height="SIDE * props.matrix?.length"
  />
</template>

<script setup lang="ts">
import style from './CanvasWidget.module.scss';
import {Matrix} from "@/types/Game.ts";
import {computed, ref, watch} from "vue";
import useMatrix from "@/composables/useMatrix.ts";

interface Props {
  matrix: Matrix
}

const props = defineProps<Props>()
const canvas = ref();
const ctx = computed(() => canvas.value.getContext('2d'));
const matrix = useMatrix();
const SIDE = 25;

function draw() {
  for (const {block, position} of matrix.iter(props.matrix)) {
    ctx.value.fillStyle = block.color;
    ctx.value.fillRect(position.x * SIDE, position.y * SIDE, SIDE, SIDE);
  }
}

function clear() {
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
}

watch(props.matrix, () => {
  clear();
  draw();
})
</script>
