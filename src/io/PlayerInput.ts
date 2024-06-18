import Player from "../domain/Player/Player";

export default class PlayerInput {
  constructor(private player: Player) {}

  private currentDirection: string | undefined;

  private changeDirection(direction: string | undefined) {
    if (this.currentDirection === direction) return;
    this.currentDirection = direction;
    const playerAffected = new CustomEvent("player-affected");
    window.dispatchEvent(playerAffected);
  }

  listen() {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          this.player.runLeft();
          this.changeDirection("left");
          break;
        case "ArrowRight":
          this.player.runRight();
          this.changeDirection("right");
          break;
        case "ArrowUp":
          this.player.jump();
          this.changeDirection("up");
          break;
        default:
          this.player.stop();
          break;
      }
    });

    window.addEventListener("keyup", () => {
      this.player.stop();
      this.changeDirection(undefined);
    });
  }
}
