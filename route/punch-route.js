const express = require('express');
const punchRouter = express.Router();
const { wrapAsync } = require('../util/utils');
const punchController = require('../controller/punch-controller');
const FILE_NAME = __filename.slice(__dirname.length + 1, -3);

// POST
punchRouter.post('/punch', wrapAsync(punchController.punch, FILE_NAME));
punchRouter.put('/punch', wrapAsync(punchController.updatePunch, FILE_NAME));
module.exports = punchRouter;