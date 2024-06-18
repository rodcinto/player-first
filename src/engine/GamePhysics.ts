import DynamicElement from "../domain/DynamicElement";
import Player from "../domain/Player/Player";
import StaticElement from "../domain/StaticElement";

interface ElementsMidAir {
  [key: string]: boolean;
}

export default class GamePhysics {
  private GRAVITY = 5;
  private _staticElements: Array<StaticElement> = [];
  private _dynamicElements: Array<DynamicElement> = [];
  private elementsMidAir: ElementsMidAir = {};

  addStaticElement(element: StaticElement) {
    this._staticElements.push(element);
  }

  addDynamicElement(element: DynamicElement) {
    this._dynamicElements.push(element);
  }

  private willFall(subject: DynamicElement) {
    const subjectX = subject.coords.x;
    const subjectBottom = subject.coords.y + subject.size.height;

    const floor: StaticElement | undefined = this._staticElements.find(
      (staticElement: StaticElement) => {
        const limitLeft = staticElement.coords.x - subject.size.width;
        const limitRight = staticElement.coords.x + staticElement.size.width;
        const limitTop = staticElement.coords.y + staticElement.size.height;
        return (
          subjectX >= limitLeft &&
          subjectX <= limitRight &&
          subjectBottom < limitTop
        );
      }
    );
    if (!floor) {
      return true;
    }

    const floorTop = floor.coords.y;
    if (subjectBottom < floorTop) {
      return true;
    }

    if (floorTop + floor.size.height <= subjectBottom) {
      return true;
    }

    return false;
  }

  private setElementMidAir(element: DynamicElement, midAir: boolean): void {
    if (this.elementsMidAir[element.id] === midAir) {
      return;
    }
    this.elementsMidAir[element.id] = midAir;
    element.youAreFalling(midAir);

    if (element instanceof Player) {
      const playerAffected = new CustomEvent("player-affected");
      window.dispatchEvent(playerAffected);
    }
  }

  private applyGravity() {
    this._dynamicElements.forEach((element: DynamicElement) => {
      if (element.hasImpulse()) {
        element.coords.y -= this.GRAVITY;
        this.setElementMidAir(element, true);
        element.decreaseImpulse();
        return;
      }

      if (this.willFall(element)) {
        element.coords.y += this.GRAVITY;
        this.setElementMidAir(element, true);
        return;
      }

      this.setElementMidAir(element, false);
    });
  }

  applyPhysics() {
    this.applyGravity();
  }
}
