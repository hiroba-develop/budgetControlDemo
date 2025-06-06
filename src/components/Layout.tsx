import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, FileText, Settings as SettingsIcon } from "lucide-react";

const Layout: React.FC = () => {
  const location = useLocation();
  const [showFABMenu, setShowFABMenu] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* メインコンテンツ */}
      <main className="flex-1 pb-16">
        <Outlet />
      </main>

      {/* 下部ナビゲーション */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center justify-center w-full h-full ${
              isActive("/dashboard") ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">ホーム</span>
          </Link>
          <Link
            to="/report"
            className={`flex flex-col items-center justify-center w-full h-full ${
              isActive("/report") ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <FileText size={24} />
            <span className="text-xs mt-1">レポート</span>
          </Link>
          <Link
            to="/settings"
            className={`flex flex-col items-center justify-center w-full h-full ${
              isActive("/settings") ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <SettingsIcon size={24} />
            <span className="text-xs mt-1">設定</span>
          </Link>
        </div>
      </nav>

      {/* フローティングアクションボタン */}
      {/* <div className="fixed bottom-20 right-4 z-50">
        {showFABMenu && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-3 items-end">
            <Link
              to="/income/add"
              className="flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2"
              onClick={() => setShowFABMenu(false)}
            >
              <span className="text-sm font-medium">売上入力</span>
              <div className="bg-orange-500 rounded-full p-2">
                <TrendingUp size={20} className="text-white" />
              </div>
            </Link>
            <Link
              to="/expense/add"
              className="flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2"
              onClick={() => setShowFABMenu(false)}
            >
              <span className="text-sm font-medium">経費入力</span>
              <div className="bg-blue-500 rounded-full p-2">
                <Receipt size={20} className="text-white" />
              </div>
            </Link>
          </div>
        )}
        <button
          onClick={() => setShowFABMenu(!showFABMenu)}
          className={`bg-blue-600 rounded-full p-4 shadow-lg transition-transform duration-200 ${
            showFABMenu ? "rotate-45" : ""
          }`}
        >
          <Plus size={24} className="text-white" />
        </button>
      </div> */}

      {/* FABメニューの背景 */}
      {showFABMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setShowFABMenu(false)}
        />
      )}
    </div>
  );
};

export default Layout;
