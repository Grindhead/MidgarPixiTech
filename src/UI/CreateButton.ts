import { Graphics, Sprite, Text, TextStyle } from 'pixi.js';

/**
 * creates a new button
 * @param text - the text to show
 * @returns a {@link Sprite}
 */
export const createButton = (text: string): Sprite => {
  const button: Sprite = new Sprite();
  const buttonBackground = createButtonBackground(150, 50, 50, 0xfff, 1);
  button.addChild(buttonBackground);

  const style: TextStyle = new TextStyle({
    fill: '0xff0000',
    fontFamily: 'Lacquer',
    fontSize: '2em'
  });

  const textfield: Text = new Text(text, style);
  textfield.x = -textfield.width / 2;
  textfield.y = -textfield.height / 2;
  button.addChild(textfield);
  button.eventMode = 'dynamic';
  button.cursor = 'pointer';
  return button;
};

/**
 *
 * Creates and returns a sprite
 *
 * @param width - the width
 * @param height - the height
 * @param radius - the radius
 * @param color - the color
 * @param alpha - the alpha
 * @returns a {@link Graphics}
 */
const createButtonBackground = (
  width: number,
  height: number,
  radius: number,
  color: number,
  alpha: number
): Graphics => {
  const background: Graphics = new Graphics();
  background.beginFill(color, alpha);
  background.drawRoundedRect(-width / 2, -height / 2, width, height, radius);
  background.endFill();
  background.cacheAsBitmap = true;
  return background;
};
