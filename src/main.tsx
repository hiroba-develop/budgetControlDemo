import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

/**
 * アプリケーションのエントリーポイント
 * Reactアプリケーションをルート要素にマウントする
 */

// ルート要素の取得とReactルートの作成
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// アプリケーションのレンダリング
// StrictModeで開発時の潜在的な問題を検出
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
