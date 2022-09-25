const express = require('express')
const router = express.Router()
const { deleteCustomer,postCustomer,getCustomers,updateCustomer } = require('../controllers/customerController')

router.route('/').get(getCustomers).post(postCustomer)

router.route('/:id').delete(deleteCustomer).put(updateCustomer)

module.exports = router