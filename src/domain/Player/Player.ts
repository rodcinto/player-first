import DynamicElement from "../DynamicElement";

import Idle from "./Idle";
import State from "./State";
import Running from "./Running";
import MidAir from "./MidAir";
import { Size, Coords } from "../spatialProps";
import Movement from "./Movement";
import SpritesMap from "./SpritesMap";

class Player implements DynamicElement {
  public readonly type: "dynamic" = "dynamic";

  private _midAir: boolean = false;

  private _states: Array<State> = [Idle.create(), Running.create(), MidAir.create()];
  private _state: State = this._states[0];

  private _movement: Movement = new Movement();

  private _spritesMap: SpritesMap = {};

  constructor(public readonly id: string) {
    this.initializeSpritesMap();
  }

  private set state(index: number) {
    this._state = this._states[index];
  }

  private initializeSpritesMap(): void {
    this._states.forEach((state) => {
      this._spritesMap[state.name] = state.spriteSrc;
    });
  }

  stop(): void {
    if (this._midAir) {
      this.state = 2;
    } else {
      this.state = 0;
    }
    this._movement.stop();
  }

  runLeft(): void {
    this.state = 1;
    this._movement.runLeft();
  }
  runRight(): void {
    this.state = 1;
    this._movement.runRight();
  }

  jump(): void {
    if (this._state.name === "midAir") {
      return;
    }
    this.state = 2;
    this._movement.jump();
  }

  youAreFalling(isFalling: boolean): void {
    if (this._midAir === isFalling) {
      return;
    }
    this._midAir = isFalling;
    if (isFalling) {
      this.state = 2;
    } else {
      this.stop();
    }
  }

  iterateFrame(): number {
    return this._state.iterateFrame();
  }

  hasImpulse(): boolean {
    return this._movement.hasImpulse();
  }

  decreaseImpulse(): void {
    this._movement.decreaseImpulse();
  }

  perform(): void {
    this._movement.perform();
  }

  get spritesMap(): SpritesMap {
    return this._spritesMap;
  }

  get currentFrame(): number {
    return this._state.currentFrame;
  }

  get spriteSrc(): string {
    return this._state.spriteSrc;
  }

  get coords(): Coords {
    return this._movement.coords;
  }

  set coords(value: Coords) {
    this._movement.coords = value;
  }

  get size(): Size {
    return this._state.size;
  }

  get framesX(): number[] {
    return this._state.framesX;
  }

  get framesY(): number[] {
    return this._state.framesY;
  }

  get frameDuration(): number {
    return this._state.frameDuration;
  }

  get currentStateName(): string {
    return this._state.name;
  }
}
export default Player;
