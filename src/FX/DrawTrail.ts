import { Graphics, Sprite } from 'pixi.js';

type Trail = {
  x: number;
  y: number;
  rotation: number;
  width: number;
  alpha: number;
};

/**
 * an array of the tire marks drawn each frame
 */
let trailList: Trail[] = [];

/**
 * Draw a tire mark behind a sprite.
 *
 * @param graphics - The PIXI Graphics object to draw the tire mark on.
 * @param sprite - The Sprite to target.
 * @returns void
 */
export const drawTrail = (graphics: Graphics, sprite: Sprite): void => {
  const tireMarkColor = 0x473131;
  const circleRadius = sprite.width * 0.05;

  const position1X = sprite.x - Math.cos(sprite.rotation + Math.PI / 2);
  const position1Y = sprite.y - Math.sin(sprite.rotation + Math.PI / 2);

  graphics.lineStyle(0); // No outline
  graphics.beginFill(tireMarkColor, sprite.alpha);

  // Draw circles at the specified positions
  graphics.drawCircle(position1X, position1Y, circleRadius);

  graphics.endFill();

  const data: Trail = {
    x: sprite.x,
    y: sprite.y,
    rotation: sprite.rotation,
    width: sprite.width,
    alpha: 0.8
  };

  trailList.push(data);
};

/**
 * Update and fade {@link Graphics} object.
 *
 * @param graphics - The PIXI Graphics object with tire marks.
 * @param tireMarkFadeSpeed - The speed at which tire marks fade.
 * @param delta - The time delta.
 * @returns void
 */
export const updateFade = (
  graphics: Graphics,
  fadeSpeed: number,
  delta: number
): void => {
  graphics.clear();
  graphics.lineStyle(1);

  trailList = trailList.filter((trail) => {
    drawTrail(graphics, trail as Sprite);
    trail.alpha -= fadeSpeed * delta;
    return trail.alpha > 0;
  });
};
