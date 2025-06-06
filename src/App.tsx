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

/**
 * アプリケーションのルートコンポーネント
 * ルーティングの設定とオンボーディング状態に基づいた画面遷移の制御を行う
 * @returns {JSX.Element} アプリケーションのルーティング構造
 */
const App: React.FC = () => {
  // ローカルストレージからオンボーディング完了状態を取得
  const isOnboarded = localStorage.getItem("isOnboarded") === "true";

  return (
    // GitHub Pages用のベースパスを設定したルーター
    <Router basename="/budgetControlDemo">
      {/* ページ遷移時のスクロール位置をリセット */}
      <ScrollToTop />

      <Routes>
        {/* オンボーディング画面のルート */}
        <Route path="/onboarding" element={<Onboarding />} />

        {/* ルートパスへのアクセス時の条件付きリダイレクト */}
        <Route
          path="/"
          element={
            isOnboarded ? (
              // オンボーディング完了時はダッシュボードへ
              <Navigate to="/dashboard" />
            ) : (
              // 未完了時はオンボーディングへ
              <Navigate to="/onboarding" />
            )
          }
        />

        {/* 共通レイアウトを適用するルート群 */}
        <Route element={<Layout />}>
          {/* メイン機能のルート定義 */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/income/add" element={<IncomeAdd />} />
          <Route path="/expense/add" element={<ExpenseAdd />} />
          <Route path="/report" element={<Report />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/skills" element={<Skills />} />
        </Route>

        {/* エラー処理用のルート */}
        <Route path="/error" element={<ErrorPage />} />
        {/* 未定義のパスはすべてエラーページへ */}
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </Router>
  );
};

export default App;
