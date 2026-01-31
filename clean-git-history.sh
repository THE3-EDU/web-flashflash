#!/bin/bash

# 清理 git 历史中的 node_modules 和大文件
# 使用方法: bash clean-git-history.sh

echo "开始清理 git 历史..."

# 1. 确保 .gitignore 包含 node_modules
if ! grep -q "node_modules" .gitignore 2>/dev/null; then
    echo "node_modules" >> .gitignore
fi

# 2. 从 git 历史中移除 node_modules
echo "从 git 历史中移除 node_modules..."
git filter-branch --force --index-filter \
  "git rm -rf --cached --ignore-unmatch node_modules" \
  --prune-empty --tag-name-filter cat -- --all

# 3. 从 git 历史中移除大文件（超过 50MB）
echo "从 git 历史中移除大文件..."
git filter-branch --force --index-filter \
  "git rm -rf --cached --ignore-unmatch 'node_modules/@next/swc-darwin-arm64/next-swc.darwin-arm64.node' 'node_modules/@img/sharp-libvips-darwin-arm64/lib/libvips-cpp.8.16.1.dylib' 'public/about/test.png'" \
  --prune-empty --tag-name-filter cat -- --all

# 4. 清理引用
echo "清理引用..."
git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d

# 5. 清理 reflog
echo "清理 reflog..."
git reflog expire --expire=now --all

# 6. 垃圾回收
echo "运行垃圾回收..."
git gc --prune=now --aggressive

echo "清理完成！现在可以尝试推送了。"
echo "运行: git push -u origin main --force"
