import { Sprite } from 'pixi.js';
import { checkCircularCollisionWithRectangle, clamp } from '../Math/Math';
import { GameSprite } from '../Entities/GameSprite';

/**
 * enums for the rotation direction
 */
enum ROTATION_DIRECTION {
  LEFT,
  RIGHT
}

/**
 * the max movement speed
 */
const MAX_SPEED: number = 34;

/**
 * the max rotation speed
 */
const MAX_ROTATION_SPEED: number = 10;

/**
 * the rate at which the {@link MovingSprite} accelerates
 */
const ACCELERATION: number = 0.2;

/**
 * the rate at which acceleration increases
 */
const ROTATION_ACCELERATION: number = 0.02;

/**
 * the lateral friction applied each frame
 */
const LATERAL_FRICTION: number = 0.95;
/**
 * The drag applied to the sprite each frame.
 */
const ROTATION_DRAG: number = 0.95; // Adjust rotation drag

/**
 * drag applied to the sprite each frame
 */
const DRAG: number = 0.98;

/**
 * a list of {@link GameSprite} to be controlled
 */
let spriteList: GameSprite[] = [];

/**
 * the speed that the sprites are currently rotating
 */
let rotationSpeed: number = 0;

/**
 * boolean to determine if the left key is down. Also true for A.
 */
let leftKeyIsDown: boolean = false;

/**
 * boolean to determine if the right key is down. Also true for D.
 */
let rightKeyIsDown: boolean = false;

/**
 * boolean to determine if the up key is down. Also true for W.
 */
let upKeyIsDown: boolean = false;

/**
 * boolean to determine if the down key is down. Also true for S.
 */
let downKeyIsDown: boolean = false;

/**
 * adds event listeners for keyboard input to move an array of {@link GameSprite}
 * @returns void
 */
export const addControlSpriteKeyboardListeners = (): void => {
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
};

/**
 * removes all event listeners
 * @returns void
 */
const removeControlSpriteKeyboardListeners = (): void => {
  document.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('keyup', handleKeyUp);
};

/**
 * a callback function for keydown events
 * @param e - the {@link KeyboardEvent}
 * @returns void
 */
const handleKeyDown = (e: KeyboardEvent): void => {
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    leftKeyIsDown = true;
  } else if (e.key === 'ArrowRight' || e.key === 'd') {
    rightKeyIsDown = true;
  } else if (e.key === 'ArrowUp' || e.key === 'w') {
    upKeyIsDown = true;
  } else if (e.key === 'ArrowDown' || e.key === 's') {
    downKeyIsDown = true;
  }
};

/**
 * a callback function for keyup events
 * @param e - the {@link KeyboardEvent}
 * @returns void
 */
const handleKeyUp = (e: KeyboardEvent): void => {
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    leftKeyIsDown = false;
  } else if (e.key === 'ArrowRight' || e.key === 'd') {
    rightKeyIsDown = false;
  } else if (e.key === 'ArrowUp' || e.key === 'w') {
    upKeyIsDown = false;
  } else if (e.key === 'ArrowDown' || e.key === 's') {
    downKeyIsDown = false;
  }
};

/**
 * control a sprite with a keyboard
 * @param sprite - the {@link GameSprite} to add control using a keyboard
 */
export const addControlSpriteWithKeyboard = (sprite: GameSprite): void => {
  spriteList.push(sprite);
};

/**
 * stop controlling all sprites with the keyboard
 * @returns void
 */
export const stopControllingAllSpritesWithKeyboard = (): void => {
  spriteList = [];
  removeControlSpriteKeyboardListeners();
};

/**
 * update each {@link GameSprite} each frame with a time delta
 * @param delta - the current time delta
 * @param wallList - a list of wallls to collide with
 * @param gameWidth - the width of the game area
 * @param gameHeight - the height of the game area
 * @returns void
 */
