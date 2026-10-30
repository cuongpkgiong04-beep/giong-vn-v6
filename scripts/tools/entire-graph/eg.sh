#!/usr/bin/env bash
# GIONG VN — GĐ 602 (PA-2 ĐH chốt 31/10/2026): wrapper entire-graph.
#
# Tự làm 3 việc để agent KHÔNG phải nhớ:
#   1. Tìm binary entire-graph (EG_BIN → .git/giong-tools/ → worktree → PATH).
#   2. Cố định --repo = gốc repo hiện tại.
#   3. Cố định --cache-dir TRONG DỰ ÁN (.git/giong-tools/entire-graph/cache — dùng chung
#      mọi worktree) ⇒ không bao giờ rơi cache vào ổ C (quy tắc 15).
#
# Dùng:
#   bash scripts/tools/entire-graph/eg.sh query --head --format agent --max-context-bytes 4096 --query "..."
#   bash scripts/tools/entire-graph/eg.sh impact --head --symbol <Tên>
#   bash scripts/tools/entire-graph/eg.sh prewarm        # hook post-commit gọi (chạy nền)
set -u

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

common="$(git rev-parse --git-common-dir 2>/dev/null || true)"
if [ -z "$common" ]; then
  echo "❌ eg.sh: không phải git repo" >&2
  exit 2
fi
case "$common" in
  /* | [A-Za-z]:[\\/]*) : ;;                                  # đã là đường dẫn tuyệt đối
  *) common="$(git rev-parse --show-toplevel)/$common" ;;
esac
tools="$common/giong-tools/entire-graph"
cache="$tools/cache"

find_bin() {
  if [ -n "${EG_BIN:-}" ] && [ -f "${EG_BIN}" ]; then printf '%s' "$EG_BIN"; return; fi
  for c in "$tools/bin/entire-graph.exe" "$tools/bin/entire-graph" \
           "$here/bin/entire-graph.exe" "$here/bin/entire-graph"; do
    if [ -f "$c" ]; then printf '%s' "$c"; return; fi
  done
  command -v entire-graph 2>/dev/null || true
}
BIN="$(find_bin)"
if [ -z "$BIN" ]; then
  echo "❌ Chưa có binary entire-graph — chạy: bash \"$here/install.sh\"" >&2
  exit 3
fi

root="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [ -z "$root" ]; then
  echo "❌ eg.sh: không xác định được gốc repo" >&2
  exit 2
fi
mkdir -p "$cache"

sub="${1:-}"

# ── prewarm: hook post-commit gọi sau mỗi commit (chạy NỀN, chống chồng nhau 10 phút) ──
if [ "$sub" = "prewarm" ]; then
  lock="$cache/.prewarm.lock"
  now="$(date +%s)"
  if [ -f "$lock" ]; then
    last="$(stat -c %Y "$lock" 2>/dev/null || echo 0)"
    if [ $((now - last)) -lt 600 ]; then exit 0; fi
  fi
  printf 'boot %s\n' "$now" > "$lock"
  "$BIN" index --repo "$root" --profile full --head --cache-dir "$cache" >>"$cache/prewarm.log" 2>&1
  printf '%s done rc=%s repo=%s\n' "$now" "$(date '+%F %T')" "$root" > "$lock"
  exit 0
fi

# ── lệnh không nhận --repo/--cache-dir → chạy thẳng ──
case "$sub" in
  "" | version | capabilities | doctor | help | agent-guide | setup | stats)
    exec "$BIN" "$@" ;;
esac

args="$*"
add_repo=1;  case "$args" in *--repo*)      add_repo=0 ;; esac
add_cache=1; case "$args" in *--cache-dir*) add_cache=0 ;; esac
# diff/commit/checkpoint/verify không nhận --cache-dir (đo thật trên v0.6.0)
case "$sub" in
  diff | analyze | commit | checkpoint | verify) add_cache=0 ;;
esac

extra=()
[ "$add_repo" = 1 ] && extra+=(--repo "$root")
[ "$add_cache" = 1 ] && extra+=(--cache-dir "$cache")
exec "$BIN" "$@" ${extra[@]+"${extra[@]}"}
