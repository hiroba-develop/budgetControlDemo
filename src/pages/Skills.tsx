import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  X,
  Star,
  Edit2,
  Briefcase,
  Code,
  Palette,
  TrendingUp,
  Users,
  Megaphone,
  Camera,
  PenTool,
} from "lucide-react";

/**
 * スキルデータの型定義
 * スキルの基本情報と詳細を管理
 */
interface Skill {
  id: string; // スキルの一意識別子
  name: string; // スキル名
  level: number; // スキルレベル（1-5）
  category: string; // カテゴリID
  years: number; // 経験年数
  description?: string; // 説明文（任意）
}

/**
 * スキルカテゴリの型定義
 * カテゴリの表示情報を管理
 */
interface SkillCategory {
  id: string; // カテゴリの一意識別子
  name: string; // カテゴリ名
  icon: React.ReactNode; // アイコンコンポーネント
  color: string; // カテゴリの色設定
}

const skillCategories: SkillCategory[] = [
  {
    id: "business",
    name: "ビジネス",
    icon: <Briefcase size={20} />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "tech",
    name: "テクノロジー",
    icon: <Code size={20} />,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "design",
    name: "デザイン",
    icon: <Palette size={20} />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "marketing",
    name: "マーケティング",
    icon: <Megaphone size={20} />,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "sales",
    name: "営業",
    icon: <TrendingUp size={20} />,
    color: "bg-red-100 text-red-600",
  },
  {
    id: "management",
    name: "マネジメント",
    icon: <Users size={20} />,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "creative",
    name: "クリエイティブ",
    icon: <Camera size={20} />,
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: "other",
    name: "その他",
    icon: <PenTool size={20} />,
    color: "bg-gray-100 text-gray-600",
  },
];

/**
 * スキル管理コンポーネント
 * スキルの一覧表示、追加、編集、削除機能を提供
 * @returns {JSX.Element} スキル管理画面のUI
 */
