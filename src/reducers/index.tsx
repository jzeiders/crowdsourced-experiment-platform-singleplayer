import { combineReducers } from "redux";
import { GameReducer as Game } from "./game";
import { InputReducer as Input } from "./input";

export default combineReducers({ Game, Input });
