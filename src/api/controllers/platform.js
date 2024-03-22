const { deleteFile } = require('../../utils/deleteImg');
const Platform = require('../models/platform');

const getPlatforms = async (req, res, next) => {
  try {
    const platforms = await Platform.find();
    return res.status(200).json(platforms);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const getPlatformByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const platform = await Platform.findById(id).populate('games');
    return res.status(200).json(platform);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const postPlatform = async (req, res, next) => {
  try {
    const newPlatform = new Platform(req.body);

    if (req.file) {
      newPlatform.img = req.file.path;
    }

    const savedPlatform = await newPlatform.save();
    return res.status(201).json(savedPlatform);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const putPlatform = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldPlatform = await Platform.findById(id);
    const newPlatform = new Platform(req.body);
    newPlatform._id = id;
    const games = req.body.games || [];
    newPlatform.games = [...oldPlatform.games, ...games];

    if (req.file) {
      newPlatform.img = req.file.path;
      deleteFile(oldPlatform.img);
    }

    const updatedPlatform = await Platform.findByIdAndUpdate(id, newPlatform, {
      new: true
    });
    return res.status(200).json(updatedPlatform);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const deletePlatform = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPlatform = await Platform.findByIdAndDelete(id);
    deleteFile(deletedPlatform.img);
    return res.status(200).json(deletedPlatform);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

module.exports = {
  getPlatforms,
  getPlatformByID,
  postPlatform,
  putPlatform,
  deletePlatform
};
