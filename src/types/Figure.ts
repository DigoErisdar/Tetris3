import {Coordinate} from "@/types/Block.ts";
import {Matrix} from "@/types/Game.ts";


export interface Figure {
    position: Coordinate,
    matrix: Matrix,
}

export const Cube = <Figure>{
    position: {
        x: 0,
        y: 0
    },
    matrix: [
        [{color: 'red'}, {color: 'red'}],
        [{color: 'red'}, {color: 'red'}],
    ]
}
export const Line = <Figure>{
    position: {
        x: 0,
        y: 0
    },
    matrix: [
        [{}, {}, {}, {}],
        [{color: 'red'}, {color: 'red'}, {color: 'red'}, {color: 'red'}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}],
    ]
}
export const Z = <Figure>{
    position: {
        x: 0,
        y: 0
    },
    matrix: [
        [{}, {color: 'green'}, {color: 'green'}],
        [{color: 'green'}, {color: 'green'}, {}],
        [{}, {}, {}],
    ]
}

export const FIGURES = [Z, Cube, Line];