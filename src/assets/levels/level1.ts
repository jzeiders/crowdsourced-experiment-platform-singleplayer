import { Level } from "../../types";

const Level1: Level = {
  id: "level1",
  start: {
    x: 10,
    y: 10
  },
  end: {
    x: 100,
    y: 100
  },
  barriers: [10, 20, 30, 40, 50, 60, 70, 80].map(i => ({
    x: i,
    y: i,
    width: 10,
    height: 50
  })),
  ai: [
    {
      speed: 1,
      path: [{ x: 400, y: 100 }, { x: 350, y: 90 }]
    }
  ]
};

export default Level1;
