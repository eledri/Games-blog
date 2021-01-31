const { request, response } = require("express");
const express = require("express");
const gamesLogic = require("../business-logic-layer/games-logic");
const router = express.Router();

//get all games
router.get("/games", async (request, response) => {
    try {
      const games = await gamesLogic.getAllGamesAsync();
      response.json(games);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });

//get all games by category (football/basketball) 
router.get("/games/:category", async (request, response) => {
  const category = request.params.category;
  try {
    const games = await gamesLogic.getAllGamesByCategoryAsync(category);
    response.json(games);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

//get all comments by game id
router.get("/comment/:id", async (request, response) => {
    const id = +request.params.id;
    try {
      const game = await gamesLogic.getAllCommentsAsync(id);
      if(!game) {
        response.status(404).send(`id ${id} not found.`);
        return;
    }
      response.json(game);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });

//add new comment
router.post("/comment", async (request, response) => {
  try {
    const comment = request.body;
    const addedComment = await gamesLogic.addCommentAsync(comment);
    response.status(201).json(addedComment);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

module.exports = router;
