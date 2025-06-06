import React from "react";
import { useNavigate } from "react-router-dom";
import { CloudOff, Home, RefreshCcw } from "lucide-react";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    // ページをリロード
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* エラーアイコン */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <CloudOff size={64} className="text-blue-600" />
          </div>
        </div>

        {/* エラーメッセージ */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          接続できませんでした
        </h1>
        <p className="text-gray-600 mb-8">一時的な問題が発生しました</p>

        {/* 対処法 */}
        <div className="bg-white rounded-lg p-6 mb-8 text-left">
          <h2 className="font-medium text-gray-800 mb-3">
            以下をお試しください：
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>ネットワーク接続を確認してください</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>しばらく待ってから再度お試しください</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>問題が続く場合はサポートにお問い合わせください</span>
            </li>
          </ul>
        </div>

        {/* アクションボタン */}
        <div className="space-y-3">
          <button
            onClick={handleRetry}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <RefreshCcw size={20} />
            <span>再試行</span>
          </button>
          <button
            onClick={handleGoHome}
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
          >
            <Home size={20} />
            <span>ホームに戻る</span>
          </button>
        </div>

        {/* イラスト的な装飾 */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
