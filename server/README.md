# 📊 Ecommerce Customer Churn Analytics API

A robust Node.js/Express backend designed for high-performance customer data management and behavioral analytics. This API provides advanced querying capabilities, secure authentication, and complex data aggregation for churn prediction.

## 🚀 Features

- **Secure Authentication**: JWT-based auth with password hashing (bcryptjs) and role-based access.
- **Full CRUD Operations**: Managed customer lifecycle with strict Joi validation.
- **Advanced Querying Engine**: Support for MongoDB operators ($gte, $lt), regex search, sorting, and pagination.
- **Aggregation Analytics**: High-level statistical reporting using MongoDB Aggregation Framework.
- **Standardized Middleware**: Integrated logging, error handling, and validation layers.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Validation**: Joi
- **Security**: JWT, BcryptJS, CORS

## 📂 Folder Structure

```text
server/
├── src/
│   ├── config/       # Database & Environment config
│   ├── controllers/  # Request handlers
│   ├── middlewares/  # Auth, Error, Logger, Validation
│   ├── models/       # Mongoose Schemas
│   ├── routes/       # API Route definitions
│   ├── services/     # Business logic & DB queries
│   └── validators/   # Joi validation schemas
└── .env              # Environment variables
```

## ⚙️ Environment Variables

Create a `.env` file in the `server/` root:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/churn-db
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

## 🛠 Installation & Setup

1. **Install Dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Run Locally**:
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

## 📖 API Documentation

### Authentication
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | Public | Create a new user account |
| POST | `/api/auth/login` | Public | Authenticate and receive JWT |
| GET | `/api/auth/profile` | Private | Get current user profile |
| GET | `/api/auth/logout` | Private | Terminate session (client-side cleanup) |

### Customer Management
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| GET | `/api/customers` | Public | List all customers (supports filtering) |
| GET | `/api/customers/:id` | Public | Get specific customer details |
| POST | `/api/customers` | Private | Add a new customer record |
| PATCH | `/api/customers/:id` | Private | Update customer attributes |
| DELETE | `/api/customers/:id` | Private | Remove customer record |

### Analytics & Reports
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| GET | `/api/customers/analytics` | Private | Get aggregated churn & engagement stats |

## 🔍 Query Features

The `/api/customers` endpoint supports advanced MongoDB querying:

- **Filtering**: `/api/customers?country=USA&gender=Male`
- **Operators**: `/api/customers?age[gte]=25&lifetimeValue[lt]=1000`
- **Search**: `/api/customers?search=john` (searches name, email, city, country)
- **Sorting**: `/api/customers?sort=-lifetimeValue` (use `-` for descending)
- **Pagination**: `/api/customers?page=1&limit=10`
- **Projection**: `/api/customers?fields=name,email,churned`

## 🛡 Security & Middleware

- **Auth Middleware**: Validates Bearer tokens in headers.
- **Validation Middleware**: Uses Joi to enforce data integrity before hitting controllers.
- **Error Middleware**: Centralized error formatting for consistent API responses.
- **Logger**: Time-stamped request logging for debugging.

## 📝 Error Format
All errors follow this standard structure:
```json
{
  "success": false,
  "message": "Specific error message here"
}
```

## 👨‍💻 Author
**Rachit Kakkad**
