package com.reza.tictactoe.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reza.tictactoe.domain.Game;
import com.reza.tictactoe.domain.MoveDTO;
import com.reza.tictactoe.domain.StartDTO;
import com.reza.tictactoe.service.GameService;

@RestController
@RequestMapping("/game")
public class GameController {
	private final Logger log = LoggerFactory.getLogger(GameController.class);

	@Autowired
	private GameService service;

	@PostMapping(value = "/start")
	public Game startGame(@RequestBody StartDTO input) {
		log.debug("REST request to start game : {}", input);
		return service.startGame(input);
	}

	@PutMapping(value = "/move")
	public Game move(@RequestBody MoveDTO input) {
		log.debug("REST request to move : {}", input);
		return service.move(input);
	}

	@GetMapping
	public Game getGame() {
		log.debug("REST request to get game");
		return service.getGame();
	}
}
