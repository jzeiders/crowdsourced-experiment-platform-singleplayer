import * as React from "react";
import Header from "../../components/header";
import Game from "../../containers/game";
import LevelSelect from "../../containers/levelSelect";

export default class GameRoute extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Game />
        <LevelSelect />
      </div>
    );
  }
}
