const upload = require('../../middleware/file');
const {
  getUser,
  getUserByID,
  register,
  login,
  deleteUser
} = require('../controllers/user');

const userRoutes = require('express').Router();

userRoutes.get('/:id', getUserByID);
userRoutes.get('/', getUser);
userRoutes.post('/register', upload.single('imgProfile'), register);
userRoutes.post('/login', login);
userRoutes.delete('/:id', deleteUser);

module.exports = userRoutes;
