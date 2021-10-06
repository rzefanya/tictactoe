package com.reza.tictactoe.domain;

public class StartDTO {
	private int boardSize;

	public int getBoardSize() {
		return boardSize;
	}

	public void setBoardSize(int boardSize) {
		this.boardSize = boardSize;
	}

	@Override
	public String toString() {
		return "StartDTO [boardSize=" + boardSize + "]";
	}

}
