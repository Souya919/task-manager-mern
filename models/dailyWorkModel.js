import mongoose from 'mongoose';

const dailyWorkSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: [true, 'Daily work must belong to a user.'],
  },
  userName: {
    type: String,
    ref: 'User',
    required: [true, 'Daily work must have an user name'],
  },
  title: {
    type: String,
    ref: 'Task',
    required: [true, 'Daily work must have a title.'],
  },
  description: {
    type: String,
    required: [true, 'Daily work must have a description.'],
  },
  status: {
    type: String,
    default: 'Planned',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DailyWork = mongoose.model('DailyWork', dailyWorkSchema);
export default DailyWork;
