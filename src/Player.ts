import { GameEngine } from './GameEngine';

const gravity: number = 1.5;
const jumpSpeed: number = -15;

export class Player {
    public y: number = 150;
    public x: number = 40;
    public vY: number = 0;
    public height: number = 50;
    public width: number = 70;

    public game: GameEngine;

    public keylistener: any;

    constructor(game: GameEngine) {
        this.game = game;
        window.addEventListener('keypress', (e: KeyboardEvent) => this.flap(e), true);
    }

    public flap(e: KeyboardEvent): void {
        if (e.key === ' ') {
            this.vY = jumpSpeed
        }
    }

    public tick(): void {
        this.vY += gravity;
        this.y += this.vY;

        if (this.y > 700 - this.height || this.y < 0)
            this.game.die();

        this.game.obstacles.forEach(o => o.checkForCollition(this))

    }
}