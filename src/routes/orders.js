'use strict';

const { Router } = require('express');
const controller = require('../controllers/ordersController');

const router = Router();
router.post('/', controller.create);
router.get('/', controller.list);
router.get('/:id', controller.getById);

module.exports = router;
