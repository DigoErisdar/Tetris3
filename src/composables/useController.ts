export default function useController(isPause: boolean, actions: {
    move: (x: number, y: number) => Promise<boolean|string>,
    rotate: () => void,
    restart: () => void,
    pause: () => void,
}) {

    async function controller(event: KeyboardEvent) {
        const {key} = event;
        if (event.shiftKey || event.altKey || event.ctrlKey) return
        if (key == 'p' || key == 'з') actions.pause();
        if (!isPause) switch (key) {
            case 'ф':
            case 'a':
                await actions.move(-1, 0);
                break;
            case 'в':
            case 'd':
                await actions.move(1, 0);
                break;
            case 'ы':
            case 's':
                await actions.move(0, 1);
                break;
            case 'ц':
            case 'w':
                actions.rotate();
                break;
            case 'к':
            case 'r':
                if (confirm('restart')) actions.restart();
                break;
            case " ":
                let down: any = async () => {
                    if (await actions.move(0, 1)) return await down()
                }
                await down();
                break;
        }
    }

    function on() {
        window.addEventListener('keydown', controller)
    }

    function off() {
        window.removeEventListener('keydown', controller);
    }

    return {
        on,
        off,
    }
}