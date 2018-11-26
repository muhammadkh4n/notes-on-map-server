import express from 'express';

import Note from '../models/note';
import respondErr from '../helpers/error-handler';

const router = express.Router();

router.route('/')
  .post(async (req, res) => {
    try {
      const note = await Note.create(req.body);
      const noteWithUser = await note.populate('user').execPopulate();
      res.status(201).json({
        success: true,
        data: noteWithUser
      });
    } catch (error) {
      respondErr(res, [400, 'Bad data'])();
    }
  })
  .get(async (req, res) => {
    try {
      const notes = await Note.find()
        .populate('user')
        .exec();
      res.status(200).json({
        success: true,
        data: notes
      });
    } catch (error) {
      respondErr(res)();
    }
  });

export default router;
