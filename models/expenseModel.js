
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [100, 'Description cannot exceed 100 characters']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0.01, 'Amount must be greater than 0']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: [
            'food',
            'transportation',
            'entertainment',
            'shopping',
            'bills',
            'healthcare',
            'other'
        ]
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        maxlength: [500, 'Notes cannot exceed 500 characters']
    }
}, {
    timestamps: true
});

// Round the amount to 2 decimal places before saving
expenseSchema.pre('save', function (next) {
    if (this.amount) {
        this.amount = Math.round(this.amount * 100) / 100;
    }
    next();
});

module.exports = mongoose.model('Expense', expenseSchema);
