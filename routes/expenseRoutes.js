
const express = require('express');
const router = express.Router();

const {
    getAllExpenses,
    createExpense,
    updateExpense,
    deleteExpense
} = require('../controllers/expenseController');

router.route('/')
    .get(getAllExpenses)
    .post(createExpense);

router.route('/:id')
    .put(updateExpense)
    .delete(deleteExpense);

module.exports = router;
