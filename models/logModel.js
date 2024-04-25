import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: [true, 'Daily work must belong to a user.'],
  },
  dailyWorkId: {
    type: String,
    ref: 'DailyWork',
    required: [true, 'Daily work must belong to a user.'],
  },
  userName: {
    type: String,
    ref: 'User',
    required: [true, 'Daily work must have an user name'],
  },
  dailyWorkTitle: {
    type: String,
    ref: 'DailyWork',
    required: [true, 'Daily work must have a title.'],
  },
  description: {
    type: String,
    required: [true, 'Daily work must have a description.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Log = mongoose.model('Log', logSchema);
export default Log;
