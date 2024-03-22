const { isAdmin, isAuth } = require('../../middleware/auth');
const upload = require('../../middleware/file');
const {
  getGames,
  getGameByID,
  getGameByCategory,
  getGameByPrice,
  postGame,
  putGame,
  deleteGame
} = require('../controllers/game');

const gameRoutes = require('express').Router();

gameRoutes.get('/category/:category', getGameByCategory);
gameRoutes.get('/price/:price', getGameByPrice);
gameRoutes.get('/:id', getGameByID);
gameRoutes.get('/', getGames);
gameRoutes.post('/', [isAuth], upload.single('img'), postGame);
gameRoutes.put('/:id', [isAuth], upload.single('img'), putGame);
gameRoutes.delete('/:id', [isAdmin], deleteGame);

module.exports = gameRoutes;
