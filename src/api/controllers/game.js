const { deleteFile } = require('../../utils/deleteImg');
const Game = require('../models/game');

const getGames = async (req, res, next) => {
  try {
    const games = await Game.find();
    return res.status(200).json(games);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const getGameByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id);
    return res.status(200).json(game);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const getGameByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const game = await Game.find({ category });
    return res.status(200).json(game);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const getGameByPrice = async (req, res, next) => {
  try {
    const { price } = req.params;
    const game = await Game.find({ price: { $lte: price } });
    return res.status(200).json(game);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const postGame = async (req, res, next) => {
  try {
    const newGame = new Game(req.body);

    if (req.file) {
      newGame.img = req.file.path;
    }

    const savedGame = await newGame.save();
    return res.status(200).json(savedGame);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Request error');
  }
};

const putGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newGame = new Game(req.body);
    newGame._id = id;

    if (req.file) {
      newGame.img = req.file.path;
      const oldgame = await Game.findById(id);
      deleteFile(oldgame.img);
    }

    const updatedGame = await Game.findByIdAndUpdate(id, newGame, {
      new: true
    });
    return res.status(200).json(updatedGame);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedGame = await Game.findByIdAndDelete(id);
    deleteFile(deletedGame.img);
    return res.status(200).json(deletedGame);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

module.exports = {
  getGames,
  getGameByID,
  getGameByCategory,
  getGameByPrice,
  postGame,
  putGame,
  deleteGame
};
