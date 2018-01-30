import * as React from "react";
import { Circle } from "react-konva";
import { Position } from "../../types";

type Props = {
  position: Position;
};

export default class AIPlayer extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    let { x, y } = this.props.position;
    return <Circle x={x} y={y} radius={10} fill="red" />;
  }
}
