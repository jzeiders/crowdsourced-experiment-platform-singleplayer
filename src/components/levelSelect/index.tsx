import * as React from "react";
import { Level } from "../../types";
import styled from "styled-components";

type Props = {
  levels: Level[];
  loadLevel: (level: Level) => any;
};
const LevelSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 100px;
`;
const LevelRow = styled.div`
  height: 25px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default class LevelSelect extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    let { levels, loadLevel } = this.props;
    return (
      <LevelSelectContainer>
        {levels.map((level, i) => (
          <LevelRow onClick={() => loadLevel(level)} key={i}>
            {level.id}
          </LevelRow>
        ))}
      </LevelSelectContainer>
    );
  }
}
