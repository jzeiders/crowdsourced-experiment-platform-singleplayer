import * as React from "react";
import { Rect } from "react-konva";

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export default class Barrier extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    let { x, y, width, height } = this.props;
    return <Rect x={x} y={y} width={width} height={height} />;
  }
}
