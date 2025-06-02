#!/bin/bash

# VS Code扩展安装脚本
echo "🚀 开始安装VS Code扩展..."

# 基础必装扩展
echo "📦 安装基础扩展..."
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension pmneo.tsimporter
code --install-extension ms-vscode.vscode-typescript-next

# React Native相关扩展
echo "⚛️ 安装React Native扩展..."
code --install-extension msjsdiag.vscode-react-native
code --install-extension formulahendry.auto-rename-tag
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension bradlc.vscode-tailwindcss

# 实用工具扩展
echo "🛠️ 安装实用工具扩展..."
code --install-extension christian-kohler.path-intellisense
code --install-extension formulahendry.auto-close-tag
code --install-extension streetsidesoftware.code-spell-checker
code --install-extension vscode-icons-team.vscode-icons
code --install-extension ms-vscode.vscode-json

# Git相关扩展
echo "📝 安装Git扩展..."
code --install-extension eamodio.gitlens
code --install-extension donjayamanne.githistory

# 主题扩展（可选）
echo "🎨 安装主题扩展..."
code --install-extension GitHub.github-vscode-theme
code --install-extension zhuangtongfa.Material-theme

echo "✅ VS Code扩展安装完成！"
echo "🔄 请重启VS Code以确保所有扩展正常工作"
