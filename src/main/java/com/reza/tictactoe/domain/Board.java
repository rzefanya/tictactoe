package com.reza.tictactoe.domain;

import java.util.ArrayList;
import java.util.List;

public class Board {
	private List<List<String>> cells;

	public Board(int boardSize) {
		cells = new ArrayList<>();
		for (int i = 0; i < boardSize; i++) {
			List<String> row = new ArrayList<>();
			cells.add(row);

			for (int j = 0; j < boardSize; j++) {
				row.add("");
			}
		}
	}

	public List<List<String>> getCells() {
		return cells;
	}

	/**
	 * Make a move.
	 *
	 * @param x      coordinate of the move.
	 * @param y      coordinate of the move.
	 * @param player who make the move.
	 * @return whether it's a valid or invalid move.
	 */
	public boolean move(int x, int y, String player) {
		if (x < cells.size() && y < cells.size()) {
			List<String> row = cells.get(x);
			String value = row.get(y);

			if (value.equals("")) {
				row.set(y, player);
				return true;
			}
		}
		return false;
	}

	/**
	 * Check if there's any winner found.
	 *
	 * @return null if no winner yet, player name if someone wins, draw if draw
	 */
	public String checkWinner() {
		int boardSize = cells.size();
		int[] verticalPoints = new int[boardSize];
		int diagonalPointA = 0;
		int diagonalPointB = 0;
		int total = 0;
		int point = 0;

		for (int i = 0; i < boardSize; i++) {
			List<String> row = cells.get(i);
			point = 0;
			for (int j = 0; j < boardSize; j++) {
				String value = row.get(j);
				if (value.equals("O")) {
					total++;
					point++;
					verticalPoints[j]++;

					if (i == j) {
						diagonalPointA++;
					}

					if (i + j == boardSize - 1) {
						diagonalPointB++;
					}
				} else if (value.equals("X")) {
					total++;
					point--;
					verticalPoints[j]--;

					if (i == j) {
						diagonalPointA--;
					}

					if (i + j == boardSize - 1) {
						diagonalPointB--;
					}
				}

				if (total == boardSize * boardSize || Math.abs(point) == boardSize
						|| Math.abs(verticalPoints[j]) == boardSize || Math.abs(diagonalPointA) == boardSize
						|| Math.abs(diagonalPointB) == boardSize) {
					if (point == boardSize || verticalPoints[j] == boardSize || diagonalPointA == boardSize
							|| diagonalPointB == boardSize) {
						return "O";
					} else if (point * -1 == boardSize || verticalPoints[j] * -1 == boardSize
							|| diagonalPointA * -1 == boardSize || diagonalPointB * -1 == boardSize) {
						return "X";
					} else {
						return "draw";
					}
				}
			}
		}

		return null;
	}
}