export const updateKeyboardMovement = (
  delta: number,
  wallList: Sprite[],
  gameWidth: number,
  gameHeight: number
) => {
  spriteList.forEach((sprite) => {
    if (leftKeyIsDown) {
      updateRotationSpeed(ROTATION_DIRECTION.LEFT, delta, sprite);
    } else if (rightKeyIsDown) {
      updateRotationSpeed(ROTATION_DIRECTION.RIGHT, delta, sprite);
    }

    let accelerationX: number;
    let accelerationY: number;

    if (upKeyIsDown) {
      accelerationX = ACCELERATION * Math.cos(sprite.rotation);
      accelerationY = ACCELERATION * Math.sin(sprite.rotation);

      sprite.velocity.x += accelerationX;
      sprite.velocity.y += accelerationY;
    } else if (downKeyIsDown) {
      accelerationX = ACCELERATION * Math.cos(sprite.rotation);
      accelerationY = ACCELERATION * Math.sin(sprite.rotation);

      sprite.velocity.x -= accelerationX;
      sprite.velocity.y -= accelerationY;
    }

    applyLateralFriction(sprite);
    handleWallCollisions(sprite, wallList);

    applyDrag(sprite);
    rotationSpeed *= ROTATION_DRAG;
    sprite.rotation += rotationSpeed;
    sprite.velocity.x = clamp(sprite.velocity.x, -MAX_SPEED, MAX_SPEED);
    sprite.velocity.y = clamp(sprite.velocity.y, -MAX_SPEED, MAX_SPEED);
    sprite.x += sprite.velocity.x;
    sprite.y += sprite.velocity.y;

    sprite.x = clamp(sprite.x, sprite.width / 2, gameWidth);
    sprite.y = clamp(sprite.y, sprite.height / 2, gameHeight);
  });
};

/**
 *
 * @param movingSprite - the {@link GameSprite} to check for collisions against walls
 * @param walls - an array of {@link Sprite} to check against for collisions
 * @returns void
 */
const handleWallCollisions = (movingSprite: GameSprite, walls: Sprite[]) => {
  walls.forEach((wall) => {
    if (checkCircularCollisionWithRectangle(movingSprite, wall)) {
      const collisionAngle = Math.atan2(
        wall.y - movingSprite.y,
        wall.x - movingSprite.x
      );

      const oppositeForceX = Math.cos(collisionAngle) * ACCELERATION * 2;
      const oppositeForceY = Math.sin(collisionAngle) * ACCELERATION * 2;

      movingSprite.velocity.x -= oppositeForceX;
      movingSprite.velocity.y -= oppositeForceY;

      const rotationForce = Math.sign(rotationSpeed) * 0.02;
      movingSprite.rotation += rotationForce;
    }
  });
};

/**
 * applies drag to a sprite
 * @param sprite - the sprite to apply drag too
 * @returns void
 */
const applyDrag = (sprite: GameSprite): void => {
  sprite.velocity.x *= DRAG;
  sprite.velocity.y *= DRAG;
};

/**
 * applies lateral friction to a sprite
 * @param sprite - the sprite to apply lateral friction too
 * @returns void
 */
const applyLateralFriction = (sprite: GameSprite): void => {
  sprite.velocity.x *= LATERAL_FRICTION;
  sprite.velocity.y *= LATERAL_FRICTION;
};

/**
 * update the rotation speed of a sprite each frame
 * @param direction - the direction to rotate the sprite. Either {@link ROTATION_DIRECTION.LEFT} or {@link ROTATION_DIRECTION.RIGHT}
 * @param delta - the current time delta
 * @param sprite - the sprite to rotate
 * @returns void
 */
const updateRotationSpeed = (
  direction: number,
  delta: number,
  sprite: GameSprite
): void => {
  if (direction === ROTATION_DIRECTION.LEFT) {
    rotationSpeed -= ROTATION_ACCELERATION * delta;
  } else if (direction === ROTATION_DIRECTION.RIGHT) {
    rotationSpeed += ROTATION_ACCELERATION * delta;
  }

  // Modify rotation speed based on sprite's speed
  const speed = Math.sqrt(
    sprite.velocity.x * sprite.velocity.x +
      sprite.velocity.y * sprite.velocity.y
  );
  const speedFactor = (speed / MAX_SPEED) * 10;
  rotationSpeed *= speedFactor;
  rotationSpeed = clamp(rotationSpeed, -MAX_ROTATION_SPEED, MAX_ROTATION_SPEED);
};
