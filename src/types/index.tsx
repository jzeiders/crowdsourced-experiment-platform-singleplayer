export type GameStoreState = {
  player: Player | null;
  lastTick: Date;
  gameStarted: boolean;
  levelId: string;
  level: Level | null;
  ai: AI[];
};
export type Position = {
  x: number;
  y: number;
};
export type Player = {
  position: Position;
};

export enum Direction {
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
  directionKeys: DirectionKeys;
};
export type Barrier = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export type AIConfig = {
  path: Position[];
  speed: number;
};
export interface Level {
  id: string;
  start: Position;
  end: Position;
  barriers: Barrier[];
  ai: AIConfig[];
}
export type AI = {
  position: Position;
  path: Position[];
  nextPositionIndex: number;
  speed: number;
};
