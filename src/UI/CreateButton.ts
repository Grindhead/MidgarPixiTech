import { Graphics, Sprite, Text, TextStyle } from 'pixi.js';

/**
 * creates a new button
 * @param text - the text to show
 * @returns a {@link Sprite}
 */
export const createButton = (text: string): Sprite => {
  const width = 150;
  const height = 50;
  const button: Sprite = new Sprite();
  const buttonBackground: Graphics = new Graphics();

  buttonBackground.beginFill(0xfff, 1);
  buttonBackground.drawRoundedRect(-width / 2, -height / 2, width, height, 50);
  buttonBackground.endFill();
  buttonBackground.cacheAsBitmap = true;

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
