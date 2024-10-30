import './styles/main.css';
import { ChessGame } from './components/Chessboard';

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new ChessGame(document.getElementById('board'));

    // Add event listeners for buttons
    document.getElementById('startBtn').addEventListener('click', () => {
        game.newGame();
    });

    document.getElementById('undoBtn').addEventListener('click', () => {
        game.undoMove();
    });
});