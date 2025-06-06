import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Building, Target, Sparkles } from "lucide-react";

/**
 * オンボーディングデータの型定義
 * ユーザーの基本情報と目標設定を管理
 */
interface OnboardingData {
  nickname: string; // ユーザーのニックネーム
  businessStartDate: string; // 事業開始年月
  businessType: string; // 業種
  monthlyTarget: string; // 月間売上目標
  monthlyBudget: string; // 月間経費予算
}

/**
 * オンボーディングコンポーネント
 * 新規ユーザーの初期設定を3ステップで案内する
 * @returns {JSX.Element} オンボーディング画面のUI
 */
const Onboarding: React.FC = () => {
  // ナビゲーション用のフック
  const navigate = useNavigate();

  // 現在のステップを管理するステート（1-3）
  const [currentStep, setCurrentStep] = useState(1);

  // オンボーディングデータを管理するステート
  const [data, setData] = useState<OnboardingData>({
    nickname: "",
    businessStartDate: "",
    businessType: "",
    monthlyTarget: "",
    monthlyBudget: "",
  });

  // 業種の選択肢
  const businessTypes = [
    "IT・Web制作",
    "コンサルティング",
    "小売・物販",
    "飲食",
    "教育・研修",
    "クリエイティブ",
    "不動産",
    "その他",
  ];

  /**
   * 次のステップに進む処理
   * 最終ステップでは完了処理を実行
   */
  const handleNext = () => {
    if (currentStep < 3) {
      // 次のステップに進む
      setCurrentStep(currentStep + 1);
    } else {
      // オンボーディング完了の処理
      localStorage.setItem("isOnboarded", "true");
      localStorage.setItem("userData", JSON.stringify(data));
      navigate("/dashboard");
    }
  };

  /**
   * 前のステップに戻る処理
   */
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  /**
   * 目標設定をスキップする処理
   * ステップ2からステップ3に直接進む
   */
  const handleSkip = () => {
    if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  /**
   * 次のステップに進めるかどうかを判定
   * @returns {boolean} 進行可能な場合はtrue
   */
  const canProceed = () => {
    if (currentStep === 1) {
      // ステップ1ではニックネームが必須
      return data.nickname.trim() !== "";
    }
    return true;
  };

  /**
   * 金額を表示用にフォーマット
   * @param {string} value - フォーマットする金額
   * @returns {string} カンマ区切りの金額文字列
   */
  const formatCurrency = (value: string) => {
    // 数値以外の文字を除去
    const num = value.replace(/[^0-9]/g, "");
    if (!num) return "";
    // カンマ区切りでフォーマット
    return parseInt(num).toLocaleString("ja-JP");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* プログレスバー */}
      <div className="px-4 pt-8">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-2 mx-1 rounded-full transition-all duration-300 ${
                step <= currentStep ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 pb-4">
        {/* ステップ1: 基本情報 */}
        {currentStep === 1 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building size={40} className="text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                ようこそ！
              </h1>
              <p className="text-gray-600">まずは基本情報を教えてください</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ニックネーム <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.nickname}
                  onChange={(e) =>
                    setData({ ...data, nickname: e.target.value })
                  }
                  placeholder="例：田中さん"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  事業開始年月
                </label>
                <input
                  type="month"
                  value={data.businessStartDate}
                  onChange={(e) =>
                    setData({ ...data, businessStartDate: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  業種
                </label>
                <select
                  value={data.businessType}
                  onChange={(e) =>
                    setData({ ...data, businessType: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">選択してください</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ステップ2: 目標設定 */}
        {currentStep === 2 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={40} className="text-orange-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                目標を設定しましょう
              </h1>
              <p className="text-gray-600">あとで変更できます</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  月間売上目標
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formatCurrency(data.monthlyTarget)}
                    onChange={(e) =>
                      setData({
                        ...data,
                        monthlyTarget: e.target.value.replace(/[^0-9]/g, ""),
                      })
                    }
                    placeholder="1,000,000"
                    className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    円
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  月間経費予算
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formatCurrency(data.monthlyBudget)}
                    onChange={(e) =>
                      setData({
                        ...data,
                        monthlyBudget: e.target.value.replace(/[^0-9]/g, ""),
                      })
                    }
                    placeholder="700,000"
                    className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    円
                  </span>
                </div>
              </div>

              <button
                onClick={handleSkip}
                className="w-full text-center text-gray-500 underline text-sm"
              >
                あとで設定する
              </button>
            </div>
          </div>
        )}

        {/* ステップ3: 完了 */}
        {currentStep === 3 && (
          <div className="animate-fadeIn text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles size={48} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              準備完了！
            </h1>
            <p className="text-gray-600 mb-8">
              {data.nickname || "あなた"}さん、予実管理を始めましょう
            </p>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-4">
                使い方はとてもシンプル
              </h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">1.</span>
                  <span className="text-gray-700">
                    売上や経費が発生したらすぐ入力
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">2.</span>
                  <span className="text-gray-700">月次レポートで振り返り</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">3.</span>
                  <span className="text-gray-700">
                    目標達成を目指しましょう！
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* ボタン */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className="flex gap-3">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 text-gray-600 font-medium"
            >
              戻る
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {currentStep === 3 ? "はじめる" : "次へ"}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
