
const Expense = require('../models/expenseModel');

// Get all expenses
exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: expenses.length,
            data: expenses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Create a new expense
exports.createExpense = async (req, res) => {
    try {
        const { description, amount, category, date, notes } = req.body;

        const newExpense = await Expense.create({
            description,
            amount,
            category,
            date,
            notes
        });

        res.status(201).json({
            success: true,
            data: newExpense
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Update an expense
exports.updateExpense = async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedExpense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedExpense
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(
            req.params.id
        );

        if (!deletedExpense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};
