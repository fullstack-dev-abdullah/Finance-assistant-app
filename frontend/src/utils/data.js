// utils/sidebarData.js
export const sidebarData = {
  sections: [
    {
      id: "main",
      title: "Main",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: "HiHome",
          path: "/dashboard",
          badge: null
        },
        {
          id: "analytics",
          label: "Analytics",
          icon: "MdAnalytics",
          path: "/analytics",
          badge: null
        }
      ]
    },
    {
      id: "transactions",
      title: "Transactions",
      items: [
        {
          id: "income",
          label: "Income",
          icon: "HiTrendingUp",
          path: "/income",
          badge: null,
          subItems: [
            {
              id: "add-income",
              label: "Add Income",
              icon: "HiTrendingUp",
              path: "/income/add"
            },
            {
              id: "income-history",
              label: "Income History",
              icon: "HiDocumentReport",
              path: "/income/history"
            },
            {
              id: "income-categories",
              label: "Income Categories",
              icon: "MdCategory",
              path: "/income/categories"
            }
          ]
        },
        {
          id: "expense",
          label: "Expenses",
          icon: "HiTrendingDown",
          path: "/expenses",
          badge: "2",
          subItems: [
            {
              id: "add-expense",
              label: "Add Expense",
              icon: "HiTrendingDown",
              path: "/expenses/add"
            },
            {
              id: "expense-history",
              label: "Expense History",
              icon: "HiDocumentReport",
              path: "/expenses/history"
            },
            {
              id: "expense-categories",
              label: "Expense Categories",
              icon: "MdCategory",
              path: "/expenses/categories"
            }
          ]
        },
        {
          id: "receipts",
          label: "Receipts",
          icon: "MdReceipt",
          path: "/receipts",
          badge: null
        }
      ]
    },
    // {
    //   id: "accounts",
    //   title: "Accounts & Budget",
    //   items: [
    //     {
    //       id: "accounts",
    //       label: "Accounts",
    //       icon: "MdAccountBalance",
    //       path: "/accounts",
    //       badge: null,
    //       subItems: [
    //         {
    //           id: "bank-accounts",
    //           label: "Bank Accounts",
    //           icon: "MdAccountBalance",
    //           path: "/accounts/bank"
    //         },
    //         {
    //           id: "credit-cards",
    //           label: "Credit Cards",
    //           icon: "MdReceipt",
    //           path: "/accounts/credit"
    //         },
    //         {
    //           id: "cash",
    //           label: "Cash",
    //           icon: "MdSavings",
    //           path: "/accounts/cash"
    //         }
    //       ]
    //     },
    //     {
    //       id: "budget",
    //       label: "Budget",
    //       icon: "MdSavings",
    //       path: "/budget",
    //       badge: null,
    //       subItems: [
    //         {
    //           id: "create-budget",
    //           label: "Create Budget",
    //           icon: "MdSavings",
    //           path: "/budget/create"
    //         },
    //         {
    //           id: "budget-overview",
    //           label: "Budget Overview",
    //           icon: "MdAnalytics",
    //           path: "/budget/overview"
    //         }
    //       ]
    //     }
    //   ]
    // },
    {
      id: "reports",
      title: "Reports & Data",
      items: [
        {
          id: "reports",
          label: "Reports",
          icon: "HiDocumentReport",
          path: "/reports",
          badge: null,
          subItems: [
            {
              id: "monthly-report",
              label: "Monthly Report",
              icon: "HiDocumentReport",
              path: "/reports/monthly"
            },
            {
              id: "yearly-report",
              label: "Yearly Report",
              icon: "HiDocumentReport",
              path: "/reports/yearly"
            },
            {
              id: "custom-report",
              label: "Custom Report",
              icon: "MdAnalytics",
              path: "/reports/custom"
            }
          ]
        },
        {
          id: "import-export",
          label: "Import/Export",
          icon: "FaFileImport",
          path: "/import-export",
          badge: null,
          subItems: [
            {
              id: "import-data",
              label: "Import Data",
              icon: "FaFileImport",
              path: "/import"
            },
            {
              id: "export-data",
              label: "Export Data",
              icon: "FaFileExport",
              path: "/export"
            }
          ]
        }
      ]
    },
    {
      id: "settings",
      title: "Settings",
      items: [
        {
          id: "settings",
          label: "Settings",
          icon: "HiCog",
          path: "/settings",
          badge: null,
          subItems: [
            {
              id: "profile-settings",
              label: "Profile",
              icon: "HiHome",
              path: "/settings/profile"
            },
            {
              id: "preferences",
              label: "Preferences",
              icon: "HiCog",
              path: "/settings/preferences"
            },
            {
              id: "notifications",
              label: "Notifications",
              icon: "HiDocumentReport",
              path: "/settings/notifications"
            }
          ]
        }
      ]
    }
  ]
};

// Helper functions for sidebar data
// export const getSidebarItemById = (id) => {
//   for (const section of sidebarData.sections) {
//     for (const item of section.items) {
//       if (item.id === id) return item;
//       if (item.subItems) {
//         const subItem = item.subItems.find(sub => sub.id === id);
//         if (subItem) return subItem;
//       }
//     }
//   }
//   return null;
// };

// export const getSectionByItemId = (id) => {
//   for (const section of sidebarData.sections) {
//     for (const item of section.items) {
//       if (item.id === id || (item.subItems && item.subItems.find(sub => sub.id === id))) {
//         return section;
//       }
//     }
//   }
//   return null;
// };

// export const getActiveMenuItem = (pathname) => {
//   for (const section of sidebarData.sections) {
//     for (const item of section.items) {
//       if (item.path === pathname) return item;
//       if (item.subItems) {
//         const subItem = item.subItems.find(sub => sub.path === pathname);
//         if (subItem) return subItem;
//       }
//     }
//   }
//   return null;
// };