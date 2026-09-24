'use strict';

const orderService = require('../services/orderService');

function create(req, res, next) {
  try {
    const order = orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

function getById(req, res, next) {
  try {
    const order = orderService.getOrder(req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
}

function list(req, res) {
  res.json(orderService.listOrders());
}

module.exports = { create, getById, list };
