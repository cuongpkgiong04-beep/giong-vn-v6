# -*- coding: utf-8 -*-
"""GĐ 587/588 — kiểm tra MISA gửi OTP qua KÊNH NÀO (email hay SMS) + thử đăng nhập tự động.

Chạy tại thư mục agent (máy LAN hoặc máy chủ): python _gd588_kiem_tra_otp.py
Không in mật khẩu; chỉ in cấu trúc phản hồi (đã che số điện thoại/email) + kết quả đăng nhập.
"""
import json
import os
import pathlib
import re
import sys
import urllib.request

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import misa_http_login as hl  # noqa: E402

user = os.environ.get("MISA_USER") or hl._read_secret("MISA_USER")
pw = os.environ.get("MISA_PASS") or hl._read_secret("MISA_PASS")
print("MISA_USER =", user, "| có mật khẩu:", bool(pw))

# --- 1) hỏi MISA: OTP gửi qua đâu? ---
body = json.dumps({"UserName": user, "Password": pw}).encode()
req = urllib.request.Request(f"{hl.AMIS}/APIS/AuthenAPI/api/Account/login",
                             data=body, method="POST",
                             headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req, timeout=60) as r:
    j = json.loads(r.read().decode("utf-8", "replace"))
data = j.get("Data") or {}
print("Success =", j.get("Success"), "| Code =", j.get("Code"))
print("UserMessage:", re.sub(r"\d{6,}", lambda m: m.group(0)[:3] + "***", str(j.get("UserMessage"))[:160]))
print("UseEmail =", data.get("UseEmail"), "· UsePhoneNumber =", data.get("UsePhoneNumber"),
      "· UseAppAuthenticator =", data.get("UseAppAuthenticator"))

# --- 2) nếu qua EMAIL → thử đăng nhập tự động thật (đọc mã từ Gmail) ---
if data.get("UseEmail"):
    print("\n→ MISA báo gửi mã qua EMAIL — thử đăng nhập tự động:")
    try:
        s = hl.login(user, pw, log=print)
        print(f">>> ĐĂNG NHẬP TỰ ĐỘNG OK · phiên hạn {s.seconds_left() / 3600:.2f} giờ")
        hl.save_session(s)
        print(">>> ĐÃ LƯU phiên HTTP:", hl.STATE_FILE)
    except Exception as e:
        print(">>> ĐĂNG NHẬP TỰ ĐỘNG LỖI:", type(e).__name__, str(e)[:200])
elif data.get("UsePhoneNumber"):
    print("\n→ VẪN GỬI QUA SMS (chưa thấy email) — kiểm lại giúp Đại Ca.")
else:
    print("\n→ MISA không yêu cầu OTP cho lượt này (đăng nhập thẳng).")
