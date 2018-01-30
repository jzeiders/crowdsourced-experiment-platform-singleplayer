import {
  GameStoreState,
  Position,
  DirectionKeys,
  Level,
  AI,
  Barrier
} from "../../types";
import { getType } from "typesafe-actions";
import { gameActions, GameAction } from "../../actions/game";
import config from "../../config";

const {
  playerRadius: PLAYER_RADIUS,
  gameWidth: GAME_WIDTH,
  gameHeight: GAME_HEIGHT
} = config;

const initialState: GameStoreState = {
  levelId: "",
  player: {
    position: {
      x: 500,
      y: 100
    }
  },
  lastTick: new Date(),
  gameStarted: false,
  level: null,
  ai: []
};

const playerCollidesWithBarrier = (
  barrier: Barrier,
  position: Position
): boolean => {
  let distX = Math.abs(position.x - barrier.x - barrier.width / 2);
  let distY = Math.abs(position.y - barrier.y - barrier.height / 2);

  if (distX > barrier.width / 2 + PLAYER_RADIUS) {
    return false;
  }
  if (distY > barrier.height / 2 + PLAYER_RADIUS) {
    return false;
  }

  if (distX <= barrier.width / 2) {
    return true;
  }
  if (distY <= barrier.height / 2) {
    return true;
  }

  let dx = distX - barrier.width / 2;
  let dy = distY - barrier.height / 2;
  return dx * dx + dy * dy <= PLAYER_RADIUS * PLAYER_RADIUS;
};
const collisionDetection = (position: Position, barriers: Barrier[]) => {
  // Wall Check
  if (position.y < PLAYER_RADIUS) {
    return true;
  }
  if (position.y > GAME_HEIGHT - PLAYER_RADIUS) {
    return true;
  }
  if (position.x < PLAYER_RADIUS) {
    return true;
  }
  if (position.x > GAME_WIDTH - PLAYER_RADIUS) {
    return true;
  }
  if (barriers) {
    if (
      barriers
        .map(barrier => playerCollidesWithBarrier(barrier, position))
        .some(val => val)
    ) {
      return true;
    }
  }
  return false;
};

const updatePosition = (
  directionKeys: DirectionKeys,
  moveAmount: number,
  position: Position,
  level: Level
) => {
  let newPosition = Object.assign({}, position);
  if (directionKeys.UP) {
    newPosition.y -= moveAmount;
  }
  if (directionKeys.DOWN) {
    newPosition.y += moveAmount;
  }
  if (directionKeys.LEFT) {
    newPosition.x -= moveAmount;
  }
  if (directionKeys.RIGHT) {
    newPosition.x += moveAmount;
  }
  if (level && collisionDetection(newPosition, level.barriers)) {
    return position;
  }
  return newPosition;
};

const calculateAIMove = (ai: AI): AI => {
  const MOVE_AMOUNT = ai.speed;
  const nextPosition = Object.assign({}, ai.path[ai.nextPositionIndex]);
  let newPosition = ai.position;
  if (ai.position.x < nextPosition.x) {
    newPosition.x = Math.min(ai.position.x + MOVE_AMOUNT, nextPosition.x);
  }
  if (ai.position.y < nextPosition.y) {
    newPosition.y = Math.min(ai.position.y + MOVE_AMOUNT, nextPosition.y);
  }
  if (ai.position.x > nextPosition.x) {
    newPosition.x = Math.max(ai.position.x - MOVE_AMOUNT, nextPosition.x);
  }
  if (ai.position.y > nextPosition.y) {
    newPosition.y = Math.max(ai.position.y - MOVE_AMOUNT, nextPosition.y);
  }

  ai.position = newPosition;
  if (newPosition.x === nextPosition.x && newPosition.y === nextPosition.y) {
    ai.nextPositionIndex = (ai.nextPositionIndex + 1) % ai.path.length;
  }
  return ai;
};

export const GameReducer = (
  state = initialState,
  action: GameAction
): GameStoreState => {
  switch (action.type) {
    case getType(gameActions.movePlayer):
      return {
        ...state,
        player: {
          ...state.player,
          position: updatePosition(
            action.payload.directionKeys,
            action.payload.moveAmount,
            state.player!.position,
            state.level!
          )
        }
      };
    case getType(gameActions.handleTick):
      return {
        ...state,
        lastTick: action.payload.timestamp
      };
    case getType(gameActions.startGame):
      return {
        ...state,
        lastTick: action.payload,
        gameStarted: true
      };
    case getType(gameActions.loadLevel):
      let ai = action.payload.ai.map(aiConfig => ({
        position: Object.assign({}, aiConfig.path[0]),
        path: aiConfig.path,
        nextPositionIndex: 0,
        speed: aiConfig.speed
      }));
      return {
        ...state,
        level: action.payload,
        ai
      };
    case getType(gameActions.moveAI):
      let OldAI = state.ai;
      OldAI[action.payload.aiId] = calculateAIMove(OldAI[action.payload.aiId]);
      return {
        ...state
      };
    default:
      return state;
  }
};
