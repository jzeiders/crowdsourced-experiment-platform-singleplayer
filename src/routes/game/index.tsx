import * as React from "react";
import Header from "../../components/header";
import Game from "../../containers/game";
export default class GameRoute extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Game />
      </div>
    );
  }
}
