#!/bin/bash

# Cursor扩展安装脚本
echo "🚀 开始安装Cursor扩展..."

# 检查Cursor是否已安装
if ! command -v cursor &> /dev/null; then
    echo "❌ Cursor未安装，请先安装Cursor编辑器"
    echo "📥 下载地址: https://cursor.sh/"
    exit 1
fi

# 基础必装扩展
echo "📦 安装基础扩展..."
cursor --install-extension esbenp.prettier-vscode
cursor --install-extension dbaeumer.vscode-eslint
cursor --install-extension ms-vscode.vscode-typescript-next

# React Native相关扩展
echo "⚛️ 安装React Native扩展..."
cursor --install-extension msjsdiag.vscode-react-native
cursor --install-extension formulahendry.auto-rename-tag
cursor --install-extension dsznajder.es7-react-js-snippets
cursor --install-extension bradlc.vscode-tailwindcss

# TypeScript增强扩展
echo "🔷 安装TypeScript扩展..."
cursor --install-extension pmneo.tsimporter
cursor --install-extension ms-vscode.typescript-hero

# 实用工具扩展
echo "🛠️ 安装实用工具扩展..."
cursor --install-extension christian-kohler.path-intellisense
cursor --install-extension formulahendry.auto-close-tag
cursor --install-extension streetsidesoftware.code-spell-checker
cursor --install-extension vscode-icons-team.vscode-icons

# Git相关扩展
echo "📝 安装Git扩展..."
cursor --install-extension eamodio.gitlens
cursor --install-extension donjayamanne.githistory

# 主题扩展（可选）
echo "🎨 安装主题扩展..."
cursor --install-extension GitHub.github-vscode-theme
cursor --install-extension zhuangtongfa.Material-theme

# React Native特定扩展
echo "📱 安装React Native特定扩展..."
cursor --install-extension ms-vscode.vscode-json
cursor --install-extension redhat.vscode-yaml

# AI辅助扩展（Cursor已内置AI，这些是补充）
echo "🤖 安装AI辅助扩展..."
cursor --install-extension github.copilot-chat

echo "✅ Cursor扩展安装完成！"
echo "🔄 请重启Cursor以确保所有扩展正常工作"
echo ""
echo "💡 使用提示："
echo "  - Cmd+S: 保存并自动格式化"
echo "  - Cmd+Shift+P: 打开命令面板"
echo "  - Cmd+K: 打开Cursor AI聊天"
echo "  - Cmd+L: 选择代码并用AI修改"
