import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { Container } from 'pixi.js';
import {
  bulletList,
  createBullet,
  updateBullets
} from '../src/Entities/BulletController';
import { GameSprite } from '../src/Entities/GameSprite';

const GAME_W = 1000;
const GAME_H = 1000;

const makeTarget = (scene: Container, x: number, y: number, life = 100) => {
  const target = new GameSprite();
  target.x = x;
  target.y = y;
  target.width = 40;
  target.height = 40;
  target.life = life;
  scene.addChildAt(target, 0);
  return target;
};

// Each test lets the reload cooldown expire and clears leftover bullets.
beforeEach(() => {
  updateBullets(1000, [], GAME_W, GAME_H);
  assert.equal(bulletList.length, 0);
});

for (const damage of [10, 50]) {
  test(`a bullet with damage ${damage} removes ${damage} life`, () => {
    const scene = new Container();
    const target = makeTarget(scene, 100, 100);
    // Fire right (angle 0) from just left of the target so the first step overlaps it.
    const bullet = createBullet('b', 95, 110, 0, scene, false, damage);
    assert.ok(bullet);

    updateBullets(1, [target], GAME_W, GAME_H);

    assert.equal(target.life, 100 - damage);
  });
}

test('a zero-damage bullet does no damage', () => {
  const scene = new Container();
  const target = makeTarget(scene, 100, 100);
  createBullet('b', 95, 110, 0, scene, false, 0);

  updateBullets(1, [target], GAME_W, GAME_H);

  assert.equal(target.life, 100);
});

test('a bullet overlapping several targets hits only the first, and is destroyed once', () => {
  const scene = new Container();
  const first = makeTarget(scene, 100, 100);
  const second = makeTarget(scene, 100, 100);
  const bullet = createBullet('b', 95, 110, 0, scene, false, 30);
  assert.ok(bullet);

  updateBullets(1, [first, second], GAME_W, GAME_H);
  // A later frame must not touch the spent bullet again.
  updateBullets(1, [first, second], GAME_W, GAME_H);

  assert.equal(first.life, 70);
  assert.equal(second.life, 100);
  assert.equal((bullet as unknown as { destroyCount: number }).destroyCount, 1);
  assert.equal(bulletList.length, 0);
});

test('a bullet that leaves the screen is destroyed once', () => {
  const scene = new Container();
  const bullet = createBullet('b', GAME_W - 1, 10, 0, scene, false, 10);
  assert.ok(bullet);

  updateBullets(1, [], GAME_W, GAME_H);
  updateBullets(1, [], GAME_W, GAME_H);

  assert.equal((bullet as unknown as { destroyCount: number }).destroyCount, 1);
});
