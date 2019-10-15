import React, { Component } from "react";
import {
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GiSwallow } from "react-icons/gi";
import styled from "styled-components";

const GameWrapper = styled.div`
  max-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;
  width: 48%;
  margin: 0 auto;
`;

const Header = styled.h1`
  margin: 2% 43%;
`;

const GameControls = styled.div`
  width: 20em;
  align-self: flex-end;
  margin: 1% auto;
  display: grid;
  grid-template-columns: repeat() (3, 1fr);
  grid-template-rows: repeat(2, 3em);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  align-content: center;
  .control {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px solid brown;
  }
  .control:first-child {
    grid-area: 1 / 1 / 3 / 2;
  }
  .control:nth-child(2) {
    grid-area: 1 / 2 / 2 / 3;
  }
  .control:nth-child(3) {
    grid-area: 2 / 2 / 3 / 3;
  }
  .control:last-child {
    grid-area: 1 / 3 / 3 / 4;
  }
`;

const GameSquare = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-width: 0px;
  border-color: #f7f7f7;
  height: ${props => `calc(100% / ${props.rows}em)`};
  .player {
    height: 100%;
    font-size: 4em;
    fill: #f7f7f7;
  }
  .n {
    transform: rotate(270deg);
  }
  .s {
    transform: rotate(90deg);
  }
  .w {
    transform: scaleX(-1);
  }
  border-top-width: ${({ border }) => (border.top ? `1px` : "0px")};
  border-right-width: ${({ border }) => (border.right ? `1px` : "0px")};
  border-bottom-width: ${({ border }) => (border.bottom ? `1px` : "0px")};
  border-left-width: ${({ border }) => (border.left ? `1px` : "0px")};
`;

const GameBox = styled.div`
  height: 60vh;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, 1fr)`};
  grid-auto-rows: ${props => `calc(100% / ${props.columns})`};
  background: #1a1e28;
`;

let gridRooms = [
  [
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 }
  ],
  [
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 }
  ],
  [
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 }
  ],
  [
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 }
  ],
  [
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 },
    { n: 0, e: 0, s: 0, w: 0 }
  ]
];

class Robot extends Component {
  state = {
    playerX: 0,
    playerY: 0,
    grid: [],
    facing: "e"
  };

  componentDidMount() {
    document.addEventListener("keydown", this.keyPressed, false);
    this.getRooms();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyPressed, false);
  }

  getRooms = () => {
    this.setState({ grid: gridRooms });
  };

  // sets the state of the grid coordinates
  currentRoom = () => this.state.grid[this.state.playerY][this.state.playerX];

  move = direction => {
    // moves the player on the grid
    switch (direction) {
      case "n":
        if (this.state.playerY > 0 && !this.currentRoom().n) {
          this.setState({ playerY: this.state.playerY - 1 });
        }
        break;
      case "e":
        if (
          this.state.grid.length &&
          this.state.playerX < this.state.grid[0].length - 1 &&
          !this.currentRoom().e
        ) {
          this.setState({ playerX: this.state.playerX + 1 });
        }
        break;
      case "s":
        if (
          this.state.grid.length &&
          this.state.playerY < this.state.grid.length - 1 &&
          !this.currentRoom().s
        ) {
          this.setState({ playerY: this.state.playerY + 1 });
        }
        break;
      case "w":
        if (this.state.playerX > 0 && !this.currentRoom().w) {
          this.setState({ playerX: this.state.playerX - 1 });
        }
        break;
      default:
        break;
    }
  };

  keyPressed = e => {
    e.preventDefault();
    // either calls the move player function or sets the state to the correct direction
    if (e.key === "ArrowUp" && this.state.facing === "n") {
      this.move("n");
    } else if (e.key === "ArrowUp" && this.state.facing !== "n") {
      this.setState({ facing: "n" });
    }
    if (e.key === "ArrowDown" && this.state.facing === "s") {
      this.move("s");
    } else if (e.key === "ArrowDown" && this.state.facing !== "s") {
      this.setState({ facing: "s" });
    }
    if (e.key === "ArrowLeft" && this.state.facing === "w") {
      this.move("w");
    } else if (e.key === "ArrowLeft" && this.state.facing !== "w") {
      this.setState({ facing: "w" });
    }
    if (e.key === "ArrowRight" && this.state.facing === "e") {
      this.move("e");
    } else if (e.key === "ArrowRight" && this.state.facing !== "e") {
      this.setState({ facing: "e" });
    }
  };

  render() {
    const { playerX, playerY, grid } = this.state;

    // initializing the borders
    const getBorders = (row, row_i, cell, col_i) => ({
      top: cell.n || row_i === 0,
      right: cell.e || col_i === row.length - 1,
      bottom: cell.s || row_i === grid.length - 1,
      left: cell.w || col_i === 0
    });

    // initializing the grid
    const GameRows = () =>
      grid.length &&
      grid.map((row, row_i) =>
        row.map((cell, col_i) => (
          <GameSquare
            key={row_i + col_i}
            data-x={row_i}
            data-y={col_i}
            border={getBorders(row, row_i, cell, col_i)}
          >
            {row_i === playerY && col_i === playerX ? (
              <GiSwallow className={`player ${this.state.facing}`} />
            ) : null}
          </GameSquare>
        ))
      );

    if (!grid.length) return <h1>Loading...</h1>;
    return (
      <div>
        <Header>Robot Swallow</Header>
        <GameWrapper>
          <GameBox columns={grid[0].length} rows={grid.length}>
            <GameRows />
          </GameBox>
        </GameWrapper>
        <div>
          <GameControls>
            <div className="control" onClick={() => this.move("w")}>
              <FontAwesomeIcon icon={faChevronLeft} size="2x" />
            </div>
            <div className="control" onClick={() => this.move("n")}>
              <FontAwesomeIcon icon={faChevronUp} size="2x" />
            </div>
            <div className="control" onClick={() => this.move("s")}>
              <FontAwesomeIcon icon={faChevronDown} size="2x" />
            </div>
            <div className="control" onClick={() => this.move("e")}>
              <FontAwesomeIcon icon={faChevronRight} size="2x" />
            </div>
          </GameControls>
        </div>
      </div>
    );
  }
}

export default Robot;
