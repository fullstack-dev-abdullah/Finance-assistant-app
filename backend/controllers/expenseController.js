// const { predictCategory } = require("../ai-integrations/CategoryPredictor");
const Expense = require("../models/expense");
const xlxs = require("xlsx");

const addExpense = async (req, res) => {
  try {
    let { amount, category, description, date } = req.body;
    // If no category or set to "auto", use AI prediction
    // if (!category || category === "auto") {
    //   category = await predictCategory(description);
    //   console.log(`🔮 Predicted category: ${category}`);
    // }

    const userId = req.user.id;
    const expense = new Expense({
      amount,
      category,
      description,
      date,
      userId,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const expense = await Expense.findOneAndDelete({ _id: id, userId });
    if (!expense) return res.status(404).json({ error: "Expense not found" });
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const downloadExpenseExcel = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.find({ userId });

    const data = expenses.map((expense) => ({
      Amount: expense.amount,
      Category: expense.category,
      Date: expense.date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
    }));

    const wb = xlxs.utils.book_new();
    const ws = xlxs.utils.json_to_sheet(data);
    xlxs.utils.book_append_sheet(wb, ws, "Expenses");
    xlxs.writeFile(wb, "expenses.xlsx");
    res.download("expenses.xlsx", (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error downloading file" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addExpense,
  getExpense,
  deleteExpense,
  downloadExpenseExcel,
};