const Skills: React.FC = () => {
  // ナビゲーション用のフック
  const navigate = useNavigate();

  // スキルデータの状態管理
  const [skills, setSkills] = useState<Skill[]>([]);
  // スキル追加モードの状態管理
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  // 編集中のスキルIDの状態管理
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);

  // 新規スキル用の一時データ
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({
    name: "",
    level: 3,
    category: "",
    years: 0,
    description: "",
  });

  // 編集中のスキルデータ
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  /**
   * コンポーネントのマウント時にローカルストレージからデータを読み込む
   */
  useEffect(() => {
    // ローカルストレージからスキルデータを取得
    const savedSkills = localStorage.getItem("userSkills");
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    }
  }, []);

  /**
   * スキルデータをローカルストレージに保存
   * @param {Skill[]} updatedSkills - 更新後のスキル配列
   */
  const saveSkills = (updatedSkills: Skill[]) => {
    // ローカルストレージに保存
    localStorage.setItem("userSkills", JSON.stringify(updatedSkills));
    // 状態を更新
    setSkills(updatedSkills);
  };

  /**
   * 新規スキルを追加
   * バリデーションと保存処理を実行
   */
  const handleAddSkill = () => {
    // 必須項目のバリデーション
    if (!newSkill.name || !newSkill.category) return;

    // 新規スキルオブジェクトの作成
    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name,
      level: newSkill.level || 3,
      category: newSkill.category,
      years: newSkill.years || 0,
      description: newSkill.description,
    };

    // スキルの保存と入力フォームのリセット
    saveSkills([...skills, skill]);
    setNewSkill({
      name: "",
      level: 3,
      category: "",
      years: 0,
      description: "",
    });
    setIsAddingSkill(false);
  };

  /**
   * 既存のスキルを更新
   * @param {string} skillId - 更新対象のスキルID
   * @param {Partial<Skill>} updatedSkill - 更新するスキルデータ
   */
  const handleUpdateSkill = (skillId: string, updatedSkill: Partial<Skill>) => {
    // 該当スキルの更新
    const updatedSkills = skills.map((skill) =>
      skill.id === skillId ? { ...skill, ...updatedSkill } : skill
    );
    saveSkills(updatedSkills);
    setEditingSkillId(null);
  };

  /**
   * スキルを削除
   * @param {string} skillId - 削除対象のスキルID
   */
  const handleDeleteSkill = (skillId: string) => {
    // 該当スキルを除外した配列を作成
    const updatedSkills = skills.filter((skill) => skill.id !== skillId);
    saveSkills(updatedSkills);
  };

  /**
   * カテゴリ情報を取得
   * @param {string} categoryId - カテゴリID
   * @returns {SkillCategory} カテゴリ情報
   */
  const getCategoryInfo = (categoryId: string) => {
    return (
      skillCategories.find((cat) => cat.id === categoryId) ||
      skillCategories[skillCategories.length - 1]
    );
  };

  /**
   * スキルレベルの星評価を表示
   * @param {number} level - スキルレベル（1-5）
   * @param {boolean} interactive - 編集可能かどうか
   * @param {function} onChange - レベル変更時のコールバック
   * @returns {JSX.Element} 星評価のUI
   */
  const renderStars = (
    level: number,
    interactive = false,
    onChange?: (level: number) => void
  ) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onChange && onChange(star)}
            disabled={!interactive}
            className={`${interactive ? "cursor-pointer" : "cursor-default"}`}
          >
            <Star
              size={20}
              className={
                star <= level
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          </button>
        ))}
      </div>
    );
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const startEditing = (skill: Skill) => {
    setEditingSkillId(skill.id);
    setEditingSkill({ ...skill });
  };

  const handleSave = (skillId: string) => {
    if (editingSkill) {
      handleUpdateSkill(skillId, editingSkill);
      setEditingSkill(null);
      setEditingSkillId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/settings")}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-800">スキル管理</h1>
          {Object.entries(groupedSkills).length === 0 ? (
            <div className="w-8" />
          ) : (
            <button
              onClick={() => setIsAddingSkill(true)}
              className="p-2 -mr-2 rounded-full hover:bg-gray-100"
            >
              <Plus size={20} />
            </button>
          )}
        </div>
      </header>

      <div className="px-4 py-4 space-y-4">
        {/* スキル追加フォーム */}
        {isAddingSkill && (
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-gray-800">
                新しいスキルを追加
              </h2>
              <button
                onClick={() => {
                  setIsAddingSkill(false);
                  setNewSkill({
                    name: "",
                    level: 3,
                    category: "",
                    years: 0,
                    description: "",
                  });
                }}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                スキル名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newSkill.name}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, name: e.target.value })
                }
                placeholder="例：プロジェクトマネジメント"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                カテゴリ <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {skillCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() =>
                      setNewSkill({ ...newSkill, category: category.id })
                    }
                    className={`p-3 rounded-lg border-2 transition-all ${
                      newSkill.category === category.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center mx-auto mb-1`}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                スキルレベル
              </label>
              {renderStars(newSkill.level || 3, true, (level) =>
                setNewSkill({ ...newSkill, level })
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                経験年数
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={newSkill.years}
                  onChange={(e) =>
                    setNewSkill({
                      ...newSkill,
                      years: parseInt(e.target.value) || 0,
                    })
                  }
                  min="0"
                  max="50"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-600">年</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                説明（任意）
              </label>
              <textarea
                value={newSkill.description}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, description: e.target.value })
                }
                placeholder="このスキルについての詳細や実績など"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleAddSkill}
              disabled={!newSkill.name || !newSkill.category}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              追加する
            </button>
          </div>
        )}

        {/* スキル一覧 */}
        {Object.entries(groupedSkills).length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase size={48} className="text-gray-400" />
            </div>
            <p className="text-gray-600 mb-4">スキルがまだ登録されていません</p>
            <button
              onClick={() => setIsAddingSkill(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              スキルを追加する
            </button>
          </div>
        ) : (
          Object.entries(groupedSkills).map(([categoryId, categorySkills]) => {
            const category = getCategoryInfo(categoryId);
            return (
              <div
                key={categoryId}
                className="bg-white rounded-lg shadow-sm p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                </div>
                <div className="space-y-3">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="border-b last:border-0 pb-3 last:pb-0"
                    >
                      {editingSkillId === skill.id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editingSkill?.name || ""}
                            onChange={(e) =>
                              setEditingSkill((prev) =>
                                prev ? { ...prev, name: e.target.value } : null
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="flex items-center justify-between">
                            <div>
                              {renderStars(
                                editingSkill?.level || 3,
                                true,
                                (level) =>
                                  setEditingSkill((prev) =>
                                    prev ? { ...prev, level } : null
                                  )
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={editingSkill?.years || 0}
                                onChange={(e) =>
                                  setEditingSkill((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          years: parseInt(e.target.value) || 0,
                                        }
                                      : null
                                  )
                                }
                                min="0"
                                max="50"
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                              <span className="text-sm text-gray-600">年</span>
                            </div>
                          </div>
                          <textarea
                            value={editingSkill?.description || ""}
                            onChange={(e) =>
                              setEditingSkill((prev) =>
                                prev
                                  ? { ...prev, description: e.target.value }
                                  : null
                              )
                            }
                            placeholder="説明を追加"
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSave(skill.id)}
                              className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                            >
                              保存
                            </button>
                            <button
                              onClick={() => handleDeleteSkill(skill.id)}
                              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100"
                            >
                              削除
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-gray-800">
                                {skill.name}
                              </h4>
                              <span className="text-sm text-gray-500">
                                ({skill.years}年)
                              </span>
                            </div>
                            {renderStars(skill.level)}
                            {skill.description && (
                              <p className="text-sm text-gray-600 mt-2">
                                {skill.description}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => startEditing(skill)}
                            className="p-2 rounded-full hover:bg-gray-100"
                          >
                            <Edit2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Skills;
