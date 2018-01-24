import { DirectionKeys } from "../../types";
import { createAction } from "typesafe-actions";
import { $call } from "utility-types";

export const gameActions = {
  movePlayer: createAction(
    "MOVE_PLAYER",
    (directionKeys: DirectionKeys, moveAmount: number) => ({
      type: "MOVE_PLAYER",
      payload: { directionKeys, moveAmount }
    })
  ),
  handleTick: createAction("HANDLE_TICK", (timestamp: Date) => ({
    type: "HANDLE_TICK",
    payload: {
      timestamp
    }
  })),
  startGame: createAction("START_GAME", () => ({
    type: "START_GAME",
    payload: new Date()
  }))
};

const returnsOfActions = Object.values(gameActions);
const types = returnsOfActions.map($call);

export type GameAction = typeof types[number];
