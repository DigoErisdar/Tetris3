<template>
  <table :class="style.TableWidget" cellpadding="0" cellspacing="0">
    <tr v-for="row in matrix">
      <td v-for="block in row" :class="[style.TableWidgetBlock, !!block.color ? style.TableWidgetEmptyBlock : '']"
          :style="{'--color': block.color}">

      </td>
    </tr>
  </table>
</template>

<script lang="ts" setup>
import style from './TableWidget.module.scss';
import {Matrix} from "@/types/Game.ts";

interface Props {
  matrix: Matrix
}

defineProps<Props>()
</script>
