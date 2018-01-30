import { Level } from "../../types";

const Level2: Level = {
  id: "level2",
  start: {
    x: 10,
    y: 10
  },
  end: {
    x: 100,
    y: 100
  },
  barriers: [
    {
      x: 50,
      y: 50,
      width: 10,
      height: 50
    }
  ],
  ai: []
};

export default Level2;
