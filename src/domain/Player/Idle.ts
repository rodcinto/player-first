import idleSprite from "../../../public/sprite/idle.png";
import State from "./State";

export default class Idle extends State {
  public static create(): Idle {
    return new Idle(
      'idle',
      {
        width: 30,
        height: 42,
      },
      [30, 123, 216, 309, 402],
      [65, 65, 65, 65, 65],
      220,
      idleSprite
    );
  }
}
