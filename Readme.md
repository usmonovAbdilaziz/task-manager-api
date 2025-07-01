
# Task Manager API

Task Manager API bu foydalanuvchilar uchun profil va vazifalarni boshqarish imkonini beruvchi NodeJS + Express asosidagi backend loyiha hisoblanadi. Admin foydalanuvchilar esa barcha userlarni boshqarish huquqiga ega.

## 📌 Texnologiyalar
- **Platforma:** Node.js + Express
- **ORM:** Prisma
- **Ma'lumotlar bazasi:** PostgreSQL
- **Autentifikatsiya:** JWT (Access va Refresh token) + Cookie
- **Validatsiya:** Joi
- **Email xizmati:** Nodemailer (Gmail SMTP, port 465)
- **Route himoyasi:** Middleware / Guards
- **Postman collection:** Mavjud

## 📁 Loyiha strukturasi
```
src/
├── config/
├── controller/
├── guards/
├── helpers/
├── prisma/
├── routes/
├── utils/
├── validator/
├── main.js
└── services.js
```

## 🚀 Loyihani ishga tushirish

### 1. Reponi klonlash:
```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
```

### 2. Bog'lanishlar va kutubxonalarni o'rnatish:
```bash
npm install
```

### 3. .env faylni sozlash:
`.env.example` faylini nusxa olib `.env` deb nomlang va kerakli qiymatlarni to‘ldiring:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
MAIL_USER=your_gmail@gmail.com
MAIL_PASS=your_gmail_app_password
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
```

### 4. Prisma migratsiyasini bajarish:
```bash
npx prisma migrate dev
```

### 5. Loyihani ishga tushirish:
```bash
npm run dev
```

Server: [http://localhost:3000](http://localhost:3000)

## 🔐 Autentifikatsiya
- Access Token: 24 soat amal qiladi
- Refresh Token: 30 kun amal qiladi
- Har ikki token `HttpOnly Cookie`da saqlanadi

## 👤 Foydalanuvchi Endpointlari
| Method | Endpoint              | Tavsif                           |
|--------|------------------------|----------------------------------|
| POST   | /auth/register         | Ro'yxatdan o'tish                |
| POST   | /auth/login            | Login + Access/Refresh token     |
| GET    | /auth/me               | Profil ma'lumotlarini olish      |
| PUT    | /auth/me               | Profilni tahrirlash              |
| POST   | /auth/refresh          | Access tokenni yangilash         |
| POST   | /auth/forgot-password  | Parol tiklash email yuborish     |
| POST   | /auth/reset-password   | Yangi parol o'rnatish            |

## ✅ Vazifalar (Tasks)
| Method | Endpoint   | Tavsif                      |
|--------|------------|-----------------------------|
| POST   | /tasks     | Yangi vazifa yaratish       |
| GET    | /tasks     | Foydalanuvchining vazifalari |

## 🛠️ Admin Endpointlari
| Method | Endpoint             | Tavsif                         |
|--------|----------------------|--------------------------------|
| GET    | /admin/users         | Barcha foydalanuvchilar ro'yxati |
| GET    | /admin/users/:id     | ID bo‘yicha user olish         |
| PUT    | /admin/users/:id     | User ma'lumotlarini tahrirlash |
| DELETE | /admin/users/:id     | Userni o‘chirish               |

## 📦 Postman
Postman kolleksiya: [`postman_collection.json`](./postman_collection.json) (repo ichida bo'lishi kerak)

## 🛡️ Ruxsatlar
- Ro‘yxatdan o‘tganda default `user` roli beriladi
- Faqat `admin` foydalanuvchilar boshqa userlarni boshqarishi mumkin

## 🏁 Bonuslar
- [x] Refresh token funksiyasi
- [x] Parolni tiklash email orqali
- [x] Himoyalangan route'lar va middleware

## 📄 Litsenziya
Ushbu loyiha ochiq manbali va o‘zingizning ehtiyojlaringizga moslashtirishingiz mumkin.
