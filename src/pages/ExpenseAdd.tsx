import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Car,
  Coffee,
  Package,
  Megaphone,
  Users,
  Utensils,
  Building,
  Briefcase,
  MoreHorizontal,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const ExpenseAdd: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [memo, setMemo] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [continuousMode, setContinuousMode] = useState(false);

  const categories: Category[] = [
    {
      id: "transport",
      name: "交通費",
      icon: <Car size={24} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "meeting",
      name: "会議費",
      icon: <Coffee size={24} />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: "purchase",
      name: "仕入れ",
      icon: <Package size={24} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "advertising",
      name: "広告費",
      icon: <Megaphone size={24} />,
      color: "bg-red-100 text-red-600",
    },
    {
      id: "entertainment",
      name: "接待費",
      icon: <Users size={24} />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: "meal",
      name: "飲食費",
      icon: <Utensils size={24} />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: "rent",
      name: "家賃",
      icon: <Building size={24} />,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      id: "office",
      name: "事務用品",
      icon: <Briefcase size={24} />,
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: "other",
      name: "その他",
      icon: <MoreHorizontal size={24} />,
      color: "bg-gray-100 text-gray-600",
    },
  ];

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setAmount(numericValue);
  };

  const formatDisplayAmount = (value: string) => {
    if (!value) return "";
    const num = parseInt(value, 10);
    return num.toLocaleString("ja-JP");
  };

  const handleSubmit = async () => {
    if (!amount || parseInt(amount) === 0 || !selectedCategory) return;

    // 保存処理
    console.log({
      amount: parseInt(amount),
      date,
      category: selectedCategory,
      memo,
    });

    setShowSuccess(true);

    if (continuousMode) {
      // 連続入力モード
      setTimeout(() => {
        setShowSuccess(false);
        setAmount("");
        setMemo("");
        // カテゴリと日付は保持
      }, 800);
    } else {
      // 通常モード
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    }
  };

  const handleNumberPad = (num: string) => {
    if (num === "clear") {
      setAmount("");
    } else if (num === "delete") {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount(amount + num);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-800">経費入力</h1>
          <div className="w-8" />
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* 金額入力 */}
        <div className="bg-white rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            金額 <span className="text-red-500">*</span>
          </label>
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-gray-800 h-12 flex items-center justify-center">
              {formatDisplayAmount(amount) || "0"}
              <span className="text-lg ml-1">円</span>
            </div>
          </div>

          {/* テンキー */}
          <div className="grid grid-cols-3 gap-2">
            {[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "00",
              "0",
              "delete",
            ].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberPad(num)}
                className={`h-14 rounded-lg font-medium text-lg ${
                  num === "delete"
                    ? "bg-gray-200 text-gray-600"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                } active:scale-95 transition-transform`}
              >
                {num === "delete" ? "←" : num}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleNumberPad("clear")}
            className="w-full mt-2 h-12 bg-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-300"
          >
            クリア
          </button>
        </div>

        {/* カテゴリ選択 */}
        <div className="bg-white rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            カテゴリ <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedCategory === category.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-2`}
                >
                  {category.icon}
                </div>
                <p className="text-xs font-medium text-gray-700">
                  {category.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* 日付選択 */}
        <div className="bg-white rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            日付
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* メモ */}
        <div className="bg-white rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            メモ（任意）
          </label>
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="メモを入力"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 連続入力モード */}
        <div className="bg-white rounded-lg p-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={continuousMode}
              onChange={(e) => setContinuousMode(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">連続入力モード</span>
          </label>
          <p className="text-xs text-gray-500 mt-1 ml-6">
            登録後も入力画面に留まります
          </p>
        </div>
      </div>

      {/* 登録ボタン */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t">
        <button
          onClick={handleSubmit}
          disabled={!amount || parseInt(amount) === 0 || !selectedCategory}
          className="w-full py-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          登録する
        </button>
      </div>

      {/* 成功アニメーション */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 animate-bounce">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <Check size={32} className="text-white" />
            </div>
            <p className="mt-4 text-center font-medium">登録しました！</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseAdd;
