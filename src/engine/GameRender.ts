import DynamicElement from "../domain/DynamicElement";
import SpritesMap from "../domain/Player/SpritesMap";
import StaticElement from "../domain/StaticElement";
import GamePhysics from "./GamePhysics";

interface CanvasImagesMap {
  [state: string]: CanvasImageSource;
}

interface RenderComponent {
  element: DynamicElement | StaticElement;
  canvasImagesMap?: CanvasImagesMap;
}

export default class GameRender {
  private canvasElement: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  public debug = false;
  private _scale = 1;

  private components: Array<RenderComponent> = [];

  private _currentAnimationInterval: number | undefined;

  constructor(
    canvasElement: HTMLCanvasElement,
    private readonly gamePhysics: GamePhysics
  ) {
    this.canvasElement = canvasElement;
    if (!this.canvasElement) {
      throw new Error("Could not get canvas tag");
    }

    this.ctx = canvasElement.getContext("2d") as CanvasRenderingContext2D;

    if (!this.ctx) {
      throw new Error("Could not get canvas context");
    }
  }

  private setUpCanvas() {
    this.ctx.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    this.ctx.fillStyle = "#efe2fb";
    this.ctx.fillRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
  }

  addComponent(element: DynamicElement | StaticElement) {
    this.components.push({
      element: element,
    });
  }

  private animateElement(element: DynamicElement) {
    if (this._currentAnimationInterval) {
      window.clearInterval(this._currentAnimationInterval);
    }
    this._currentAnimationInterval = window.setInterval(() => {
      element.iterateFrame();
    }, element.frameDuration);
  }

  private drawDynamicElement(component: RenderComponent) {
    const element = component.element;
    if (element.type !== "dynamic" || component.canvasImagesMap === undefined) {
      return;
    }

    const coords = element.coords;

    const scaledWidth = element.size.width * this._scale;
    const scaledHeight = element.size.height * this._scale;

    const elementSprite = component.canvasImagesMap[element.currentStateName];
    this.ctx.drawImage(
      elementSprite,
      element.framesX[element.currentFrame],
      element.framesY[element.currentFrame],
      element.size.width,
      element.size.height,
      coords.x,
      coords.y,
      scaledWidth,
      scaledHeight
    );

    if (this.debug) {
      this.ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
      this.ctx.fillRect(coords.x, coords.y, scaledWidth, scaledHeight);
    }
  }

  private drawStaticElement(component: RenderComponent) {
    const element = component.element;
    if (element.type !== "static") {
      return;
    }

    const coords = element.coords;

    this.ctx.fillStyle = "rgb(82, 107, 35)";
    this.ctx.fillRect(
      coords.x,
      coords.y,
      element.size.width,
      element.size.height
    );
  }

  private async buildCanvasImagesMap(
    spritesMap: SpritesMap
  ): Promise<CanvasImagesMap> {
    return new Promise(async (resolve, _) => {
      const canvasImagesMap: CanvasImagesMap = {};
      for (const state in spritesMap) {
        const htmlImage: HTMLImageElement = new Image();
        htmlImage.src = spritesMap[state];

        canvasImagesMap[state] = await new Promise((resolve, _) => {
          htmlImage.onload = () => {
            resolve(htmlImage);
          };
        });
      }
      resolve(canvasImagesMap);
    });
  }

  private requestAnimationFrame() {
    const animationCallback = this.requestAnimationFrame.bind(this);

    this.setUpCanvas();

    this.gamePhysics.applyPhysics();

    this.components.forEach((graphicComponent: RenderComponent) => {
      switch (graphicComponent.element.type) {
        case "dynamic":
          this.drawDynamicElement(graphicComponent);
          graphicComponent.element.perform();
          break;
        case "static":
          this.drawStaticElement(graphicComponent);
          break;
      }
    });
    window.requestAnimationFrame(animationCallback);
  }

  private async preLoad(): Promise<void> {
    this.components.forEach((graphicComponent: RenderComponent) => {
      if (graphicComponent.element.type === "static") {
        return;
      }
      this.animateElement(graphicComponent.element);
    });
    await Promise.all(
      this.components.map(async (component: RenderComponent) => {
        if (
          component.element.type === "dynamic" &&
          component.canvasImagesMap === undefined
        ) {
          component.canvasImagesMap = await this.buildCanvasImagesMap(
            component.element.spritesMap
          );
        }
      })
    );
  }

  async render(): Promise<void> {
    await this.preLoad();

    window.addEventListener("player-affected", async () => {
      await this.preLoad();
    });

    this.requestAnimationFrame();
  }

  set scale(scale: number) {
    this._scale = Math.abs(scale);
  }
}
