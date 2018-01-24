import { GameStoreState, InputStoreState } from "../../types";
import { Dispatch } from "redux";
import { gameActions } from "../../actions/game";

class Engine {
  dispatch: Dispatch<any>;
  constructor(dispatch: Dispatch<any>) {
    this.dispatch = dispatch;
  }
  handleTick(
    gameState: GameStoreState,
    inputState: InputStoreState,
    timestamp: Date
  ): GameStoreState {
    this.dispatch(gameActions.movePlayer(inputState.directionKeys, 0.1));
    return { ...gameState, lastTick: timestamp };
  }
  startGame(state: GameStoreState, startTime: Date): GameStoreState {
    return { ...state, lastTick: startTime, gameStarted: true };
  }
}

export default Engine;
