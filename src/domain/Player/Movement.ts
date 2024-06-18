import { Coords } from "../spatialProps";

export default class Movement {
  private _impulse: number = 0;
  private readonly JUMP_STRENGTH = 30;
  private readonly JUMP_LIMIT = 100;
  private readonly STEP_LENGTH = 2;
  private _action: string | undefined;
  public coords: Coords = {
    x: 0,
    y: 0,
  };

  perform(): void {
    switch (this._action) {
      case "runLeft":
        this.move(-1);
        break;
        case "runRight":
        this.move(1);
        break;
      default:
        this.stop();
        break;
    }
  }

  stop(): void {
    this._action = undefined;
  }

  runLeft(): void {
    this._action = "runLeft";
  }

  runRight(): void {
    this._action = "runRight";
  }

  private move(direction: number): void {
    if (Math.abs(direction) !== 1) {
      return;
    }
    this.coords.x += this.STEP_LENGTH * direction;
  }

  jump(): void {
    this.impulse = this.JUMP_STRENGTH;
  }

  hasImpulse(): boolean {
    return this._impulse > 0;
  }

  decreaseImpulse(): void {
    if (this._impulse <= 0) {
      return;
    }
    this._impulse--;
  }

  private set impulse(value: number) {
    if (value <= 0) {
      return;
    }
    if (value > this.JUMP_LIMIT) {
      return;
    }
    this._impulse = value;
  }
}
