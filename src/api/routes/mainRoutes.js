const gameRoutes = require('./game');
const platformRoutes = require('./platform');
const userRoutes = require('./user');

const mainRoutes = require('express').Router();

mainRoutes.use('/user', userRoutes);
mainRoutes.use('/platform', platformRoutes);
mainRoutes.use('/game', gameRoutes);

module.exports = mainRoutes;
