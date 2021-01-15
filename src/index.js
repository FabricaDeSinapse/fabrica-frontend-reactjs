import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      move: ''
    };
  }

  onClick() {
    let newMove = this.state.move;

    if (newMove === 'X') {
      newMove = 'O';
    } else {
      newMove = 'X';
    }

    this.setState({
      move: newMove
    });
  }

  render() {
    return (
      <button className="square" onClick={() => this.onClick()}>
        {this.state.move}
      </button>
    )
  }
}

function Board() {
  return (
    <div>
      <div className="board-row">
        <Square/>
        <Square/>
        <Square/>
      </div>
      <div className="board-row">
        <Square/>
        <Square/>
        <Square/>
      </div>
      <div className="board-row">
        <Square/>
        <Square/>
        <Square/>
      </div>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board/>
      </div>

      <div className="game-info">
        Game Info
      </div>
    </div>
  )
}

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);
