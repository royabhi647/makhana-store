// makhana-store > backend > controllers > orderController.js

import { dbService } from '../models/dbService.js';
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  }
  try {
    const order = await dbService.orders.create({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await dbService.orders.findById(req.params.id);
    if (order) {
      // Check if order belongs to user or user is admin
      const isOwner = order.user && (order.user._id.toString() === req.user._id.toString() || order.user === req.user._id.toString());
      if (isOwner || req.user.isAdmin) {
        res.json(order);
      } else {
        res.status(403).json({ message: 'Not authorized to view this order' });
      }
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await dbService.orders.findById(req.params.id);
    if (order) {
      const updatedOrder = await dbService.orders.updateToPaid(req.params.id, {
        id: req.body.id || 'PAY_' + Math.random().toString(36).substring(7).toUpperCase(),
        status: req.body.status || 'COMPLETED',
        update_time: req.body.update_time || new Date().toISOString(),
        email_address: req.body.email_address || req.user.email
      });
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await dbService.orders.findById(req.params.id);
    if (order) {
      const updatedOrder = await dbService.orders.updateToDelivered(req.params.id);
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await dbService.orders.findByUser(req.user._id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await dbService.orders.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};