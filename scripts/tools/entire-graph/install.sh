#!/usr/bin/env bash
# GIONG VN — GĐ 602 (PA-2 ĐH chốt 31/10/2026): cài entire-graph cho repo HIỆN TẠI.
#
# Làm 2 việc, đều idempotent (chạy lại vô hại):
#   1. Tải binary release vào <git-common-dir>/giong-tools/entire-graph/bin/
#      (dùng CHUNG mọi worktree của repo; KHÔNG commit vào git — binary 87 MB).
#   2. Cài hook post-commit (prewarm cache chạy nền; backup hook lạ nếu có).
#
# Chạy cho CẢ 2 repo:  bash scripts/tools/entire-graph/install.sh          (app tổng)
#                      (cd giong-apps && bash scripts/tools/entire-graph/install.sh)
# LƯU Ý: repo con chưa có thư mục scripts/tools/entire-graph → copy từ app tổng sang
#        hoặc chạy bản trong app tổng với --repo <đường dẫn repo con>.
set -eu

VER="0.6.0"
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

REPO_ROOT=""
if [ "${1:-}" = "--repo" ] && [ -n "${2:-}" ]; then
  REPO_ROOT="$(cd "$2" && pwd)"
  shift 2
fi

common="$(git -C "${REPO_ROOT:-.}" rev-parse --git-common-dir)"
case "$common" in
  /* | [A-Za-z]:[\\/]*) : ;;
  *) common="$(git -C "${REPO_ROOT:-.}" rev-parse --show-toplevel)/$common" ;;
esac
tools="$common/giong-tools/entire-graph"
bin="$tools/bin/entire-graph.exe"

mkdir -p "$tools/bin" "$tools/cache"

if [ ! -f "$bin" ]; then
  echo "⬇️  Tải entire-graph v$VER (release chính thức) ..."
  tmp="$tools/eg-$VER.zip"
  curl -fsSL -o "$tmp" \
    "https://github.com/entireio/entire-graph/releases/download/v$VER/entire-graph_${VER}_windows_amd64.zip"
  (cd "$tools/bin" && unzip -o "$tmp" entire-graph.exe >/dev/null)
  rm -f "$tmp"
else
  echo "ℹ️  binary đã có: $bin"
fi

# Hook post-commit: cài vào hook dùng chung của repo (mọi worktree hưởng).
hookdir="$common/hooks"
mkdir -p "$hookdir"
dst="$hookdir/post-commit"
if [ -f "$dst" ] && ! grep -q "ENTIRE-GRAPH PREWARM" "$dst" 2>/dev/null; then
  cp "$dst" "$dst.pre602.bak"
  echo "ℹ️  hook post-commit cũ → backup: $dst.pre602.bak"
fi
cp "$here/post-commit" "$dst"
chmod +x "$dst" 2>/dev/null || true

echo "✅ Đã cài entire-graph:"
echo "   binary : $bin ($( "$bin" version 2>/dev/null || echo '?' ))"
echo "   cache  : $tools/cache"
echo "   hook   : $dst (prewarm chạy nền sau mỗi commit)"
echo "   gọi    : bash $here/eg.sh <lệnh> ..."
