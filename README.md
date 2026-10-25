# NEXORA APP STORE

เปิดในเครื่อง: `python3 -m http.server 8000` แล้วเข้า http://localhost:8000

## เพิ่มแอปใหม่
คัดลอกออบเจ็กต์ใน `apps.js` แล้วแก้ id (ห้ามซ้ำ), name, category (Tools/Games/Productivity/Media/Custom Apps), icon, screenshots, version, size, updated (YYYY-MM-DD), whatsNew และ apk. ลบ `demo: true`

## อัปโหลด APK และเปลี่ยนเวอร์ชัน
1. GitHub → Releases → Draft a new release → ตั้ง tag เช่น v1.0.0 → แนบไฟล์ .apk → Publish
2. คลิกขวาที่ไฟล์ APK ใน Release → คัดลอกลิงก์ (รูปแบบ `https://github.com/USER/REPO/releases/download/v1.0.0/app.apk`)
3. วางใน `apk:` พร้อมอัปเดต version, size, updated, whatsNew
ห้ามใช้ GitHub Actions Artifacts (ต้องล็อกอิน) ถ้า `apk` ว่าง ปุ่มจะถูกปิด

## ขึ้น GitHub Pages
1. สร้าง repo ใหม่แล้วอัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ (index.html ต้องอยู่ราก)
2. Settings → Pages → Source: Deploy from a branch → Branch: main, โฟลเดอร์ / (root) → Save
3. รอ 1–2 นาที เว็บอยู่ที่ `https://USER.github.io/REPO/`
ลิงก์ตรงไปแอป: `.../#/app/ID`
ไม่มี API Key หรือ Secret ในโค้ดฝั่งหน้าเว็บ
