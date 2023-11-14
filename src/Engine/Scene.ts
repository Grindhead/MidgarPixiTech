import { Application, Container, Sprite } from 'pixi.js';
import { SceneTransition } from './Transition';
import { createButton } from '../UI/CreateButton';

/**
 * Scene state enum, representing its lifecycle.
 */
export enum SceneState {
  LOAD,
  PROCESS,
  FINALIZE,
  DONE
}

/**
 * Base implementation of a scene. Provides lifecycle update logic.
 */
export abstract class AbstractGameScene {
  protected sceneState: SceneState | null = null;
  protected app: Application | null = null;
  protected sceneSwitcher: ((sceneName: string) => void) | null = null;
  private fadeInSceneTransition: SceneTransition | null = null;
  private fadeOutSceneTransition: SceneTransition | null = null;
  protected sceneContainer: Container | null = null;
  protected backButton?: Sprite;

  /**
   * fade in the scene
   * @param fadeInSceneTransition - a {@link SceneTransition} object that controls the fade in transition
   */
  set fadeInTransition(fadeInSceneTransition: SceneTransition) {
    this.fadeInSceneTransition = fadeInSceneTransition;
  }

  /**
   * fade out the scene
   * @param fadeOutSceneTransition - a {@link SceneTransition} object that controls the fade out transition
   */
  set fadeOutTransition(fadeOutSceneTransition: SceneTransition) {
    this.fadeOutSceneTransition = fadeOutSceneTransition;
  }

  /**
   * Basic initialization of a scene, passing in the {@link Application} and {@link sceneSwitcher}
   * @param app - the {@link Application} for the project
   * @param sceneSwitcher - controls switching between scenes
   * @param sceneContainer - the {@link Container} the scene uses
   * @returns void
   */
  public init(
    app: Application,
    sceneSwitcher: (sceneName: string) => void,
    sceneContainer: Container
  ): void {
    this.app = app;
    this.sceneSwitcher = sceneSwitcher;
    this.sceneContainer = sceneContainer;
  }

  /**
   * Update the current screen if the canvas size changes
   */
  abstract updateDisplay(): void;

  /**
   * Create and return a back button
   * @param sceneName - the name of the scene to return to
   * @returns void
   */
  public createBackButton = (sceneName: string): void => {
    const button: Sprite = createButton('back');
    button.x = 100;
    button.y = 60;

    button.addListener('pointerup', () => {
      this.sceneSwitcher!(sceneName);
    });

    this.sceneContainer?.addChild(button);
  };

  /**
   * Core scene update loop.
   * @param delta - the timeDelta applied each frame
   * @returns void
   */
  abstract sceneUpdate(delta: number): void;

  /**
   * Core scene tear down.
   @returns void
   */
  public close(): void {
    this.backButton?.destroy();
    this.backButton = undefined;
  }

  /**
   * Scene lifecycle update loop.
   * @param delta - the timeDelta applied each frame
   * @returns void
   */
  update = (delta: number): void => {
    switch (this.sceneState) {
      case SceneState.LOAD:
        this.fadeInSceneTransition?.update(delta, () => {
          this.sceneState = SceneState.PROCESS;
        });
        break;
      case SceneState.PROCESS:
        break;
      case SceneState.FINALIZE:
        this.fadeOutSceneTransition?.update(delta, () => {
          this.sceneState = SceneState.DONE;
        });
        break;
    }

    this.sceneUpdate(delta);
  };

  /**
   * Sets the sceneState to SceneState.FINALIZE once setup is complete.
   * @returns void
   */
  setFinalizing = (): void => {
    this.sceneState = SceneState.FINALIZE;
  };

  /**
   * adds a button to the screen
   * @param name - the name of the button
   * @param x - the x position of the button
   * @param y - the y position of the button
   * @returns Sprite
   */
  addButton = (name: string, x: number, y: number): Sprite => {
    const button = createButton(name);
    button.addListener('pointerup', () => {
      if (this.sceneSwitcher) {
        this.sceneSwitcher(name);
      } else {
        throw new Error('SceneSwitcher is missing in button : ' + name);
      }
    });
    button.x = x;
    button.y = y;
    this.sceneContainer?.addChild(button);
    return button;
  };
}
