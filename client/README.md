# 🎨 Customer Churn Analytics - Dashboard UI

[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)

A high-performance, modern analytics dashboard built for real-time visualization of customer churn metrics and behavioral patterns.

---

## ✨ Highlights

-   🌗 **Adaptive Theme**: Full Dark/Light mode support with smooth transitions.
-   📊 **Dynamic Data Viz**: Interactive charts using Recharts for LTV and Churn trends.
-   🎭 **Fluid Animations**: UI powered by Framer Motion for high-impact user experience.
-   🏗️ **State Management**: Centralized store using Redux Toolkit with RTK Query.
-   🔒 **Secure Auth**: Protected routes and automatic token management.

---

## 🛠 Tech Stack

-   **Library**: React 19 (Functional Components + Hooks)
-   **Build Tool**: Vite 8
-   **Styling**: Tailwind CSS 4 & Framer Motion
-   **Routing**: React Router 7
-   **Forms**: React Hook Form + Zod/Joi validation
-   **Toasts**: Sonner
-   **Icons**: Lucide React & React Icons

---

## 📂 Component Architecture

```text
client/
├── src/
│   ├── app/            # Global providers & setup
│   ├── components/     # UI Building Blocks
│   │   ├── auth/       # Login/Register/Social
│   │   ├── customers/  # Tables, Modals, Filters
│   │   ├── dashboard/  # Stats Cards, Charts
│   │   └── ui/         # Base atoms (Bells, Lists)
│   ├── features/       # Redux Slices (Auth)
│   ├── hooks/          # Custom utility hooks
│   ├── layouts/        # Page wrappers (DashboardLayout)
│   ├── pages/          # Full page views (Landing, Profile)
│   ├── services/       # API Integration (Axios)
│   └── store/          # Redux Store configuration
└── vite.config.js      # Build config
```

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Configuration
Ensure the backend API is running. If necessary, update the `VITE_API_URL` in your environment (default is handled in `services/api.js`).

### 3. Development
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🎨 Design System

We use **Tailwind CSS** for a utility-first styling approach, combined with **Framer Motion** for micro-interactions:

-   **Spacing**: Consistent 4px grid.
-   **Typography**: Inter (Modern Sans-serif).
-   **Colors**: Semantic naming (Primary, Success, Danger, Warning).
-   **Feedback**: Sonner for non-intrusive status notifications.

---

## 👨‍💻 Workflow

1.  **Feature Logic**: Define in `features/` slices.
2.  **API Calls**: Centralized in `services/`.
3.  **UI Atoms**: Create in `components/ui/`.
4.  **Complex Views**: Compose in `pages/` using `layouts/`.

---

## 👤 Author

**Rachit Kakkad**
-   GitHub: [@Rachit Kakkad](https://github.com/Rachit-Kakkad1)
-   LinkedIn: [in/rachit-kakkad](http://linkedin.com/in/rachit-kakkad)
