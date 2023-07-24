import {Block} from "./Block.ts";
import {Figure} from "@/types/Figure.ts";

export type Matrix = Array<Array<Block>>

export interface Game {
    rows: number,
    cols: number,
    isPlayed?: boolean,
    matrix: Matrix,
    currentFigure: Figure,
}