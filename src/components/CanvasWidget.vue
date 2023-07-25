<template>
  <canvas :class="[style.CanvasWidget]"
          :style="{width: `calc(25px * ${matrix[0]?.length})`, height: `calc(25px * ${matrix?.length})`}"/>
</template>

<script setup lang="ts">
import style from './CanvasWidget.module.scss';
import {Matrix} from "@/types/Game.ts";

interface Props {
  matrix: Matrix
}

defineProps<Props>()
</script>
