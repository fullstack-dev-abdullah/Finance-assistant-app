import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import UserProvider from "./context/UserContext";
import IncomeDashboard from "./pages/income/IncomeDashboard";
import AddIncome from "./pages/income/AddIncome";
import ExpenseDashboard from "./pages/expense/ExpenseDashboard";
function App() {
  return (
    <UserProvider >
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/income" element={<IncomeDashboard />} />
            <Route path="/income/add" element={<IncomeDashboard/>} />
            <Route path="/expenses" element={<ExpenseDashboard />} />
            <Route path="/expenses/add" element={<ExpenseDashboard />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;

const Root = () => {
  const isAutehenticated = !!localStorage.getItem("token"); // Replace with your authentication logic
  return isAutehenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
