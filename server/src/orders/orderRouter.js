const express = require('express')
const {getOrders, deleteOrderItemId, updateOrderItem,deleteOrderItem, getOrder} = require('./orderController')

const router = express.Router()



router.get('/',getOrders)
router.get('/:id',getOrder)
router.delete('/:id',deleteOrderItem)
router.put('/:id',updateOrderItem)
router.delete('/:order_id',deleteOrderItemId)




module.exports = router