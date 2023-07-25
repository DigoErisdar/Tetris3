import {Matrix} from "@/types/Game.ts";
import {Block, Coordinate} from "@/types/Block.ts";

export default function useMatrix() {
    function get(rows: number, cols: number): Matrix {
        return Array.from({length: rows}, () => {
            return Array.from({length: cols}, () => <Block>{})
        })
    }

    function* iter(matrix: Matrix) {
        for (let rowIndex = 0; rowIndex <= matrix?.length; rowIndex++) {
            for (let colIndex = 0; colIndex <= matrix[rowIndex]?.length; colIndex++) {
                const block = matrix[rowIndex][colIndex] || {}
                if (!!block?.color) yield {
                    block,
                    position: {
                        x: colIndex,
                        y: rowIndex
                    }
                }
            }
        }
    }

    function checkIntersection(a: Matrix, b: Matrix, pos: Coordinate): boolean {
        const currentBlocks = Array.from(iter(a), ({block}) => block);
        for (const {
            position
        } of iter(a)) {
            const newX = position.x + pos.x;
            const newY = position.y + pos.y;
            try {
                const targetBlock = b[newY][newX];
                const isCurrentBlock = currentBlocks.includes(targetBlock);
                const isBorders = newX < 0 || newX >= b[newY]?.length;
                const isTargetBlock = !!targetBlock?.color;
                if ((isTargetBlock && !isCurrentBlock) || isBorders) return false;
            } catch (e) {
                return false
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