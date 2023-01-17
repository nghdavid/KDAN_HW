const express = require('express');
const attendanceRouter = express.Router();
const { wrapAsync } = require('../util/utils');
const attendanceController = require('../controller/attendance-controller');
const FILE_NAME = __filename.slice(__dirname.length + 1, -3);

attendanceRouter.get(
  '/absence',
  wrapAsync(attendanceController.absenceList, FILE_NAME)
);

attendanceRouter.get(
  '/early',
  wrapAsync(attendanceController.earlyList, FILE_NAME)
);

attendanceRouter.get(
  '/list',
  wrapAsync(attendanceController.totalList, FILE_NAME)
);

module.exports = attendanceRouter;
