import { Obstacle } from './Obstacle';
import { Player } from './Player';

let idCount: number = 0;

export class GameEngine {
    public player: Player = new Player(this);
    public obstacles: Obstacle[] = [];
    public id: number = idCount++;
    public score: number = 0;

    private interval: any;
    private obstacleInterval: any;

    private onEnd: (id: number) => void
    constructor(onEnd: (id: number) => void) {
        this.onEnd = onEnd;
        this.interval = setInterval(() => this.tick(), 20);
        this.obstacleInterval = setInterval(() => this.createObstacle(), 2000);
    }


    public createObstacle(): void {
        const position: number = Math.random() * 500;
        const size: number = Math.random() * 150 + 200;

        this.obstacles.push(new Obstacle(true, position, (id: number) => this.onRemove(id)))
        this.obstacles.push(new Obstacle(false, position + size, (id: number) => this.onRemove(id)))
    }

    private onRemove(id: number) {
        const targetIndex: number = this.obstacles.map(o => o.id).indexOf(id);
        if (targetIndex !== -1) {
            this.score++;
            this.obstacles.splice(targetIndex, 1)
        }
    }

    public tick(): void {
        this.player.tick();
        this.obstacles.forEach(o => o.tick())
    }

    public die(): void {
        console.log(`Game with id ${this.id} ended`);
        clearInterval(this.interval);
        clearInterval(this.obstacleInterval);
        this.onEnd(this.id);
    }
}