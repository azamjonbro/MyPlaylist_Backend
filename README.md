🎧 MySpotify-Back
Bu loyiha Express.js asosida yozilgan mini Spotify backend bo‘lib, musiqa fayllarini yuklash, saqlash va ularni JSON faylda boshqarish imkonini beradi.

🛠️ Foydalanish imkoniyatlari:
Qo‘shiq qo‘shish

Qo‘shiq ro‘yxatini olish

Qo‘shiqni ID orqali olish

Qo‘shiq ma’lumotlarini yangilash

Qo‘shiqni o‘chirish

📤 Qo‘shiq yuklash uchun (POST /api/songs)
URL:

bash
Copy
Edit
http://localhost:5000/api/songs
Body turi:
form-data

Kiritilishi kerak bo‘lgan qiymatlar:

Nomi	Turi	Tavsifi
title	Text	Qo‘shiq nomi
artist	Text	Ijrochining ismi
duration	Text/Number	Qo‘shiq davomiyligi (sekundda)
desc	Text	(Ixtiyoriy) Qo‘shiq haqida izoh
cover	File	Rasm fayl (.jpg/.png)
audio	File	Audio fayl (.mp3)