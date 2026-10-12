// Minimal stand-ins for the pixi.js classes the tested modules touch.
export class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

export class DisplayObject {
  constructor() {
    this.parent = null;
    this.destroyed = false;
    this.destroyCount = 0;
  }
  destroy() {
    this.destroyed = true;
    this.destroyCount += 1;
  }
}

export class Container extends DisplayObject {
  constructor() {
    super();
    this.children = [];
  }
  addChildAt(child, index) {
    child.parent = this;
    this.children.splice(index, 0, child);
    return child;
  }
  removeChild(child) {
    this.children = this.children.filter((c) => c !== child);
    child.parent = null;
    return child;
  }
}

export class Texture {
  static from(name) {
    return { name };
  }
}

export class Sprite extends Container {
  constructor(texture) {
    super();
    this.texture = texture;
    this.x = 0;
    this.y = 0;
    this.width = 10;
    this.height = 10;
    this.angle = 0;
    this.anchor = { set() {} };
  }
  get position() {
    return new Point(this.x, this.y);
  }
}

