import assert from 'node:assert/strict';
import test from 'node:test';
import {createRequire} from 'node:module';
import {Point, Texture, Container} from 'pixi.js';
import * as esm from '../dist/index.js';
const require=createRequire(import.meta.url);
const cjs=require('../dist/index.cjs');

test('ESM and CJS expose the corrected video format helper',()=>{
  assert.equal(typeof esm.getSupportedVideoFormat,'function');
  assert.equal(typeof cjs.getSupportedVideoFormat,'function');
});
test('directions remain finite at coincident points and unit length elsewhere',()=>{
  const zero=esm.calculateDirectionVector(new Point(2,3),new Point(2,3));
  assert.equal(zero.x,0);assert.equal(zero.y,0);
  const vector=esm.calculateDirectionVector(new Point(0,0),new Point(3,4));
  assert.equal(vector.x,0.6);assert.equal(vector.y,0.8);
  assert.equal(Math.hypot(vector.x,vector.y),1);
});
test('cleanup empties the caller array and is safe twice',()=>{
  let destroyed=0;const arr=[{destroy(){destroyed++;}},{destroy(){destroyed++;}}];
  esm.destroySprites(arr);assert.equal(arr.length,0);esm.destroySprites(arr);assert.equal(destroyed,2);
});
test('bullets apply configured damage once, including zero, to the first target',()=>{
  Texture.addToCache(Texture.EMPTY,'regression-bullet');
  for(const damage of [0,10,50]) {
    const scene=new Container();
    const targets=[new esm.GameSprite(Texture.EMPTY),new esm.GameSprite(Texture.EMPTY)];
    for(const target of targets){target.x=50;target.y=50;target.width=10;target.height=10;target.life=100;scene.addChild(target);}
    const bullet=esm.createBullet('regression-bullet',50,50,0,scene,false,damage);
    bullet.width=10;bullet.height=10;bullet.velocity.set(0,0);
    const result=esm.updateBullets(0,targets,100,100);
    assert.equal(result[0].life,100-damage);assert.equal(result[1].life,100);
    assert.equal(bullet.destroyed,true);assert.equal(scene.children.length,2);
    esm.updateBullets(0,result,100,100);assert.equal(result[0].life,100-damage);
    scene.destroy({children:true});
  }
  Texture.removeFromCache('regression-bullet');
});
test('expired bullets cannot damage targets',()=>{
  Texture.addToCache(Texture.EMPTY,'expired-bullet');const scene=new Container();
  const target=new esm.GameSprite(Texture.EMPTY);target.x=50;target.y=50;target.width=10;target.height=10;target.life=100;scene.addChild(target);
  const bullet=esm.createBullet('expired-bullet',50,50,0,scene,false,50);bullet.width=10;bullet.height=10;bullet.velocity.set(0,0);bullet.life=0;
  esm.updateBullets(0,[target],100,100);assert.equal(target.life,100);assert.equal(bullet.destroyed,true);
  scene.destroy({children:true});Texture.removeFromCache('expired-bullet');
});
