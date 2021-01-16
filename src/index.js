import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  renderSquare(index) {
    return <Square value={this.props.squares[index]} onClick={() => this.props.onClick(index)}/>;
  }

  render() {
    return (
      <div>
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
    )
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nextMove: 'X',
      squares: Array(9).fill(null)
    };
  }

  handleClick(index) {
    const squares = this.state.squares;

    if (squares[index] || calculateWinner(squares)) {
      return;
    }

    let newMove = this.state.nextMove;
    
    squares[index] = newMove;

    if (newMove === 'X') {
      newMove = 'O';
    } else {
      newMove = 'X';
    }

    this.setState({
      nextMove: newMove,
      squares: squares
    });
  }

  restartGame() {
    this.setState({
      nextMove: 'X',
      squares: Array(9).fill(null)
    });
  }

  render() {
    const squares = this.state.squares;
    const hasWinner = calculateWinner(squares);

    const winner = this.state.nextMove === 'X' ? 'O' : 'X';

    const filledSquares = squares.filter(Boolean);
    const draw = !hasWinner && filledSquares.length === squares.length;

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={this.state.squares} onClick={(index) => this.handleClick(index)}/>
        </div>

        <div className="game-info">
          {hasWinner && !draw ? `${winner} venceu!!` : ''}
          {!hasWinner && draw ? 'Deu velha!!' : ''}
          {!hasWinner && !draw ? `Próxima Jogada: ${this.state.nextMove}` : ''}
          <br/>
          <button onClick={() => this.restartGame()}>Reiniciar o jogo</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return lines.some(([a, b, c]) => squares[a] && squares[a] === squares[b] && squares[b] === squares[c]);

  /*
  for (const line of lines) {
    const [a, b, c] = line;

    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return true;
    }
  }

  return false;
  */
}
