#!/bin/bash
cd /workspace || cd "$(dirname "$0")"
if curl -s -o /dev/null -w '' http://127.0.0.1:8080/ 2>/dev/null; then
  echo "Server already running on :8080"
  exit 0
fi
npm run dev &
sleep 5
echo "Dev server started"
