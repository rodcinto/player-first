import { Size } from "../spatialProps";

export default abstract class State {
  private _currentFrame: number = 0;

  constructor(
    public readonly name: string,
    public readonly size: Size,
    public readonly framesX: number[],
    public readonly framesY: number[],
    public readonly frameDuration: number,
    public readonly spriteSrc: string
  ) {
  }

  public iterateFrame(): number {
    this._currentFrame++;
    if (this._currentFrame >= this.framesX.length) {
      this._currentFrame = 0;
    }
    return this._currentFrame;
  }

  public get currentFrame(): number {
    return this._currentFrame;
  }
}
