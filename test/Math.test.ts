import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Point } from 'pixi.js';
import { calculateDirectionVector } from '../src/Math/Math';

test('coincident points give a finite zero vector', () => {
  const v = calculateDirectionVector(new Point(5, 7), new Point(5, 7));
  assert.equal(v.x, 0);
  assert.equal(v.y, 0);
  assert.ok(Number.isFinite(v.x) && Number.isFinite(v.y));
});

test('distinct points give a unit vector pointing at the target', () => {
  const v = calculateDirectionVector(new Point(0, 0), new Point(3, 4));
  assert.ok(Math.abs(v.x - 0.6) < 1e-12);
  assert.ok(Math.abs(v.y - 0.8) < 1e-12);
  assert.ok(Math.abs(Math.hypot(v.x, v.y) - 1) < 1e-12);

  const left = calculateDirectionVector(new Point(10, 0), new Point(-5, 0));
  assert.equal(left.x, -1);
  assert.equal(left.y, 0);
});
