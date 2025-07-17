const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    comments: {
        type: String
    }
}, {timestamps: true});

expenseSchema.index({userId: 1});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;