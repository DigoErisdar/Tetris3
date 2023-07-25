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
        [{color: 'blue'}, {color: 'blue'}, {color: 'blue'}, {color: 'blue'}],
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
const createRZ = (): Figure => ({
    position: {
        x: 0,
        y: 0
    },
    matrix: [
        [{color: 'purple'}, {color: 'purple'}, {}],
        [{}, {color: 'purple'}, {color: 'purple'}],
        [{}, {}, {}],
    ]
});
const createG = (): Figure => ({
    position: {
        x: 0,
        y: 0
    },
    matrix: [
        [{}, {}, {color: 'brown'}],
        [{color: 'brown'}, {color: 'brown'}, {color: 'brown'}],
        [{}, {}, {}],
    ]
});
const createRG = (): Figure => ({
    position: {
        x: 0,
        y: 0
    },
    matrix: [
        [{color: 'blueviolet'}, {}, {}],
        [{color: 'blueviolet'}, {color: 'blueviolet'}, {color: 'blueviolet'}],
        [{}, {}, {}],
    ]
});
const createT = (): Figure => ({
    position: {
        x: 0,
        y: 0
    },
    matrix: [
        [{}, {color: 'orange'}, {}],
        [{color: 'orange'}, {color: 'orange'}, {color: 'orange'}],
        [{}, {}, {}],
    ]
});

export enum FIGURES {
    Z = "Z",
    Cube = "Cube",
    Line = "Line",
    RZ = 'RZ',
    T = 'T',
    G = 'G',
    RG = 'RG',
}

export const FigureFactory = {
    [FIGURES.Z]: createZ,
    [FIGURES.Cube]: createCube,
    [FIGURES.Line]: createLine,
    [FIGURES.RZ]: createRZ,
    [FIGURES.T]: createT,
    [FIGURES.G]: createG,
    [FIGURES.RG]: createRG,
}
