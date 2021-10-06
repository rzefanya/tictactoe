package com.reza.tictactoe.domain;

public class Game {
	private int boardSize;
	private Board board;
	private String currentPlayer;
	private boolean finish = false;
	private String winner;

	public Game(int boardSize) {
		this.boardSize = boardSize;
		this.startGame();
	}

	public int getBoardSize() {
		return boardSize;
	}

	public Board getBoard() {
		return board;
	}

	public String getCurrentPlayer() {
		return currentPlayer;
	}

	public boolean isFinish() {
		return finish;
	}

	public String getWinner() {
		return winner;
	}

	private void startGame() {
		currentPlayer = "O";
		board = new Board(boardSize);
	}

	public void move(int x, int y) {
		if (!finish) {
			boolean valid = board.move(x, y, currentPlayer);

			if (valid) {
				this.changePlayer();
				this.checkWinner();
			}
		}
	}

	private void changePlayer() {
		if (currentPlayer.equals("O")) {
			currentPlayer = "X";
		} else {
			currentPlayer = "O";
		}

	}

	private void checkWinner() {
		String winner = board.checkWinner();
		if (winner != null) {
			finish = true;

			if (!"draw".equals(winner)) {
				this.winner = winner;
			}
		}
	}
}
