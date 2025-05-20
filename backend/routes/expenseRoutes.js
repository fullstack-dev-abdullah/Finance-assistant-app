const express = require("express");
const router = express.Router();

const { addExpense,getExpense,deleteExpense,downloadExpenseExcel  } = require("../controllers/expenseController");
const {authProtect} = require('../middleware/authMiddleware');

router.post("/add", authProtect,addExpense);
router.get("/get", authProtect,getExpense);
router.delete("/:id", authProtect,deleteExpense);
router.get("/download/excel", authProtect,downloadExpenseExcel);

module.exports = router;