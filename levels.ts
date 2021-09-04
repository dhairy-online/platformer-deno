import { Canvas } from "https://deno.land/x/sdl2@0.1-alpha.6/src/canvas.ts";
import Player from "./src/classes/player.ts";
import checkCollusion from "./src/functions/collusion.ts";

let levelPasser: Player;

export function checkLevelPass(
  player: Player,
  canvas: Canvas,
  font: number
): boolean {
  if (
    checkCollusion(
      player.x,
      player.y,
      player.dimensions,
      player.dimensions,
      levelPasser.x,
      levelPasser.y,
      levelPasser.dimensions,
      levelPasser.dimensions
    )
  ) {
    canvas.clear();
    // Play
    canvas.playMusic("assets/audio/passLevel.wav");
    canvas.renderFont(
      font,
      "Loading...",
      {
        blended: { color: { r: 25, g: 105, b: 0, a: 255 } },
      },
      // @ts-ignore: using --no-check
      {
        x: 250,
        y: 200,
      }
    );
    canvas.present();
    return true;
  }
  return false;
}

function level0(canvas: Canvas, font: number) {
  canvas.renderFont(
    font,
    "Move Using WASD",
    {
      blended: { color: { r: 25, g: 105, b: 0, a: 255 } },
    },
    // @ts-ignore: using --no-check
    {
      x: 350,
      y: 200,
    }
  );
  canvas.renderFont(
    font,
    "And Your Objective is to",
    {
      blended: { color: { r: 25, g: 105, b: 0, a: 255 } },
    },
    // @ts-ignore: using --no-check
    {
      x: 350,
      y: 300,
    }
  );
  canvas.renderFont(
    font,
    "Touch your opponent",
    {
      blended: { color: { r: 25, g: 105, b: 0, a: 255 } },
    },
    // @ts-ignore: using --no-check
    {
      x: 350,
      y: 400,
    }
  );
  levelPasser.draw(levelPasser.x, levelPasser.y, canvas, levelPasser);
}

function level1(canvas: Canvas, _font: number, player: Player) {
  const PlatformSurface = canvas.loadSurface("assets/sprites/platform.png");
  const PlatformImg = canvas.createTextureFromSurface(PlatformSurface);
  levelPasser.x = 300;
  levelPasser.y = 300;
  levelPasser.draw(levelPasser.x, levelPasser.y, canvas, levelPasser);
  // use deno ;)
  canvas.copy(
    PlatformImg,
    {
      x: 0,
      y: 0,
      width: 88,
      height: 88,
    },
    {
      x: 100,
      y: 200,
      width: 88,
      height: 88,
    }
  );
  if (
    checkCollusion(
      player.x,
      player.y,
      player.dimensions,
      player.dimensions,
      100,
      200,
      88,
      88
    )
  ) {
    player.x = 100;
  }
}
function level2(canvas: Canvas, _font: number) {
  levelPasser.x = 500;
  levelPasser.y = 200;
  levelPasser.draw(levelPasser.x, levelPasser.y, canvas, levelPasser);
}
function level3(canvas: Canvas, _font: number, player: Player) {
  levelPasser.x = 100;
  levelPasser.y = 290;
  levelPasser.draw(levelPasser.x, levelPasser.y, canvas, levelPasser);
}
function level4(canvas: Canvas, _font: number, player: Player) {
  levelPasser.x = 100;
  levelPasser.y = 290;
  levelPasser.draw(levelPasser.x, levelPasser.y, canvas, levelPasser);
}
function level5(canvas: Canvas, _font: number, player: Player) {
  levelPasser.x = 500;
  levelPasser.y = 402;
  levelPasser.draw(levelPasser.x, levelPasser.y, canvas, levelPasser);
}

export default function init(
  canvas: Canvas
): ((canvas: Canvas, font: number, player: Player) => void)[] {
  levelPasser = new Player(
    100,
    50,
    0,
    0,
    34,
    "sprites/player.png",
    "Level passer",
    canvas
  );

  return [level0, level1, level2, level3, level4, level5];
}