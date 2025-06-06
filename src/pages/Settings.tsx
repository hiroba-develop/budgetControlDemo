import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Target,
  Download,
  Trash2,
  Bell,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Award,
} from "lucide-react";

interface UserData {
  nickname: string;
  businessStartDate: string;
  businessType: string;
  monthlyTarget: string;
  monthlyBudget: string;
}

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    nickname: "",
    businessStartDate: "",
    businessType: "",
    monthlyTarget: "",
    monthlyBudget: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState<string>("");
  const [notifications, setNotifications] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    // ローカルストレージからユーザーデータを取得
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsEditing(false);
    setEditingField("");
  };

  const handleExportCSV = () => {
    // CSV出力処理
    alert("CSV出力機能は実装予定です");
  };

  const handleDataReset = () => {
    setShowConfirmDialog(true);
  };

  const handleLogout = () => {
    // ログアウト処理
    localStorage.removeItem("isOnboarded");
    navigate("/onboarding");
  };

  const confirmDataReset = () => {
    localStorage.clear();
    navigate("/onboarding");
  };

  const formatCurrency = (value: string) => {
    if (!value) return "";
    const num = parseInt(value);
    return num.toLocaleString("ja-JP");
  };

  const settingSections = [
    {
      title: "プロフィール",
      icon: <User size={20} />,
      items: [
        {
          label: "ニックネーム",
          value: userData.nickname || "未設定",
          field: "nickname",
          editable: true,
        },
        {
          label: "事業開始年月",
          value: userData.businessStartDate || "未設定",
          field: "businessStartDate",
          editable: true,
          type: "month",
        },
        {
          label: "業種",
          value: userData.businessType || "未設定",
          field: "businessType",
          editable: true,
        },
      ],
    },
    {
      title: "目標設定",
      icon: <Target size={20} />,
      items: [
        {
          label: "月間売上目標",
          value: userData.monthlyTarget
            ? `${formatCurrency(userData.monthlyTarget)}円`
            : "未設定",
          field: "monthlyTarget",
          editable: true,
          type: "currency",
        },
        {
          label: "月間経費予算",
          value: userData.monthlyBudget
            ? `${formatCurrency(userData.monthlyBudget)}円`
            : "未設定",
          field: "monthlyBudget",
          editable: true,
          type: "currency",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="text-lg font-bold text-gray-800">設定</h1>
        </div>
      </header>

      <div className="px-4 py-4 space-y-4">
        {/* プロフィール・目標設定セクション */}
        {settingSections.map((section) => (
          <div key={section.title} className="bg-white rounded-lg shadow-sm">
            <div className="px-4 py-3 border-b flex items-center gap-2">
              <div className="text-blue-600">{section.icon}</div>
              <h2 className="font-medium text-gray-800">{section.title}</h2>
            </div>
            <div className="divide-y">
              {section.items.map((item) => (
                <div key={item.field} className="px-4 py-3">
                  {isEditing && editingField === item.field ? (
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">
                        {item.label}
                      </label>
                      {item.type === "currency" ? (
                        <input
                          type="text"
                          value={formatCurrency(
                            userData[item.field as keyof UserData]
                          )}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              [item.field]: e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              ),
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <input
                          type={item.type || "text"}
                          value={userData[item.field as keyof UserData]}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              [item.field]: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          className="px-4 py-1 bg-blue-600 text-white rounded-lg text-sm"
                        >
                          保存
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setEditingField("");
                          }}
                          className="px-4 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm"
                        >
                          キャンセル
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (item.editable) {
                          setIsEditing(true);
                          setEditingField(item.field);
                        }
                      }}
                      className="w-full text-left flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm text-gray-600">{item.label}</p>
                        <p className="font-medium text-gray-800">
                          {item.value}
                        </p>
                      </div>
                      {item.editable && (
                        <ChevronRight size={16} className="text-gray-400" />
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* スキル管理セクション */}
        <div className="bg-white rounded-lg shadow-sm">
          <button
            onClick={() => navigate("/skills")}
            className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Award size={20} className="text-blue-600" />
              <div>
                <p className="font-medium text-gray-800">スキル管理</p>
                <p className="text-sm text-gray-500">
                  あなたのスキルを登録・更新
                </p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>

        {/* データ管理セクション */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-4 py-3 border-b flex items-center gap-2">
            <Download size={20} className="text-blue-600" />
            <h2 className="font-medium text-gray-800">データ管理</h2>
          </div>
          <div className="divide-y">
            <button
              onClick={handleExportCSV}
              className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <span className="text-gray-800">データエクスポート（CSV）</span>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
            <button
              onClick={handleDataReset}
              className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <span className="text-red-600">データリセット</span>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* その他セクション */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="divide-y">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-gray-600" />
                <span className="text-gray-800">通知設定</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <button
              onClick={() => window.open("/help", "_blank")}
              className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <HelpCircle size={20} className="text-gray-600" />
                <span className="text-gray-800">ヘルプ/お問い合わせ</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
            <button
              onClick={() => window.open("/terms", "_blank")}
              className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-gray-600" />
                <span className="text-gray-800">
                  利用規約/プライバシーポリシー
                </span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* ログアウトボタン */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-50 text-red-600 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
        >
          <LogOut size={20} />
          <span>ログアウト</span>
        </button>
      </div>

      {/* 確認ダイアログ */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                データリセット
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              すべてのデータが削除されます。この操作は取り消せません。本当に実行しますか？
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium"
              >
                キャンセル
              </button>
              <button
                onClick={confirmDataReset}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium"
              >
                リセット
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
