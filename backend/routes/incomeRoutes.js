const express = require("express");
const router = express.Router();

const { addIncome, getIncome, deleteIncome,downloadIncomeExcel } = require("../controllers/incomeController");
const {authProtect} = require('../middleware/authMiddleware');

router.post("/add", authProtect,addIncome);
router.get("/get", authProtect,getIncome);
router.delete("/:id", authProtect,deleteIncome);
router.get("/download/excel", authProtect,downloadIncomeExcel);

module.exports = router;