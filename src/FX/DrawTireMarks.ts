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
 * @returns void
 */
export const drawTireMark = (
  graphics: Graphics,
  sprite: FXData,
  initialAlpha: number
): void => {
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

  const data: FXData = {
    x: sprite.x,
    y: sprite.y,
    rotation: sprite.rotation,
    width: sprite.width,
    alpha: initialAlpha
  };

  graphics.beginFill(tireMarkColor, data.alpha);
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
 * @returns void
 */
export const updateTireFade = (
  graphics: Graphics,
  fadeSpeed: number,
  delta: number,
  initialAlpha: number,
  color: number
): void => {
  graphics.beginFill(color, initialAlpha);
  tireMarkList = tireMarkList.filter((mark) => {
    drawTireMark(graphics, mark, initialAlpha);
    mark.alpha -= fadeSpeed * delta;
    return mark.alpha > 0;
  });
  graphics.endFill();
};
