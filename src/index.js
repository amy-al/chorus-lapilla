import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      clickStates: Array(9).fill(false),
      xIsNext: true,
    };
  }

  handleClick(i) {
    // make copies of arrays
    const squares = this.state.squares.slice();
    const clickStates = this.state.clickStates.slice();

    if (calculateWinner(squares)) { 
      return;
    }
    if (sixPieces(squares)){ // in progress...
      if ((squares[i]==='X' && this.state.xIsNext) || (squares[i]==='O' && !this.state.xIsNext)){ // if clicked on right piece
        if(alreadySelected(clickStates)){ // if already selected a piece to move
          // reset
          for (let x = 0; x < 9; x++){
            clickStates[x] = false;
          }
        }
        //add selected state to array
        clickStates[i] = true;
        this.setState({
          squares: squares,
          clickStates: clickStates,
          });
      } 
      else if(squares[i]===null && alreadySelected(clickStates)){
        // set states
        let pieceR = returnSelected(clickStates);
        if (pieceR === -1){
          return;
        }
        else{
          squares[pieceR] = null;
          squares[i] = this.state.xIsNext ? 'X' : 'O';
          // remove all selected squares
          for (let x = 0; x < 9; x++){
              clickStates[x] = false
          }
          this.setState({
            squares: squares,
            clickStates: clickStates,
            xIsNext: !this.state.xIsNext,
            });
        }
      }
    }
    else{
      if (squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function sixPieces(squares){
  let counter = 0;
  for (let i = 0; i < 9; i++){
    if(squares[i]==='X' || squares[i]==='O'){
        counter++;
    }
  }
  if (counter >=6){
    return (true);
  }
  else {
    return (false);
  }
}

function alreadySelected(clickStates){
  for (let i = 0; i < 9; i++){
    if(clickStates[i] === true){
      return(true);
    }
  }
  return(false);
}


function returnSelected(clickStates){
  for (let i = 0; i < 9; i++){
    if(clickStates[i] === true){
      return(i)
    }
  }
  return(-1)
}