const express = require('express')
const router = express.Router();

const { newOrder, 
    myOrders, 
    getSingleOrder,
    allOrders,
    deleteOrder,
    updateOrder,
    totalOrders,
    totalSales,
    customerSales,
    salesPerMonth,
 } = require('../controllers/order')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.post('/order/new', isAuthenticatedUser, newOrder);
router.get('/orders/me', isAuthenticatedUser, myOrders);
router.get('/order/:id', isAuthenticatedUser, getSingleOrder);
router.get('/admin/orders/', isAuthenticatedUser, authorizeRoles('admin'),allOrders);
router.route('/admin/order/:id').delete(isAuthenticatedUser, deleteOrder).put(isAuthenticatedUser, updateOrder);
router.get('/admin/total-orders', totalOrders);
router.get('/admin/total-sales', totalSales);
router.get('/admin/customer-sales', customerSales);
router.get('/admin/sales-per-month', salesPerMonth);
module.exports = router;