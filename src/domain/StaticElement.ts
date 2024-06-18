import { Size, Coords } from "./spatialProps";

export default interface StaticElement {
  readonly type: "static";
  readonly id: string;
  readonly size: Size;
  readonly collisionBox: Size;

  coords: Coords;
}
