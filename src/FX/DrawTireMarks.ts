import { Graphics, Sprite } from 'pixi.js';
import { FXData } from './FXData';

/**
 * an array of the tire marks drawn each frame
 */
export const tireMarkList: FXData[] = [];

/**
 * Draw a tire mark behind a sprite.
 *
 * @param graphics - The PIXI Graphics object to draw the tire mark on.
 * @param sprite - The Sprite to target.
 * @returns void
 */
export const drawTireMark = (graphics: Graphics, sprite: FXData): void => {
  const tireMarkColor = 0x473131;
  const offset = sprite.width * 0.2;
  const circleRadius = sprite.width * 0.05;

  const position1X =
    sprite.x - Math.cos(sprite.rotation + Math.PI / 2) * offset;
  const position1Y =
    sprite.y - Math.sin(sprite.rotation + Math.PI / 2) * offset;

  const position2X =
    sprite.x - Math.cos(sprite.rotation - Math.PI / 2) * offset;
  const position2Y =
    sprite.y - Math.sin(sprite.rotation - Math.PI / 2) * offset;

  graphics.lineStyle(0); // No outline
  graphics.beginFill(tireMarkColor, sprite.alpha);

  // Draw circles at the specified positions
  graphics.drawCircle(position1X, position1Y, circleRadius);
  graphics.drawCircle(position2X, position2Y, circleRadius);

  graphics.endFill();

  const data: FXData = {
    x: sprite.x,
    y: sprite.y,
    rotation: sprite.rotation,
    width: sprite.width,
    alpha: 0.8
  };

  tireMarkList.push(data);
};
