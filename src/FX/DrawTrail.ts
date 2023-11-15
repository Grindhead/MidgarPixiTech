import { Graphics } from 'pixi.js';
import { FXData } from './FXData';

/**
 * an array of the tire marks drawn each frame
 */
export let trailList: FXData[] = [];

/**
 * Draw a tire mark behind a sprite.
 *
 * @param graphics - The PIXI Graphics object to draw the tire mark on.
 * @param sprite - The {@link FXData} to target.
 * @param initialAlpha - the initial alpha of the trail
 * @param width - the width of the FX
 * @returns void
 */
export const drawTrail = (
  graphics: Graphics,
  sprite: FXData,
  alpha: number,
  color: number,
  width: number
): void => {
  const circleRadius = width;
  const position1X = sprite.x - Math.cos(sprite.rotation + Math.PI / 2);
  const position1Y = sprite.y - Math.sin(sprite.rotation + Math.PI / 2);

  const data: FXData = {
    x: sprite.x,
    y: sprite.y,
    rotation: sprite.rotation,
    width,
    alpha
  };

  graphics.beginFill(color, data.alpha);
  graphics.drawCircle(position1X, position1Y, circleRadius);
  trailList.push(data);
};

/**
 * Update and fade {@link Graphics} object.
 *
 * @param graphics - The PIXI Graphics object with tire marks.
 * @param tireMarkFadeSpeed - The speed at which tire marks fade.
 * @param delta - The time delta.
 * @param color - the color to draw
 * @param width - the width of the FX
 * @returns void
 */
export const updateTrailFade = (
  graphics: Graphics,
  fadeSpeed: number,
  delta: number,
  color: number,
  width: number
): void => {
  trailList = trailList.filter((mark) => {
    drawTrail(graphics, mark, mark.alpha, color, width);
    mark.alpha -= fadeSpeed * delta;
    return mark.alpha > 0;
  });
  graphics.endFill();
};
