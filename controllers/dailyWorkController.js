// Catch Async Error
import catchAsync from '../utils/catchAsync.js';

// Global Error Handler
import AppError from '../utils/appError.js';

// Global Error Handler
import * as factory from './handlerFactory.js';

// Models
import DailyWork from '../models/dailyWorkModel.js';
import User from '../models/userModel.js';
import Log from '../models/logModel.js';
// import moment from 'moment');

// TODO: update | delete functionality on demand

export const saveDailyWork = catchAsync(async (req, res, next) => {
  const { userId, userName, title, description } = req.body;

  if (!userId || !userName || !title || !description)
    return next(new AppError('Please enter all fields 🙂', 400));

  const user = await User.findById({ _id: userId });

  if (!user) return next(new AppError('No User found with that Id!', 404));

  const todaysWork = await DailyWork.create({
    userId,
    userName,
    title,
    description,
  });

  if (!todaysWork)
    return next(new AppError('Something Wrong To Save! Try again.', 404));

  const newLog = await Log.create({
    userId,
    userName,
    dailyWorkId: todaysWork._id,
    dailyWorkTitle: todaysWork.title,
    description: `${userName} created a new task: ${todaysWork.title}`,
  });

  if (!newLog)
    return next(new AppError('Something Wrong To Log! Try again.', 404));

  return res.status(201).json({
    status: 'success',
    todaysWork,
  });
});

// get user daily works
export const getUserDailyWorks = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('User not found with that ID!', 404));

  const userDailyWorks = await DailyWork.find({ userId: user.id });

  if (!userDailyWorks) return next(new AppError('No daily works found.', 404));

  return res.status(200).json({
    status: 'success',
    userDailyWorks,
  });
});

// get all daily works, this routes is only for admin
export const getAllDailyWorks = factory.getAll(DailyWork);

// get all daily works, this routes is only for admin
export const getDailyWorksByDate = factory.getDataByDate(DailyWork);

// export const updateDailyWork = factory.updateOne(DailyWork);
export const updateDailyWork = catchAsync(async (req, res, next) => {
  const doc = await DailyWork.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!doc) {
    return next(new AppError('No doccument found with that id', 404));
  }

  const newLog = await Log.create({
    userId: doc.userId,
    userName: doc.userName,
    dailyWorkId: doc._id,
    dailyWorkTitle: doc.title,
    description: `${doc.userName} updated the task: ${doc.title}`,
  });

  if (!newLog)
    return next(new AppError('Something Wrong To Log! Try again.', 404));

  res.status(200).json({
    status: 'success',
    doc,
  });
});

export const deleteDailyWork = factory.deleteOne(DailyWork);
