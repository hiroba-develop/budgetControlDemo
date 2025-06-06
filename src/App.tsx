import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import IncomeAdd from "./pages/IncomeAdd";
import ExpenseAdd from "./pages/ExpenseAdd";
import Report from "./pages/Report";
import Onboarding from "./pages/Onboarding";
import Settings from "./pages/Settings";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout";
import Skills from "./pages/Skills";
import ScrollToTop from "./components/ScrollToTop";

const App: React.FC = () => {
  // 初期設定が完了しているかチェック（実際の実装では状態管理を使用）
  const isOnboarded = localStorage.getItem("isOnboarded") === "true";

  return (
    <Router basename="/budgetControlDemo">
      {" "}
      {/* basename を追加 */}
      <ScrollToTop />
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/"
          element={
            isOnboarded ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/onboarding" />
            )
          }
        />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/income/add" element={<IncomeAdd />} />
          <Route path="/expense/add" element={<ExpenseAdd />} />
          <Route path="/report" element={<Report />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/skills" element={<Skills />} />
        </Route>
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </Router>
  );
};

export default App;
