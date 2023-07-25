import {Figure, FigureFactory, FIGURES} from "@/types/Figure.ts";
import useMatrix from "@/composables/useMatrix.ts";
import {Action, Game, Matrix} from "@/types/Game.ts";
import {reactive} from "vue";
import {Block, Coordinate} from "@/types/Block.ts";

export default function useTetris(cols: number, rows: number, speed: number = 300) {
    let gameInterval: ReturnType<typeof setInterval>;
    const matrix = useMatrix();
    const game = reactive<Game>({
        rows,
        cols,
        matrix: matrix.get(rows, cols),
        currentFigure: getRandomFigure(),
        speed,
    })

    function getRandomFigure(): Figure {
        const randomIndex = Math.floor(Math.random() * Object.values(FIGURES)?.length);
        return Object.values(FigureFactory)[randomIndex]();
    }


    function _draw(area: Matrix, pos: Coordinate, target: Matrix, callback: (block: Block) => Block) {
        for (const {
            block,
            position
        } of matrix.iter(area)) {
            const newX = pos.x + position.x;
            const newY = pos.y + position.y;
            target[newY][newX] = callback(block);
        }
    }

    function erase(area: Matrix, pos: Coordinate, target: Matrix) {
        _draw(area, pos, target, () => {
            return {}
        })
    }

    function draw(area: Matrix, pos: Coordinate, target: Matrix) {
        _draw(area, pos, target, block => block)
    }

    async function action(callback: (data: Action) => void) {
        return await new Promise((resolve, reject) => {
            const tempFigure = {
                matrix: game.currentFigure.matrix.copyWithin(0, 0),
                position: {...game.currentFigure.position}
            }
            callback(tempFigure);
            const hasMove = matrix.checkIntersection(tempFigure.matrix, game.matrix, tempFigure.position);
            if (!hasMove) return reject('Не может двигаться');
            else {
                erase(game.currentFigure.matrix, game.currentFigure.position, game.matrix);
                callback(game.currentFigure)
                draw(game.currentFigure.matrix, game.currentFigure.position, game.matrix);
                return resolve(true)
            }
        })
    }

    function move(x: number = 0, y: number = 0) {
        return action(data => {
            data.position.x += x;
            data.position.y += y;
        })
    }

    function rotate() {
        const matrix = game.currentFigure.matrix.copyWithin(0, 0);
        const N = matrix?.length - 1;
        const tempMatrix = matrix.map((row, i) => row.map((_, j) => matrix[N - j][i]));
        return action(data => {
            data.matrix = tempMatrix;
        })
    }

    function setNewFigure() {
        game.currentFigure = getRandomFigure();
        if (!matrix.checkIntersection(game.currentFigure.matrix, game.matrix, game.currentFigure.position)) endGame()
    }

    function start() {
        draw(game.currentFigure.matrix, game.currentFigure.position, game.matrix);
        gameInterval = setInterval(() => move(0, 1).catch(() => setNewFigure()), game.speed)
        window.addEventListener('keydown', controller)
    }

    async function controller(event: KeyboardEvent) {
        const {key} = event;
        switch (key) {
            case 'a':
                await move(-1);
                break;
            case 'd':
                await move(1);
                break;
            case 's':
                await move(0, 1);
                break;
            case 'r':
                await rotate();
                break;
        }
    }

    function endGame() {
        clearInterval(gameInterval);
        alert('game over')
        window.removeEventListener('keydown', controller);
    }

    return {
        start,
        endGame,
        game,
        move,
        rotate,
    }
}