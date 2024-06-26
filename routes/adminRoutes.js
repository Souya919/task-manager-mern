import express from 'express';
const router = express.Router();
import { auth, ensureAdmin } from '../middleware/auth.js';

// User controller
import * as adminController from '../controllers/adminController.js';

// @route GET api/admin/get-all-users
// @desc Get All Users
// @access only For Admin and Private
// router.get('/', ensureAuthenticated, ensureAdmin, adminController.getHome);

// @route GET api/admin/get-all-users
// @desc Get All Users
// @access only For Admin and Private
router.get('/get-all-user', auth, ensureAdmin, adminController.getAllUsers);

// @route GET api/admin/get-logs
// @desc Get All Logs
// @access only For Admin and Private
router.get('/get-logs', auth, ensureAdmin, adminController.getAllLogs);

// router.get('/user-info', ensureAuthenticated, ensureAdmin, adminController.getAllUsers);

// @route GET api/admin/:id
// @desc Set the User Status
// @access only For Admin and Private
router.get('/:id', auth, ensureAdmin, adminController.setUserActive);

// @route POST api/admin/:id
// @desc Update the User
// @access only For Admin and Private
router.post('/:id', auth, ensureAdmin, adminController.updateUser);

// @route POST api/admin/create-user
// @desc Create An User
// @access only For Admin and Private
router.post('/create-user', auth, ensureAdmin, adminController.createUser);

// @route DELETE api/admin/:id
// @desc Delete An User
// @access only For Admin and Private
router.delete('/:id', auth, ensureAdmin, adminController.deleteUser);

// @route POST api/admin/assign-task
// @desc Create An assign task
// @access only For Admin and Private
// router.post('/assign-task', ensureAuthenticated, ensureAdmin, adminController.assignTask);

// @route GET api/admin/get-all-tasks
// @desc Get All Users
// @access only For Admin and Private
// router.get('/get-all-task', ensureAuthenticated, ensureAdmin, adminController.getAllTasks);

// @route PATCH api/admin/update-task/:id
// @desc patch A task
// @access only For Admin and Private
// router.patch('/update-task/:id', ensureAuthenticated, ensureAdmin, adminController.updateTask);

// @route DELETE api/admin/delete-task/:id
// @desc Delete An User
// @access only For Admin and Private
// router.delete(
//   '/delete-task/:id',
//   ensureAuthenticated,
//   ensureAdmin,
//   adminController.deleteTask
// );

export default router;
