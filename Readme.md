# 🗂️ Task Manager API

**Task Manager API** — bu foydalanuvchilar uchun profil va vazifalarni boshqarish imkonini beruvchi backend RESTful API bo‘lib, `Node.js`, `Express` va `Prisma ORM` asosida ishlab chiqilgan. Admin foydalanuvchilar esa barcha foydalanuvchilarni boshqarish huquqiga ega.

---

## ⚙️ Texnologiyalar

| Texnologiya | Tavsif                                         |
| ----------- | ---------------------------------------------- |
| Node.js     | Asosiy platforma                               |
| Express.js  | Routing va middleware arxitekturasi            |
| Prisma ORM  | PostgreSQL bilan ishlovchi ORM                 |
| PostgreSQL  | Ma'lumotlar bazasi                             |
| JWT         | Access va Refresh token bilan autentifikatsiya |
| Joi         | Kiruvchi ma'lumotlarni validatsiya qilish      |
| Nodemailer  | Email orqali OTP yuborish                      |
| NodeCache   | 2 daqiqalik OTP cache saqlovchi xizmat         |
| Cookie      | Refresh tokenni httpOnly cookie orqali saqlash |

---

## 🗂️ Loyiha tuzilmasi

src/
├── config/ # Konfiguratsiya fayllari
├── controllers/ # API controller funksiyalari
├── guards/ # AuthGuard, RoleGuard, SelfGuard
├── helpers/ # Responce va OTP helperlar
├── prisma/ # Prisma client va schema
├── routes/ # Routing fayllari
├── utils/ # Tokenlar va hashing funksiyalari
├── validator/ # JOI validatorlar
└── main.js # Entry point

yaml
Копировать

---

## 🚀 Ishga tushirish bo‘yicha ko‘rsatma

### 1. Reponi klonlash:

```bash
git clone https://github.com/usmonovAbdilaziz/task-manager-api.git
cd task-manager-api
2. Kutubxonalarni o‘rnatish:
bash
Копировать
npm install
3. .env faylni sozlash:
.env.example ni .env deb ko‘chirib oling:

env
Копировать
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
MAIL_USER=your_gmail@gmail.com
MAIL_PASS=your_gmail_app_password
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
4. Prisma migratsiya:
bash
Копировать
npx prisma migrate dev
5. Serverni ishga tushirish:
bash
Копировать
npm run dev
🔐 Autentifikatsiya
Token turi	Amal qilish muddati	Joylashuvi
Access Token	24 soat	Authorization Header (Bearer)
Refresh Token	30 kun	HttpOnly Cookie (secure)

👤 Foydalanuvchi Endpointlari
Method	Endpoint	Tavsif
POST	/auth/register	Ro'yxatdan o'tish
POST	/auth/login	Tizimga kirish (Access + Refresh token)
GET	/auth/me	Profilni olish
PUT	/auth/me	Profilni tahrirlash
POST	/auth/refresh	Access tokenni yangilash
POST	/auth/forgot-password	Emailga OTP yuborish
POST	/auth/reset-password	Yangi parol o‘rnatish

✅ Vazifalar (Tasks)
Method	Endpoint	Tavsif
POST	/tasks	Yangi vazifa yaratish
GET	/tasks	O‘z vazifalarini olish
PUT	/tasks/:id	Vazifani yangilash
DELETE	/tasks/:id	Vazifani o‘chirish

⚠️ Foydalanuvchi faqat o‘zining tasklarini ko‘rishi, tahrirlashi va o‘chira oladi.

🛡️ Admin Endpointlari
Method	Endpoint	Tavsif
GET	/admin/users	Barcha foydalanuvchilar ro‘yxati
GET	/admin/users/:id	ID orqali user ma'lumotlari
PUT	/admin/users/:id	User ma'lumotlarini tahrirlash
DELETE	/admin/users/:id	Userni o‘chirish
GET	/admin/stats	Umumiy statistik ma’lumotlar

🧪 Postman
Postman collection: postman_collection.json

Auth endpoints uchun Cookie va Bearer token qo‘shilishi kerak.

🛡️ Ruxsatlar
Ruxsatlar	Tizimdagi imkoniyatlar
user	Faqat o‘z profil va tasklarini ko‘rish/yangilash
admin	Barcha userlar va tasklarni boshqarish huquqi

✅ Bonuslar
 JWT Access & Refresh token

 Parol tiklash email orqali (OTP)

 Route himoyalari: AuthGuard, RoleGuard, SelfGuard

 Cookie orqali refresh token saqlash

 Task egalik tekshiruvi

📄 Litsenziya
Ushbu loyiha ochiq manbali  bo‘lib, xohlagan tarzda o‘zgartirishingiz va foydalanishingiz mumkin.

🤝 Muallif
👤 Abdilaziz Usmonov

📧 Gmail abdilazizusmonov993@gmail.com

🌐 GitHub: https://github.com/usmonovAbdilaziz
```
