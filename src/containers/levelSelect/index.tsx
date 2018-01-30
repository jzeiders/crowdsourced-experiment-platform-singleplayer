import * as React from "react";
import Levels from "../../assets/levels";
import LevelSelect from "../../components/levelSelect";
import { RootState, GameStoreState, Level } from "../../types/index";
import { Dispatch } from "redux";
import { GameAction, gameActions } from "../../actions/game/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
type Props = {
  game: GameStoreState;
  loadLevel: (level: Level) => any;
};

class LevelSelectContainer extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <div>
        <LevelSelect loadLevel={this.props.loadLevel} levels={Levels} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    game: state.Game
  };
};

const mapDispatchToProps = (dispatch: Dispatch<GameAction>) =>
  bindActionCreators({ loadLevel: gameActions.loadLevel }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  LevelSelectContainer
);
