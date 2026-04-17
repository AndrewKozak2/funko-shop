# Funko Shop - Pet Project

Проєкт інтернет-магазину фігурок Funko Pop. Це повноцінний Full-stack додаток із функціоналом для покупців та адміністраторів.

## 🚀 Технологічний стек

### Frontend
- **Framework:** React 19 (Vite, TypeScript)
- **State Management:** Zustand
- **Routing:** React Router DOM v7
- **Forms & Validation:** React Hook Form + Zod
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Styling:** CSS Modules

### Backend
- **Runtime:** Node.js (Express 5)
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT + Bcryptjs
- **File Uploads:** Cloudinary + Multer
- **Email:** Nodemailer

## 📂 Структура проєкту

### Frontend (`/src`)
- `components/`: Багаторазові UI компоненти (Header, Footer, ProductCard, Cart тощо).
- `pages/`: Основні сторінки додатку та адміністративна панель.
- `store/`: Zustand-сховища (auth, cart, product, wishlist).
- `hooks/`: Кастомні React хуки.
- `services/`: Клієнти для зовнішніх API (наприклад, Nova Poshta).
- `types/`: Описи TypeScript інтерфейсів.

### Backend (`/server`)
- `models/`: Схеми Mongoose (User, Product, Order, PromoCode).
- `controllers/`: Логіка обробки запитів.
- `routes/`: Опис API ендпоінтів.
- `middleware/`: Перевірка авторизації та прав доступу.
- `utils/`: Допоміжні функції (відправка email).

## 🛠 Ключовий функціонал

1.  **Каталог:** Фільтрація, пошук та перегляд деталей товару.
2.  **Кошик та Wishlist:** Збереження обраних товарів у Zustand та LocalStorage.
3.  **Авторизація:** Реєстрація, логін, відновлення пароля через email та верифікація.
4.  **Оформлення замовлення:** Інтеграція з API Нової Пошти (вибір відділень).
5.  **Адмін-панель:** Управління товарами (CRUD, завантаження фото в Cloudinary), замовленнями та промокодами.
6.  **Промокоди:** Система знижок на замовлення.

## 📝 Гайдлайни для розробки

- **Компоненти:** Використовувати функціональні компоненти з TypeScript.
- **Стилізація:** Нові стилі додавати через CSS Modules (`*.module.css`).
- **Стан:** Глобальний стан — Zustand, локальний — `useState`.
- **API:** Всі запити до сервера робити через асинхронні функції в контролерах або сервісах.
- **Безпека:** Секретні ключі тримати в `.env`.

## ⚙️ Налаштування оточення

Створіть `.env` файл у папці `server/`:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=name
CLOUDINARY_API_KEY=key
CLOUDINARY_API_SECRET=secret
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
```
# Як ти маєш мені допомагати (Правила CLI)

Я Junior-розробник. Твоя задача — бути моїм Senior-ментором:

1. Допомагай писати код, але обов'язково пояснюй логіку. Ніколи не давай повністю готовий код для сліпого копіювання.
2. Пиши якісний код: використовуй строгу типізацію, правильні інтерфейси TypeScript та сучасні підходи.
3. Якщо я пишу щось неоптимально — виправляй мене і пояснюй, чому твій варіант кращий. Залишай мені простір для самостійного написання логіки.
4. не вставляєш ніякий код, тільки скидаєш в чат