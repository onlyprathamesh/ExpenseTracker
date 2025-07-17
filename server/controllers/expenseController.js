const Expense = require("../models/expenseModel");

const addExpense = async (req, res) => {
    const userId = req.user.id;
    const expenseData = {
        ...req.body,
        userId
    };
    
    try {
        const expense = await Expense.create(expenseData);
        res.status(200).send({msg:"Expense Added", expense});
    } catch (error) {
        console.log("Failed to add Expense", error.message);
    }
};

const viewExpenses = async (req, res) => {
    const userId = req.user.id;
    try {
        const expenses = await Expense.find({userId});
        res.status(200).send({msg:"Expences Fetched", expenses});
    } catch (error) {
        console.log("failed to load Expenses.", error.message);
    }
};

const updateExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) {
        return res.status(400).send({msg:"Expense Id is required in URL."});
    }
    
    const expense = await Expense.findOne({_id: id, userId});

    if (!expense) {
        return res.status(400).send({msg:"expense not found"});
    }
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        if (!updatedExpense) return res.status(400).send({msg:"Expense not found"});
        res.status(200).send({msg:"Expense updated successfully."});
    } catch (error) {
        console.log("Failed to update expense: ", error.message);
    }
};

const deleteExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) return res.status(400).send({msg:"Expense Id is required in URL."});

    try {
        const expense = await Expense.findByIdAndDelete({_id: id, userId});
        if (!expense) return res.status(400).send({msg:"Expense not found"});
        res.status(200).send({msg:"Expense deleted.", expense});
    } catch (error) {
        console.log("Error deleting expense: ", error.message);
    }
};

module.exports = { addExpense, viewExpenses, updateExpense, deleteExpense };