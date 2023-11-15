import { Graphics } from 'pixi.js';
import { FXData } from './FXData';

/**
 * an array of the tire marks drawn each frame
 */
export let tireMarkList: FXData[] = [];

/**
 * Draw a tire mark behind a sprite.
 *
 * @param graphics - The PIXI Graphics object to draw the tire mark on.
 * @param sprite - The Sprite to target.
 * @param initialAlpha - the initial alpha of the FX
 * @param color - the color to draw
 * @returns void
 */
export const drawTireMark = (
  graphics: Graphics,
  sprite: FXData,
  initialAlpha: number,
  color: number
): void => {
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

  const data: FXData = {
    x: sprite.x,
    y: sprite.y,
    rotation: sprite.rotation,
    width: sprite.width,
    alpha: initialAlpha
  };

  graphics.beginFill(color, data.alpha);
  graphics.drawCircle(position1X, position1Y, circleRadius);
  graphics.drawCircle(position2X, position2Y, circleRadius);

  tireMarkList.push(data);
};

/**
 * Update and fade {@link Graphics} object.
 *
 * @param graphics - The PIXI Graphics object with tire marks.
 * @param tireMarkFadeSpeed - The speed at which tire marks fade.
 * @param delta - The time delta.
 * @param color - the color to draw
 * @returns void
 */
export const updateTireFade = (
  graphics: Graphics,
  fadeSpeed: number,
  delta: number,
  color: number
): void => {
  tireMarkList = tireMarkList.filter((mark) => {
    drawTireMark(graphics, mark, mark.alpha, color);
    mark.alpha -= fadeSpeed * delta;
    return mark.alpha > 0;
  });
  graphics.endFill();
};
