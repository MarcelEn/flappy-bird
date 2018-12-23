import { Player } from './Player';

let idCount: number = 0;

export class Obstacle {
    public x: number = 500;
    public y: number;
    public width: number = 100;
    public top: boolean;
    public id: number = idCount++;

    private onRemove: (id: number) => void
    constructor(top: boolean, y: number, onRemove: (id: number) => void) {
        this.top = top;
        this.y = y;
        this.onRemove = onRemove;
    }

    public tick() {
        this.x -= 5;

        if(this.x < 0 - this.width){
            this.onRemove(this.id);
        }
    }

    public checkForCollition(player: Player) {
        if (player.x < this.x && player.x + player.width > this.x || player.x < this.x + this.width && player.x + player.width > this.x + this.width){
            if (this.top) {
                if (player.y < this.y)
                    player.game.die();
            } else {
                if (player.y + player.height > this.y)
                    player.game.die();
            }
        }
    }
}