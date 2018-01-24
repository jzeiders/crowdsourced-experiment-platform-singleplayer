import * as React from "react";
import { Stage, Layer, Circle } from "react-konva";
import { Position } from "../../types/index";

type Props = {
  position: Position;
};

export default class TopView extends React.Component<Props, {}> {
  render() {
    let { position } = this.props;
    return (
      <Stage width={600} height={600}>
        <Layer>
          <Circle radius={10} x={position.x} y={position.y} fill={"Blue"} />
        </Layer>
      </Stage>
    );
  }
}
