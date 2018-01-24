export type GameStoreState = {
  player: {
    position: Position;
  };
  lastTick: Date;
  gameStarted: boolean;
};
export type Position = {
  x: number;
  y: number;
};

export const enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT"
}
export type DirectionKeys = { [Dir in Direction]: boolean };

export type RootState = {
  Game: GameStoreState;
  Input: InputStoreState;
};
export type InputStoreState = {
  directionKeys: {};
};
