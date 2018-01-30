import * as React from "react";
import { Stage, Layer, Circle, Rect, Group, Line } from "react-konva";
import { Position, Barrier, AI } from "../../types/index";
import styled from "styled-components";
import config from "../../config";
import AIPlayer from "../aiplayer";
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const {
  gameHeight: GAME_HEIGHT,
  gameWidth: GAME_WIDTH,
  squareSize: SQUARE_SIZE,
  playerRadius: PLAYER_RADIUS
} = config;

const TopViewContainer = styled.div`
  border: 1px solid black;
  width: ${CANVAS_WIDTH}px;
  height: ${CANVAS_HEIGHT}px;
`;

type Props = {
  position: Position;
  barriers: Barrier[] | null;
  ai: AI[];
};
const Walls = ({ position }: { position: Position }) => {
  return (
    <Group>
      {// Left wall
      position.x - CANVAS_WIDTH / 2 < 0 && (
        <Rect
          x={0}
          y={0}
          fill="black"
          height={CANVAS_HEIGHT}
          width={CANVAS_WIDTH / 2 - position.x}
        />
      )}
      {// Right wall
      position.x + CANVAS_WIDTH / 2 > GAME_WIDTH && (
        <Rect
          x={GAME_WIDTH - position.x + CANVAS_WIDTH / 2}
          y={0}
          fill="black"
          height={CANVAS_HEIGHT}
          width={CANVAS_WIDTH / 2 - GAME_WIDTH + position.x}
        />
      )}
      {// Top wall
      position.y - CANVAS_HEIGHT / 2 < 0 && (
        <Rect
          x={0}
          y={0}
          fill="black"
          height={CANVAS_HEIGHT / 2 - position.y}
          width={CANVAS_WIDTH}
        />
      )}
      {// Bottom wall
      position.y + CANVAS_HEIGHT / 2 > GAME_HEIGHT && (
        <Rect
          x={0}
          y={GAME_HEIGHT - position.y + CANVAS_HEIGHT / 2}
          fill="black"
          height={CANVAS_HEIGHT / 2 - GAME_HEIGHT + position.y}
          width={CANVAS_WIDTH}
        />
      )}
    </Group>
  );
};

const Grid = ({ position }: { position: Position }) => {
  let XGridPositions = [];
  let YGridPositions = [];
  for (let i = 0; i < CANVAS_WIDTH + SQUARE_SIZE; i += SQUARE_SIZE) {
    XGridPositions.push(i - position.x % SQUARE_SIZE);
  }
  for (let i = 0; i < CANVAS_HEIGHT + SQUARE_SIZE; i += SQUARE_SIZE) {
    YGridPositions.push(i - position.y % SQUARE_SIZE);
  }
  return (
    <Group>
      {XGridPositions.map(x => (
        <Line stroke="black" key={x} points={[x, 0, x, CANVAS_HEIGHT]} />
      ))}
      {YGridPositions.map(y => (
        <Line stroke="black" key={y} points={[0, y, CANVAS_HEIGHT, y]} />
      ))}
    </Group>
  );
};
const Barriers = ({
  barriers,
  position
}: {
  barriers: Barrier[] | null;
  position: Position;
}) => {
  if (barriers) {
    return (
      <Group>
        {barriers.map(({ x, y, width, height }, i) => (
          <Rect
            key={i}
            x={x - position.x + CANVAS_WIDTH / 2}
            y={y - position.y + CANVAS_HEIGHT / 2}
            width={width}
            height={height}
            fill="black"
          />
        ))}
      </Group>
    );
  }
  return null!;
};
const AIPlayers = ({ AIs, position }: { AIs: AI[]; position: Position }) => {
  return (
    <Group>
      {AIs.map((ai, i) => {
        let { x, y } = ai.position;
        let adjustedPosition = {
          x: x - position.x + CANVAS_WIDTH / 2,
          y: y - position.y + CANVAS_HEIGHT / 2
        };
        return <AIPlayer key={i} position={adjustedPosition} />;
      })}
    </Group>
  );
};
export default class TopView extends React.Component<Props, {}> {
  render() {
    return (
      <TopViewContainer>
        <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
          <Layer>
            <Walls position={this.props.position} />
            <Grid position={this.props.position} />
            <Circle
              radius={PLAYER_RADIUS}
              x={CANVAS_WIDTH / 2}
              y={CANVAS_HEIGHT / 2}
              fill={"Blue"}
            />
            <Barriers
              barriers={this.props.barriers}
              position={this.props.position}
            />
            <AIPlayers AIs={this.props.ai} position={this.props.position} />
          </Layer>
        </Stage>
      </TopViewContainer>
    );
  }
}
