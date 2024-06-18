import runSprite from "../../../public/sprite/run.png";
import State from "./State";

export default class Running extends State {
  public static create(): Running {
    return new Running(
      "running",
      {
        width: 36,
        height: 42,
      },
      [30, 123, 216, 309, 402, 495, 588, 681],
      [65, 65, 65, 65, 65, 65, 65, 65],
      100,
      runSprite
    );
  }
}
