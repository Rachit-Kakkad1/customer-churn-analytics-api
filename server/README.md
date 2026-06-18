# 🧠 Customer Churn Analytics - API Engine

[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![Joi](https://img.shields.io/badge/Joi-Validation-blue?style=for-the-badge)](https://joi.dev/)

The backend of the Customer Churn Analytics platform is a robust, production-ready Node.js API designed for high-performance data processing and secure resource management.

---

## 🚀 Core Features

-   🔐 **JWT-Based Auth**: Secure sessions with BcryptJS password hashing and HTTP-only cookie support.
-   📈 **Aggregation Engine**: Uses MongoDB Aggregation Framework for real-time KPI calculations.
-   🔍 **Advanced Querying**: Built-in support for filtering, sorting, pagination, and field projection.
-   🛡️ **Validation Layer**: Strict request body and parameter validation using Joi schemas.
-   🏥 **Health Monitoring**: Integrated `/health` endpoint for uptime tracking.

---

## 🛠 Tech Stack

-   **Framework**: Express.js (v5)
-   **Database**: MongoDB with Mongoose ODM
-   **Security**: JWT, CORS, Dotenv, BcryptJS
-   **Validation**: Joi
-   **Dev Tools**: Nodemon

---

## 📂 Architecture

```text
server/
├── src/
│   ├── config/         # DB connection & environment setup
│   ├── controllers/    # Request handlers (Business Logic)
│   ├── middlewares/    # Auth, Error, Logger, Validation
│   ├── models/         # Mongoose Schemas (Customer, User)
│   ├── routes/         # Express Route definitions
│   ├── services/       # Database & Aggregate logic
│   └── validators/     # Joi validation rules
└── server.js           # Server entry point
```

---

## ⚙️ Environment Configuration

Create a `.env` file in this directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/churnDB
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1d
```

---

## 📖 API Documentation

### **Authentication**
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new admin/user |
| `POST` | `/api/auth/login` | Public | Login & get Bearer Token |
| `GET` | `/api/auth/profile` | Private | Get authenticated user info |
| `GET` | `/api/auth/logout` | Private | Clear active session |

### **Customer Management**
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/customers` | Public | List customers (w/ Filter/Sort) |
| `POST` | `/api/customers` | Private | Create new customer record |
| `GET` | `/api/customers/:id` | Public | Get detailed customer view |
| `PATCH` | `/api/customers/:id` | Private | Update customer metrics |
| `DELETE` | `/api/customers/:id` | Private | Remove customer from DB |

### **Analytics**
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/customers/analytics` | Private | Get aggregated churn stats |

---

## 🔍 Advanced Search Features

The `/api/customers` endpoint supports powerful query params:
-   **Filter**: `?status=active&age[gte]=18`
-   **Sort**: `?sort=-totalSpent,createdAt`
-   **Search**: `?search=John` (matches Name, Email, City)
-   **Paginate**: `?page=1&limit=20`

---

## 🛡 Security & Error Handling

1.  **Authorization**: Middleware ensures only valid JWT holders can access Private routes.
2.  **Global Error Handler**: Standardized JSON responses for all 4xx and 5xx errors.
3.  **Logger**: Detailed request/response logging for production debugging.

```json
{
  "success": false,
  "message": "Resource not found"
}
```

---

## 👨‍💻 Developer Guide

**Install Dependencies:**
```bash
npm install
```

**Development Mode:**
```bash
npm run dev
```

**Production Start:**
```bash
npm start
```
