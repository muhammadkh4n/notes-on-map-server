import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Note = mongoose.model('Note', NoteSchema);

export default Note;