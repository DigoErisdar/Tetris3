<template>
  <table :class="[style.TableWidget]">
    <tr v-for="row in matrix">
      <td v-for="block in row" :style="{backgroundColor: block.color}"></td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import style from './TableWidget.module.scss';
import {Matrix} from "@/types/Game.ts";

interface Props {
  matrix: Matrix
}

defineProps<Props>()
</script>
