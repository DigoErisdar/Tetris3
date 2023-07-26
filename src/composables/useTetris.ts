import {Figure, FigureFactory, FIGURES} from "@/types/Figure.ts";
import useMatrix from "@/composables/useMatrix.ts";
import {Action, Game, Matrix} from "@/types/Game.ts";
import {reactive, ref} from "vue";
import {Block, Coordinate} from "@/types/Block.ts";
import useController from "@/composables/useController.ts";
import useSequence from "@/composables/useSequence.ts";

export default function useTetris(cols: number, rows: number, speed: number = 200) {
    let gameInterval: ReturnType<typeof setTimeout>;
    const isPause = ref(false);
    const matrix = useMatrix();
    const game = reactive<Game>({
        rows,
        cols,
        matrix: matrix.get(rows, cols),
        currentFigure: getRandomFigure(),
        speed,
        score: 0,
    })
    const figuresSequence = useSequence(3);
    const controller = useController(isPause, {
        pause,
        move,
        restart,
        rotate,
    });

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

    async function action(callback: (data: Action) => void): Promise<boolean | string> {
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

    function move(x: number = 0, y: number = 0): Promise<boolean | string> {
        return action(data => {
            data.position.x += x;
            data.position.y += y;
        })
    }

    function rotate() {
        const matrix = game.currentFigure.matrix.copyWithin(0, 0);
        const N = matrix?.length - 1;
        const tempMatrix = matrix.map((row, i) => row.map((_, j) => matrix[N - j][i]));
        return action(data => data.matrix = tempMatrix)
    }

    function setNewFigure() {
        game.currentFigure = figuresSequence.push(getRandomFigure());
        move(0, 0).catch(() => endGame())
    }

    function checkLine() {
        for (let row = 0; row < game.matrix?.length; row++) {
            if (game.matrix[row].every((block) => !!block?.color)) {
                game.matrix.splice(row, 1);
                game.matrix.splice(0, 0, Array.from({length: cols}, () => <Block>{}))
                game.score++;
                if (game.speed > 10) game.speed -= 10;
            }
        }
    }

    async function start() {
        let cond = figuresSequence.push(getRandomFigure());
        while (!cond) {
            cond = figuresSequence.push(getRandomFigure());
        }
        controller.on();
        await pause(false);
    }

    async function pause(value = !isPause.value) {
        isPause.value = value;
        const loop = () => {
            move(0, 1)
                .catch(() => {
                    checkLine();
                    setNewFigure()
                })
            gameInterval = setTimeout(() => {
                loop();
            }, game.speed)
        }
        if (isPause.value) clearTimeout(gameInterval)
        else loop()

    }

    function stop() {
        pause(true).then(() => controller.off());
    }

    function restart() {
        game.speed = 200;
        game.score = 0;
        game.matrix = matrix.get(game.rows, game.cols);
        game.currentFigure = getRandomFigure();
    }

    function endGame() {
        if (confirm('game over, restart?')) restart();
        else stop()
    }

    return {
        figuresSequence,
        start,
        game,
        isPause,
        move,
        rotate,
    }
}