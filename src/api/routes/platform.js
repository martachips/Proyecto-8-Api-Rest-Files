const { isAdmin, isAuth } = require('../../middleware/auth');
const upload = require('../../middleware/file');
const {
  getPlatforms,
  getPlatformByID,
  postPlatform,
  putPlatform,
  deletePlatform
} = require('../controllers/platform');

const platformRoutes = require('express').Router();

platformRoutes.get('/:id', getPlatformByID);
platformRoutes.get('/', getPlatforms);
platformRoutes.post('/', [isAdmin], upload.single('img'), postPlatform);
platformRoutes.put('/:id', [isAdmin], upload.single('img'), putPlatform);
platformRoutes.delete('/:id', [isAdmin], deletePlatform);

module.exports = platformRoutes;
