import SpritesMap from "./Player/SpritesMap";
import { Size, Coords } from "./spatialProps";

export default interface DynamicElement {
  readonly type: "dynamic";
  readonly id: string;
  readonly size: Size;
  coords: Coords;

  readonly framesX: number[];
  readonly framesY: number[];
  readonly frameDuration: number;
  readonly spriteSrc: string;

  get spritesMap(): SpritesMap;

  get currentStateName(): string;

  get currentFrame(): number;
  iterateFrame(): number;

  hasImpulse(): boolean;
  decreaseImpulse(): void;
  youAreFalling(isFalling: boolean): void;
  perform(): void;
}
