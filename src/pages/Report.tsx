import React, { useState } from "react";
import {
  Download,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Report: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // ダミーデータ
  const monthlyData = {
    income: 850000,
    expense: 620000,
    profit: 230000,
    previousIncome: 780000,
    previousExpense: 650000,
  };

  const incomeGrowth = (
    ((monthlyData.income - monthlyData.previousIncome) /
      monthlyData.previousIncome) *
    100
  ).toFixed(1);
  const expenseChange = (
    ((monthlyData.expense - monthlyData.previousExpense) /
      monthlyData.previousExpense) *
    100
  ).toFixed(1);

  // グラフ用データ
  const monthlyTrend = [
    { month: "10月", income: 680, expense: 520 },
    { month: "11月", income: 780, expense: 650 },
    { month: "12月", income: 850, expense: 620 },
  ];

  const expenseBreakdown = [
    { name: "仕入れ", value: 248000, percentage: 40 },
    { name: "広告費", value: 124000, percentage: 20 },
    { name: "交通費", value: 93000, percentage: 15 },
    { name: "会議費", value: 62000, percentage: 10 },
    { name: "その他", value: 93000, percentage: 15 },
  ];

  const dailyTrend = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    amount: Math.floor(Math.random() * 50000 + 10000),
  }));

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  const formatCurrency = (amount: number) => {
    return `${(amount / 1000).toFixed(0)}千円`;
  };

  const changeMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const handleExportPDF = () => {
    // PDF出力処理
    alert("PDF出力機能は実装予定です");
  };

  const isCurrentMonth =
    currentMonth.getMonth() === new Date().getMonth() &&
    currentMonth.getFullYear() === new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => changeMonth("prev")}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-gray-800">
              {currentMonth.getFullYear()}年{currentMonth.getMonth() + 1}
              月レポート
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

      <div className="p-4 space-y-4">
        {/* サマリーセクション */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">収支サマリー</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">売上合計</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">
                  {formatCurrency(monthlyData.income)}
                </span>
                <span
                  className={`text-sm flex items-center ${
                    parseFloat(incomeGrowth) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {parseFloat(incomeGrowth) >= 0 ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                  {Math.abs(parseFloat(incomeGrowth))}%
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">経費合計</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">
                  {formatCurrency(monthlyData.expense)}
                </span>
                <span
                  className={`text-sm flex items-center ${
                    parseFloat(expenseChange) <= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {parseFloat(expenseChange) >= 0 ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                  {Math.abs(parseFloat(expenseChange))}%
                </span>
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">利益</span>
                <span
                  className={`text-2xl font-bold ${
                    monthlyData.profit >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {monthlyData.profit >= 0 ? "+" : ""}
                  {formatCurrency(monthlyData.profit)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 売上推移グラフ */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-md font-bold text-gray-800 mb-4">
            売上・経費推移（過去3ヶ月）
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}千円`} />
                <Bar dataKey="income" fill="#F59E0B" name="売上" />
                <Bar dataKey="expense" fill="#3B82F6" name="経費" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 経費内訳 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-md font-bold text-gray-800 mb-4">経費内訳</h3>
          <div className="flex items-center justify-between">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatCurrency(value as number)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 ml-4">
              {expenseBreakdown.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between py-1"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full`}
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* インサイト */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-md font-bold text-gray-800 mb-3">
            今月のインサイト
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span className="text-sm text-gray-700">
                今月は目標を8.5%上回りました
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span className="text-sm text-gray-700">
                経費が先月より4.6%減少しています
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span className="text-sm text-gray-700">
                最も多い経費は仕入れ費（40%）でした
              </span>
            </li>
          </ul>
        </div>

        {/* PDF出力ボタン */}
        <button
          onClick={handleExportPDF}
          className="w-full bg-gray-800 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
        >
          <Download size={20} />
          <span>PDFで出力</span>
        </button>
      </div>
    </div>
  );
};

export default Report;
