import { Coords, Size } from "./spatialProps";
import StaticElement from "./StaticElement";

export default class Platform implements StaticElement {
  public readonly type: "static" = "static";

  constructor(public readonly id: string = "platform") {}

  public readonly size: Size = {
    width: 300,
    height: 20,
  };

  public readonly collisionBox: Size = {
    width: 100,
    height: 100,
  };

  public coords: Coords = {
    x: 0,
    y: 0,
  };
}
