const Income = require("../models/income");
const excelJS = require("exceljs");
const xlxs = require("xlsx");
const addIncome = async (req, res) => {
  try {
    const { amount, source, date } = req.body;
    const userId = req.user.id; // Assumes auth middleware sets req.user
    if (!amount || !source || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const income = new Income({ userId ,amount, source, date: new Date(date)});
    await income.save();
    res.status(201).json(income);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const income = await Income.findOneAndDelete({ _id: id, userId });
    if (!income) return res.status(404).json({ error: "Income not found" });
    res.json({ message: "Income deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const downloadIncomeExcel = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomes = await Income.find({ userId });

    const data = incomes.map((income) => ({
      Amount: income.amount,
      Source: income.source,
      Date: income.date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
    }));
    
    const wb = xlxs.utils.book_new();
    const ws = xlxs.utils.json_to_sheet(data);
    xlxs.utils.book_append_sheet(wb, ws, "Incomes");
    xlxs.writeFile(wb, "incomes.xlsx");
    res.download("incomes.xlsx", (err) => {
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
  addIncome,
  getIncome,
  deleteIncome,
  downloadIncomeExcel,
};
