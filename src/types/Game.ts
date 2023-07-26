import {Block, Coordinate} from "./Block.ts";
import {Figure} from "@/types/Figure.ts";

export type Matrix = Block[][];

export interface Game {
    rows: number,
    cols: number,
    matrix: Matrix,
    currentFigure: Figure,
    speed: number,
    score: number,
}

export interface Action {
    matrix: Matrix,
    position: Coordinate,
}