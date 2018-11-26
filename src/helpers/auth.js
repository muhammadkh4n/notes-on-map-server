import bcrypt from 'bcrypt';

import jwt from '../helpers/jwt';
import respondErr from '../helpers/error-handler';
import User from '../models/user';

export const register = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return respondErr(res, [400, 'Bad data'])();
  }
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (user) return respondErr(res, [400, 'User exists'])();
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword
    });
    req.user = newUser;
    next();
  } catch (error) {
    return respondErr(res)();
  }
}

export const authenticate = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return respondErr(res, [400, 'Bad data'])();
  }
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) return respondErr(res, [403, 'Bad credentials'])();
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) return respondErr(res, [403, 'Bad credentials'])();
    req.user = user;
    next();
  } catch (error) {
    return respondErr(res)();
  }
}

export const respondWithToken = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      userId: req.user._id,
      username: req.user.email,
      token: jwt({ sub: req.user._id.toString() })
    }
  });
}