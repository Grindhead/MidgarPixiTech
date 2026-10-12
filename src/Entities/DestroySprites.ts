import { DisplayObject } from 'pixi.js';

/**
 * destroy all displayObjects in a given array, then empty that same array in place
 * so the caller is left holding no references to destroyed objects. Calling it again
 * on the emptied array is a no-op.
 * @param arr - the array of {@link DisplayObject} to destroy; it is emptied by this call
 * @returns void
 */
export const destroySprites = (arr: DisplayObject[]): void => {
  arr.forEach((dO: DisplayObject) => {
    // destroy display object
    dO.destroy();
  });

  arr.length = 0;
};
