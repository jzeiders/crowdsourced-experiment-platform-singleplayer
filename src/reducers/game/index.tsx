import { GameStoreState, Position, DirectionKeys } from "../../types";
import { getType } from "typesafe-actions";
import { gameActions, GameAction } from "../../actions/game";
const initialState: GameStoreState = {
  player: {
    position: {
      x: 0,
      y: 0
    }
  },
  lastTick: new Date(),
  gameStarted: false
};

const updatePosition = (
  directionKeys: DirectionKeys,
  moveAmount: number,
  position: Position
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
  return newPosition;
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
            state.player.position
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
    default:
      return state;
  }
};
