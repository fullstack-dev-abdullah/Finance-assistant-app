const Income = require("../models/income");
const Expense = require("../models/expense");
const mongoose = require("mongoose");

// Helper function to get date range for current month
const getCurrentMonthRange = () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59
  );
  return { startOfMonth, endOfMonth };
};

// Helper function to get date range for previous month
const getPreviousMonthRange = () => {
  const now = new Date();
  const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfPrevMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
    23,
    59,
    59
  );
  return { startOfPrevMonth, endOfPrevMonth };
};

// Helper function to get last 6 months data
const getLast6MonthsRange = () => {
  const months = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
    months.push({
      name: date.toLocaleDateString("en-US", { month: "short" }),
      start: date,
      end: endDate,
      month: date.getMonth(),
      year: date.getFullYear(),
    });
  }
  return months;
};

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID comes from auth middleware

    // Get date ranges
    const { startOfMonth, endOfMonth } = getCurrentMonthRange();
    const { startOfPrevMonth, endOfPrevMonth } = getPreviousMonthRange();
    const monthsRange = getLast6MonthsRange();

    // Calculate total income and expenses
    const totalIncomeResult = await Income.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpensesResult = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = totalIncomeResult[0]?.total || 0;
    const totalExpenses = totalExpensesResult[0]?.total || 0;
    const totalBalance = totalIncome - totalExpenses;

    // Calculate current month totals for monthly change
    const currentMonthIncome = await Income.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const currentMonthExpenses = await Expense.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Calculate previous month totals for monthly change
    const prevMonthIncome = await Income.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: startOfPrevMonth, $lte: endOfPrevMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const prevMonthExpenses = await Expense.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: startOfPrevMonth, $lte: endOfPrevMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Calculate monthly change percentage
    const currentMonthNet =
      (currentMonthIncome[0]?.total || 0) -
      (currentMonthExpenses[0]?.total || 0);
    const prevMonthNet =
      (prevMonthIncome[0]?.total || 0) - (prevMonthExpenses[0]?.total || 0);
    const monthlyChange =
      prevMonthNet !== 0
        ? ((currentMonthNet - prevMonthNet) / Math.abs(prevMonthNet)) * 100
        : 0;

    // Get transaction counts
    const incomeCount = await Income.countDocuments({
      userId: new mongoose.Types.ObjectId(userId),
    });
    const expenseCount = await Expense.countDocuments({
      userId: new mongoose.Types.ObjectId(userId),
    });
    const transactionCount = incomeCount + expenseCount;

    // Get recent transactions (last 10)
    const recentIncomes = await Income.find({ userId })
      .sort({ date: -1 })
      .limit(5)
      .lean();

    const recentExpenses = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(5)
      .lean();

    // Combine and sort recent transactions
    const allRecentTransactions = [
      ...recentIncomes.map((income) => ({
        id: income._id,
        type: "income",
        source: income.source,
        amount: income.amount,
        category: income.category || "Income",
        account: income.account || "General",
        date: income.date.toISOString().split("T")[0],
        recurring: income.recurring || false,
      })),
      ...recentExpenses.map((expense) => ({
        id: expense._id,
        type: "expense",
        description: expense.description,
        amount: expense.amount,
        category: expense.category,
        account: expense.account || "General",
        date: expense.date.toISOString().split("T")[0],
        recurring: expense.recurring || false,
      })),
    ];

    const recentTransactions = allRecentTransactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);

    // Get monthly chart data for last 6 months
    const chartData = await Promise.all(
      monthsRange.map(async (month) => {
        const monthIncome = await Income.aggregate([
          {
            $match: {
              userId: new mongoose.Types.ObjectId(userId),
              date: { $gte: month.start, $lte: month.end },
            },
          },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const monthExpenses = await Expense.aggregate([
          {
            $match: {
              userId: new mongoose.Types.ObjectId(userId),
              date: { $gte: month.start, $lte: month.end },
            },
          },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        return {
          name: month.name,
          income: monthIncome[0]?.total || 0,
          expenses: monthExpenses[0]?.total || 0,
        };
      })
    );

    // Get category breakdown for income
    const incomeCategories = await Income.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $ifNull: ["$category", "Income"] },
          amount: { $sum: "$amount" },
        },
      },
      { $project: { category: "$_id", amount: 1, _id: 0 } },
      { $sort: { amount: -1 } },
    ]);

    // Get category breakdown for expenses
    const expenseCategories = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$category",
          amount: { $sum: "$amount" },
        },
      },
      { $project: { category: "$_id", amount: 1, _id: 0 } },
      { $sort: { amount: -1 } },
    ]);

    // Prepare dashboard response
    const dashboardData = {
      stats: {
        totalBalance: parseFloat(totalBalance.toFixed(2)),
        totalIncome: parseFloat(totalIncome.toFixed(2)),
        totalExpenses: parseFloat(totalExpenses.toFixed(2)),
        monthlyChange: parseFloat(monthlyChange.toFixed(1)),
        transactionCount,
      },
      recentTransactions,
      chartData: {
        monthly: chartData,
      },
      categoryBreakdown: {
        income: incomeCategories,
        expenses: expenseCategories,
      },
    };

    res.status(200).json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardData,
};
