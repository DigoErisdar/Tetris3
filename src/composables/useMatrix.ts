import {Matrix} from "@/types/Game.ts";
import {Block, Coordinate} from "@/types/Block.ts";

export default function useMatrix() {
    function get(rows: number, cols: number): Matrix {
        return Array.from({length: rows}, (_, y) => {
            return Array.from({length: cols}, (_, x) => <Block>{})
        })
    }

    function* iter(matrix: Matrix) {
        for (let rowIndex = 0; rowIndex <= matrix?.length; rowIndex++) {
            for (let colIndex = 0; colIndex <= matrix[rowIndex]?.length; colIndex++) {
                yield {
                    block: matrix[rowIndex][colIndex] || {},
                    position: {
                        x: colIndex,
                        y: rowIndex
                    }
                }
            }
        }
    }

    function checkIntersection(a: Matrix, b: Matrix, pos: Coordinate): boolean {
        //a & b
        for (const {
            block,
            position
        } of iter(a)) {
            if (!!block?.color) {
                const newX = position.x + pos.x;
                const newY = position.y + pos.y;
                try {
                   if (!!b[newY][newX]?.color || newX < 0 || newX > b[newY]?.length) return false
                } catch (e){
                    return false
                }

            }
        }
        return true
    }

    return {
        get,
        iter,
        checkIntersection,
    }
}