import { InputStoreState, Direction } from "../../types";
import { inputActions, InputAction } from "../../actions/input";
import { getType } from "typesafe-actions";
const initialState: InputStoreState = {
  directionKeys: {
    [Direction.UP]: false,
    [Direction.DOWN]: false,
    [Direction.LEFT]: false,
    [Direction.RIGHT]: false
  }
};

export const InputReducer = (state = initialState, action: InputAction) => {
  switch (action.type) {
    case getType(inputActions.setDirectionKey):
      let newState = Object.assign({}, state);
      newState.directionKeys[action.payload.direction] = action.payload.type;
      return newState;
    default:
      return state;
  }
};
