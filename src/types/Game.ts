import {Block} from "./Block.ts";
import {Figure} from "@/types/Figure.ts";

export type Matrix = Array<Array<Block>>

export interface Game {
    rows: number,
    cols: number,
    matrix: Matrix,
    currentFigure: Figure,
    speed: number,
}