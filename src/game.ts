import "./style.css";
import Player from "./domain/Player/Player";
import GameRender from "./engine/GameRender";
import PlayerInput from "./io/PlayerInput";
import Platform from "./domain/Platform";
import GamePhysics from "./engine/GamePhysics";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <heading><h1>Level 1</h1></heading>
    <main>
      <canvas id="gameCanvas" width="800" height="600"></canvas>
    </main>
  </div>
`;

const canvas = document.querySelector<HTMLCanvasElement>("#gameCanvas");

const player1 = new Player('player1');
player1.coords = {
  x: 100,
  y: 50
};

const floor1a = new Platform('p1a');
floor1a.coords = {
  x: 50,
  y: 200
};
const floor1b = new Platform('p1b');
floor1b.coords = {
  x: 430,
  y: 200
};

const floor2 = new Platform('p2');
floor2.coords = {
  x: 350,
  y: 350
};
const floor3 = new Platform('p3');
floor3.coords = {
  x: 50,
  y: 500
};

const gamePhysics = new GamePhysics();
gamePhysics.addStaticElement(floor1a);
gamePhysics.addStaticElement(floor1b);
gamePhysics.addStaticElement(floor2);
gamePhysics.addStaticElement(floor3);
gamePhysics.addDynamicElement(player1);

const gameRender = new GameRender(canvas!, gamePhysics);
gameRender.scale = 1;
// gameRender.debug = true;
gameRender.addComponent(player1);
gameRender.addComponent(floor1a);
gameRender.addComponent(floor1b);
gameRender.addComponent(floor2);
gameRender.addComponent(floor3);
gameRender.render()


new PlayerInput(player1).listen();
