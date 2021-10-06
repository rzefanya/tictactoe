package com.reza.tictactoe.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.reza.tictactoe.domain.Game;
import com.reza.tictactoe.domain.MoveDTO;
import com.reza.tictactoe.domain.StartDTO;

@Service
public class GameService {
	private final Logger log = LoggerFactory.getLogger(GameService.class);

	private Game game;

	public Game startGame(StartDTO input) {
		log.debug("request to start game : {}", input);

		game = new Game(input.getBoardSize());
		return game;
	}

	public Game move(MoveDTO move) {
		log.debug("request to move : {}", move);

		game.move(move.getX(), move.getY());
		return game;
	}

	public Game getGame() {
		log.debug("request to get game");

		if (game == null) {
			game = new Game(3);
		}
		return game;
	}
}
