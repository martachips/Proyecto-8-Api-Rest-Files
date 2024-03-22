const upload = require('../../middleware/file');
const {
  getUser,
  getUserByID,
  register,
  login
} = require('../controllers/user');

const userRoutes = require('express').Router();

userRoutes.get('/:id', getUserByID);
userRoutes.get('/', getUser);
userRoutes.post('/register', upload.single('imgProfile'), register);
userRoutes.post('/login', login);

module.exports = userRoutes;
