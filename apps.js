/* ===== NEXORA – ข้อมูลแอป (แก้ไฟล์นี้เพื่อเพิ่ม/แก้ไขแอป) =====
 * apk: ใส่ลิงก์ดาวน์โหลดตรงของไฟล์ .apk เช่น
 *   https://github.com/USER/REPO/releases/download/v1.0.0/app.apk
 * ถ้าเว้นว่าง "" ปุ่มดาวน์โหลดจะถูกปิดและแสดงว่าไฟล์ยังไม่พร้อม
 * ห้ามใช้ลิงก์ GitHub Actions Artifacts (ต้องล็อกอิน) ให้ใช้ Releases แทน
 * demo: true = ข้อมูลตัวอย่างเท่านั้น (จะมีป้าย Demo)  */
window.NEXORA_CONFIG = {
  developer: { name: "ชื่อผู้พัฒนา (แก้ใน apps.js)", contact: "mailto:you@example.com", contactLabel: "you@example.com" },
  privacyUrl: "#/about", termsUrl: "#/about"
};
window.NEXORA_APPS = [
  {
    id: "demo-toolkit",
    name: "Demo Toolkit",
    category: "Tools",
    icon: "assets/icons/demo.svg",
    short: "แอปตัวอย่างสำหรับทดสอบหน้าเว็บ",
    description: "นี่คือข้อมูลตัวอย่าง (Demo) เพื่อแสดงรูปแบบหน้าเว็บเท่านั้น ยังไม่มีไฟล์ APK จริง ให้แทนที่ด้วยแอปของคุณใน apps.js",
    version: "0.0.1",
    size: "—",
    updated: "2026-10-25",
    minAndroid: "Android 8.0+",
    screenshots: ["assets/screenshots/demo1.svg", "assets/screenshots/demo1.svg"],
    whatsNew: ["ตัวอย่างรายการเปลี่ยนแปลง"],
    apk: "",
    featured: true,
    trending: true,
    demo: true
  }
];
