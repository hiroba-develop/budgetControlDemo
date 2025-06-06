import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";

/**
 * 売上入力コンポーネント
 * 売上の登録機能を提供し、金額、日付、取引先、メモを入力可能
 * @returns {JSX.Element} 売上入力フォームのUI
 */
const IncomeAdd: React.FC = () => {
  // ナビゲーション用のフック
  const navigate = useNavigate();

  // 入力データの状態管理
  const [amount, setAmount] = useState(""); // 金額
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // 日付
  const [memo, setMemo] = useState(""); // メモ
  const [client, setClient] = useState(""); // 取引先

  // 最近の取引先データ
  const [recentClients] = useState(["株式会社A", "株式会社B", "個人事業主C"]);

  // 成功表示の状態管理
  const [showSuccess, setShowSuccess] = useState(false);

  /**
   * 表示用に金額をフォーマットする
   * @param {string} value - フォーマットする金額
   * @returns {string} カンマ区切りの金額文字列
   */
  const formatDisplayAmount = (value: string) => {
    if (!value) return "";
    // 数値に変換してカンマ区切りでフォーマット
    const num = parseInt(value, 10);
    return num.toLocaleString("ja-JP");
  };

  /**
   * 売上データを保存する
   * バリデーション、保存処理、成功表示を行う
   */
  const handleSubmit = async () => {
    // 金額の入力チェック
    if (!amount || parseInt(amount) === 0) return;

    // 売上データの保存（実際の実装ではAPI呼び出し）
    console.log({
      amount: parseInt(amount),
      date,
      memo,
      client,
    });

    // 成功アニメーションの表示制御
    setShowSuccess(true);

    // 0.8秒後にダッシュボードに遷移
    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
  };

  /**
   * テンキーの入力を処理する
   * @param {string} num - 押されたキーの値
   */
  const handleNumberPad = (num: string) => {
    if (num === "clear") {
      // 入力をクリア
      setAmount("");
    } else if (num === "delete") {
      // 最後の1文字を削除
      setAmount(amount.slice(0, -1));
    } else {
      // 数値を追加（連結）
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
          <h1 className="text-lg font-bold text-gray-800">売上入力</h1>
          <div className="w-8" />
        </div>
      </header>

      {/* 入力フォーム */}
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

        {/* 取引先 */}
        <div className="bg-white rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            取引先（任意）
          </label>
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="取引先名を入力"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {recentClients.length > 0 && !client && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">最近の取引先</p>
              <div className="flex flex-wrap gap-2">
                {recentClients.map((name) => (
                  <button
                    key={name}
                    onClick={() => setClient(name)}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}
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
      </div>

      {/* 登録ボタン */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t">
        <button
          onClick={handleSubmit}
          disabled={!amount || parseInt(amount) === 0}
          className="w-full py-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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

export default IncomeAdd;
