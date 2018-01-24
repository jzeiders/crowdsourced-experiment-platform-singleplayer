import { Direction } from "../../types";
import { createAction } from "typesafe-actions";
import { $call } from "utility-types";

export const inputActions = {
  setDirectionKey: createAction(
    "SET_DIRECTION",
    (direction: Direction, type: boolean) => ({
      type: "SET_DIRECTION",
      payload: {
        direction,
        type
      }
    })
  )
};

const rValues = Object.values(inputActions);
const types = rValues.map($call);

export type InputAction = typeof types[number];
