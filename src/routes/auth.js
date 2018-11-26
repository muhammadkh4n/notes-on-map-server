import express from 'express';

import { authenticate, register, respondWithToken } from '../helpers/auth';

const router = express.Router();

router.post(
  '/login',
  authenticate,
  respondWithToken
);

router.post(
  '/register',
  register,
  respondWithToken
);

export default router;