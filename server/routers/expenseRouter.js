const express = require("express");
const expenseController = require("../controllers/expenseController");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/expense").post(verifyToken, expenseController.addExpense);
router.route("/expense").get(verifyToken, expenseController.viewExpenses);
router.route("/expense/:id").put(verifyToken, expenseController.updateExpense);
router.route("/expense/:id").delete(verifyToken, expenseController.deleteExpense);

module.exports = router;