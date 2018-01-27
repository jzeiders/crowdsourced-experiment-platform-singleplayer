import * as React from "react";
import TopView from "../../components/topview";
import {
  RootState,
  GameStoreState,
  InputStoreState,
  Direction,
  DirectionKeys
} from "../../types/index";
import { Dispatch, connect } from "react-redux";
import { GameAction, gameActions } from "../../actions/game";
import { InputAction, inputActions } from "../../actions/input";
import { bindActionCreators, Store } from "redux";
import * as PropTypes from "prop-types";

type Props = {
  game: GameStoreState;
  input: InputStoreState;
  setDirectionKey: (direction: Direction, type: boolean) => any;
  startGame: () => any;
  handleTick: (timestamp: Date) => any;
  movePlayer: (directionKeys: DirectionKeys, moveAmount: number) => any;
};
type Context = {
  store: Store<RootState>;
};

class GameContainer extends React.Component<Props, {}> {
  static contextTypes = {
    store: PropTypes.object
  };
  context: Context;

  animateInteveral = null;
  constructor(props: Props, context: Context) {
    super(props, context);
    this.startGame.bind(this);
    this.startGame();
  }
  componentDidMount() {
    window.addEventListener("keydown", e => {
      e.preventDefault();
      this.handleKeys(e, true);
    });
    window.addEventListener("keyup", e => {
      e.preventDefault();
      this.handleKeys(e, false);
    });
  }
  handleKeys(event: any, type: boolean) {
    switch (event.keyCode) {
      case 37:
        this.props.setDirectionKey(Direction.LEFT, type);
        break;
      case 38:
        this.props.setDirectionKey(Direction.UP, type);
        break;
      case 39:
        this.props.setDirectionKey(Direction.RIGHT, type);
        break;
      case 40:
        this.props.setDirectionKey(Direction.DOWN, type);
        break;
      default:
        return;
    }
  }
  handleCycle() {
    let { handleTick, movePlayer, input } = this.props;
    handleTick(new Date());
    movePlayer(input.directionKeys, 1);
  }
  startGame() {
    const { store } = this.context;
    let { game, startGame } = this.props;
    let ticker = () => {
      if (store.getState().Game.gameStarted) {
        this.handleCycle();
        window.requestAnimationFrame(ticker);
      }
    };
    if (!game.gameStarted) {
      startGame();
      ticker();
    }
  }
  render() {
    let { position } = this.props.game.player;
    return <TopView position={position} />;
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    game: state.Game,
    input: state.Input
  };
};
const mapDispatchToProps = (dispatch: Dispatch<GameAction | InputAction>) =>
  bindActionCreators(
    {
      setDirectionKey: inputActions.setDirectionKey,
      startGame: gameActions.startGame,
      handleTick: gameActions.handleTick,
      movePlayer: gameActions.movePlayer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
