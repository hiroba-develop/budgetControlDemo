import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Receipt,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  date: string;
  memo?: string;
}

/**
 * ダッシュボードコンポーネント
 * 収支の概要、10年目標の進捗、最近の取引履歴を表示する
 * @returns {JSX.Element} ダッシュボードのUI
 */
const Dashboard: React.FC = () => {
  // 現在表示中の月を管理するステート
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // データ更新中の状態を管理するステート
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 月次の予算と実績のダミーデータ
  const monthlyTarget = 1000000; // 月間目標額
  const monthlyBudget = 700000; // 月間予算
  const actualIncome = 850000; // 実績収入
  const actualExpense = 620000; // 実績支出
  const balance = actualIncome - actualExpense; // 収支バランス
  const achievementRate = (actualIncome / monthlyTarget) * 100; // 目標達成率

  // 10年目標進捗ゲージ用のダミーデータ
  const tenYearTarget = 50000000; // 10年での目標金額
  const accumulatedProgress = 30000000; // 現在までの進捗額
  const tenYearProgressRate = (accumulatedProgress / tenYearTarget) * 100; // 進捗率

  /**
   * 最近の取引履歴データ
   * 収入と支出の履歴を保持する配列
   */
  const recentTransactions: Transaction[] = [
    {
      id: "1",
      type: "income",
      amount: 120000,
      date: "2024/12/20",
      memo: "プロジェクトA",
    },
    {
      id: "2",
      type: "expense",
      amount: 35000,
      date: "2024/12/19",
      memo: "広告費",
    },
    {
      id: "3",
      type: "income",
      amount: 80000,
      date: "2024/12/18",
      memo: "コンサルティング",
    },
  ];

  /**
   * データを更新する非同期関数
   * ローディング状態を管理しながらデータを更新する
   */
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // 1秒間のダミーの更新処理
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  /**
   * 金額を表示用にフォーマットする
   * @param {number} amount - フォーマットする金額
   * @returns {string} 「○○千円」形式の文字列
   */
  const formatCurrency = (amount: number) => {
    return `${(amount / 1000).toFixed(0)}千円`;
  };

  /**
   * 表示月を変更する
   * @param {('prev'|'next')} direction - 変更する方向
   */
  const changeMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  /**
   * 現在表示中の月が現在の月かどうかを判定
   */
  const isCurrentMonth =
    currentMonth.getMonth() === new Date().getMonth() &&
    currentMonth.getFullYear() === new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => changeMonth("prev")}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-gray-800">
              {currentMonth.getFullYear()}年{currentMonth.getMonth() + 1}月
            </h1>
            <button
              onClick={() => changeMonth("next")}
              className="p-2 rounded-full hover:bg-gray-100"
              disabled={isCurrentMonth}
            >
              <ChevronRight
                size={20}
                className={isCurrentMonth ? "text-gray-300" : ""}
              />
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="pt-20 px-4 pb-4">
        {/* 10年目標進捗ゲージ */}
        <div className="px-4 pb-4">
          <div className="bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg p-6">
            <div className="flex flex-col items-center">
              <h2 className="text-white text-lg font-medium mb-4">
                10年目標進捗
              </h2>

              <div className="text-white text-4xl font-bold mb-1">
                {(accumulatedProgress / 10000).toFixed(0)}万円
              </div>
              <div className="text-white/80 text-sm mb-6">
                目標: {(tenYearTarget / 10000).toFixed(0)}万円
              </div>

              <div className="relative w-32 h-32">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="white"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 56}
                    strokeDashoffset={
                      2 * Math.PI * 56 * (1 - tenYearProgressRate / 100)
                    }
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                  {tenYearProgressRate.toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 収支サマリー */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-600">
              今月の収支サマリー
            </h2>
            <button
              onClick={handleRefresh}
              className={`p-1 rounded-full hover:bg-gray-100 ${
                isRefreshing ? "animate-spin" : ""
              }`}
            >
              <RefreshCcw size={16} />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">売上実績</span>
              <div className="text-right">
                <span className="text-xl font-bold text-gray-800">
                  {formatCurrency(actualIncome)}
                </span>
                <span className="text-sm text-gray-500">
                  {" "}
                  / {formatCurrency(monthlyTarget)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">経費実績</span>
              <div className="text-right">
                <span className="text-xl font-bold text-gray-800">
                  {formatCurrency(actualExpense)}
                </span>
                <span className="text-sm text-gray-500">
                  {" "}
                  / {formatCurrency(monthlyBudget)}
                </span>
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  収支バランス
                </span>
                <span
                  className={`text-xl font-bold ${
                    balance >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {balance >= 0 ? "+" : ""}
                  {formatCurrency(balance)}
                </span>
              </div>
            </div>
          </div>

          {/* 達成率メーター */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">売上達成率</span>
              <span className="text-xs font-medium text-gray-700">
                {achievementRate.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(achievementRate, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 未入力アラート */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-center gap-2">
          <AlertCircle size={20} className="text-yellow-600" />
          <span className="text-sm text-yellow-800">
            昨日の売上が未入力です
          </span>
        </div>

        {/* クイックアクションボタン */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link
            to="/income/add"
            className="bg-orange-500 text-white rounded-lg p-4 flex flex-col items-center justify-center min-h-[100px] hover:bg-orange-600 transition-colors"
          >
            <TrendingUp size={32} className="mb-2" />
            <span className="font-medium">売上を入力</span>
          </Link>
          <Link
            to="/expense/add"
            className="bg-blue-500 text-white rounded-lg p-4 flex flex-col items-center justify-center min-h-[100px] hover:bg-blue-600 transition-colors"
          >
            <Receipt size={32} className="mb-2" />
            <span className="font-medium">経費を入力</span>
          </Link>
        </div>

        {/* 今月の入力履歴 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            最近の入力履歴
          </h3>
          <div className="space-y-2">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === "income"
                        ? "bg-orange-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <TrendingUp size={16} className="text-orange-600" />
                    ) : (
                      <Receipt size={16} className="text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {transaction.memo}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <span
                  className={`text-sm font-medium ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
