import { Graphics, Sprite } from 'pixi.js';
import { drawTrail } from './DrawTrail';

/**
 * Update and fade {@link Graphics} object.
 *
 * @param graphics - The PIXI Graphics object with tire marks.
 * @param tireMarkFadeSpeed - The speed at which tire marks fade.
 * @param delta - The time delta.
 * @returns []
 */
export const updateFade = (
  graphics: Graphics,
  fadeSpeed: number,
  delta: number,
  arr: Sprite[]
): Sprite[] => {
  graphics.clear();
  graphics.lineStyle(1);

  arr = arr.filter((trail: Sprite) => {
    drawTrail(graphics, trail as Sprite);
    trail.alpha -= fadeSpeed * delta;
    return trail.alpha > 0;
  });

  return arr;
};
