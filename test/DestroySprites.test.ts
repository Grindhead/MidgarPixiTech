import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DisplayObject } from 'pixi.js';
import { destroySprites } from '../src/Entities/DestroySprites';

test('destroySprites destroys every entry and empties the caller array', () => {
  const a = new DisplayObject();
  const b = new DisplayObject();
  const list = [a, b];

  destroySprites(list);

  assert.equal(list.length, 0);
  assert.equal(a.destroyCount, 1);
  assert.equal(b.destroyCount, 1);
});

test('calling destroySprites twice does not destroy objects again', () => {
  const a = new DisplayObject();
  const list = [a];

  destroySprites(list);
  destroySprites(list);

  assert.equal(list.length, 0);
  assert.equal(a.destroyCount, 1);
});
