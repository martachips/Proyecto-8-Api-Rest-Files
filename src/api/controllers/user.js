const { generateSign } = require('../../config/jwt');
const { deleteFile } = require('../../utils/deleteImg');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const getUser = async (req, res, next) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const getUserByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      imgProfile: req.file.path,
      role: 'user'
    });

    const duplicateUser = await User.findOne({
      userName: req.body.userName,
      email: req.body.email
    });

    if (duplicateUser) {
      return res.status(400).json('This userName already exists');
    }

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Request error');
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return res.status(400).json('This user does not exist');
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ user, token });
    } else {
      return res.status(400).json('Password incorrect');
    }
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    deleteFile(deletedUser.imgProfile);
    return res.status(200).json(deletedUser);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

module.exports = { getUser, getUserByID, register, login, deleteUser };
