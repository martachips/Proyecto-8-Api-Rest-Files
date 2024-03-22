const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    password: { type: String, trim: true, required: true },
    email: { type: String, required: true, trim: true },
    role: { type: String, trim: true, required: true, enum: ['admin', 'user'] },
    imgProfile: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model('users', userSchema, 'users');
module.exports = User;
