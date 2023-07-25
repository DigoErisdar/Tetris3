import {Coordinate} from "@/types/Block.ts";
import {Matrix} from "@/types/Game.ts";


export interface Figure {
    position: Coordinate,
    matrix: Matrix,
}

const createCube = (): Figure => ({
    position: {
        x: 0,
        y: 0
    },
    matrix: [
        [{color: 'red'}, {color: 'red'}],
        [{color: 'red'}, {color: 'red'}],
    ]
})
const createLine = (): Figure => ({
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
})
const createZ = (): Figure => ({
    position: {
        x: 0,
        y: 0
    },
    matrix: [
        [{}, {color: 'green'}, {color: 'green'}],
        [{color: 'green'}, {color: 'green'}, {}],
        [{}, {}, {}],
    ]
});

export enum FIGURES {
  Z = "Z",
  Cube = "Cube",
  Line = "Line",
}
export const FigureFactory = {
    [FIGURES.Z]: createZ,
    [FIGURES.Cube]: createCube,
    [FIGURES.Line]: createLine,
}
