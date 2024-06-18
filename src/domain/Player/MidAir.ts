import runSprite from "../../../public/sprite/run.png";
import State from "./State";

export default class MidAir extends State {
  public static create(): MidAir {
    return new MidAir(
      "midAir",
      {
        width: 36,
        height: 42,
      },
      [216],
      [65],
      1,
      runSprite
    );
  }
}
