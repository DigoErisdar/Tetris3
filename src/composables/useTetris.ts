import {Figure, FigureFactory, FIGURES} from "@/types/Figure.ts";
import useMatrix from "@/composables/useMatrix.ts";
import {Game} from "@/types/Game.ts";
import {reactive} from "vue";

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


    function draw(figure: Figure) {
        for (const {
            block,
            position
        } of matrix.iter(figure.matrix)) {
            const newX = figure.position.x + position.x;
            const newY = figure.position.y + position.y;
            game.matrix[newY][newX] = block;
        }
    }

    function erase(figure: Figure) {
        for (const {
            position
        } of matrix.iter(figure.matrix)) {
            const newX = figure.position.x + position.x;
            const newY = figure.position.y + position.y;
            game.matrix[newY][newX] = {};
        }
    }

    async function action(callback: CallableFunction, rollback?: CallableFunction) {
        return await new Promise((resolve, reject) => {
            erase(game.currentFigure);
            callback()
            const hasMove = matrix.checkIntersection(game.currentFigure.matrix, game.matrix, game.currentFigure.position)
            if (!hasMove && rollback) {
                rollback()
                return reject('Не может двигаться')
            }
            return resolve(true)
        })
            .finally(() => {
                draw(game.currentFigure);
            })
    }

    function move(x: number = 0, y: number = 0) {
        return action(() => {
            game.currentFigure.position.x += x;
            game.currentFigure.position.y += y;
        }, () => {
            game.currentFigure.position.x -= x;
            game.currentFigure.position.y -= y;
        })
    }

    function rotate() {
        const matrix = game.currentFigure.matrix;
        const N = matrix?.length - 1;
        let oldMatrix = matrix.copyWithin(0, 0);
        const tempMatrix = matrix.map((row, i) => row.map((_, j) => matrix[N - j][i]));
        return action(() => game.currentFigure.matrix = tempMatrix, () => game.currentFigure.matrix = oldMatrix)
    }

    function setNewFigure() {
        game.currentFigure = getRandomFigure();
        if (!matrix.checkIntersection(game.currentFigure.matrix, game.matrix, game.currentFigure.position)) endGame()
    }

    function start() {
        draw(game.currentFigure);
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