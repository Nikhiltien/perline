import { Chessboard, COLOR, INPUT_EVENT_TYPE } from 'cm-chessboard';
import { Chess } from 'chess.js';

export class ChessGame {
    constructor(element) {
        this.chess = new Chess();
        this.board = new Chessboard(element, {
            position: this.chess.fen(),
            assetsUrl: 'assets/',
            style: {
                showCoordinates: true,
                borderType: 'thin',
                pieces: {
                    file: 'pieces/standard.svg',
                }
            }
        });
        
        this.initializeGame();
    }

    initializeGame() {
        this.board.enableMoveInput(this.inputHandler.bind(this));
    }

    inputHandler(event) {
        switch (event.type) {
            case INPUT_EVENT_TYPE.moveInputStarted:
                return true;
            
            case INPUT_EVENT_TYPE.validateMoveInput:
                const move = {
                    from: event.squareFrom,
                    to: event.squareTo
                };
                
                // Check if move is legal
                const result = this.chess.move(move);
                if (result) {
                    this.board.setPosition(this.chess.fen());
                    this.updateStatus();
                    return true;
                }
                return false;
        }
    }

    updateStatus() {
        const status = document.getElementById('status');
        let statusText = '';

        if (this.chess.isCheckmate()) {
            statusText = 'Game Over - Checkmate!';
        } else if (this.chess.isDraw()) {
            statusText = 'Game Over - Draw!';
        } else {
            statusText = `Current turn: ${this.chess.turn() === 'w' ? 'White' : 'Black'}`;
            if (this.chess.isCheck()) {
                statusText += ' (Check)';
            }
        }
        
        status.textContent = statusText;
    }

    newGame() {
        this.chess.reset();
        this.board.setPosition(this.chess.fen());
        this.updateStatus();
    }

    undoMove() {
        this.chess.undo();
        this.board.setPosition(this.chess.fen());
        this.updateStatus();
    }
}