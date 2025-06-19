
## Folder Structure

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd EcommerceApplication
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend` (for local development):
MONGODB_URL=your_mongodb_connection_string
TOKEN_SECRET_KEY=your_jwt_secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development

Start the backend server:

```bash
npm start
# or
node index.js
```

The backend will run on [http://localhost:8000](http://localhost:8000) by default.

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

In `frontend/src/common/index.js`, set the backend URL for local development:

```js
const backendDomain = "http://localhost:8000";
```

Start the frontend server:

```bash
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000) by default.

---

## 🏗️ Deployment

### Frontend (Vercel)

- Push your frontend code to GitHub.
- Import the repo in Vercel.
- In `frontend/src/common/index.js`, set:
  ```js
  const backendDomain = "https://mernecommerce-kmbn.onrender.com";
  ```
- Redeploy on Vercel.

### Backend (Render)

- Push your backend code to GitHub.
- Create a new Web Service on Render.
- Set environment variables in the Render dashboard:
  ```
  MONGODB_URL=your_mongodb_connection_string
  TOKEN_SECRET_KEY=your_jwt_secret
  FRONTEND_URL=https://ecommerce-three-psi-88.vercel.app
  NODE_ENV=production
  ```
- Deploy.

---

## 🧩 Common Commands

### Backend

- `npm install` — Install backend dependencies
- `npm start` — Start backend server

### Frontend

- `npm install` — Install frontend dependencies
- `npm start` — Start frontend development server
- `npm run build` — Build frontend for production

---

## 🐞 Troubleshooting

- **Login works locally but not in production:**  
  - Ensure `FRONTEND_URL` and `NODE_ENV` are set correctly in Render.
  - Set `sameSite: "none"` in cookie options in backend.
  - Use `credentials: 'include'` in all frontend fetch/axios calls.

- **CORS errors:**  
  - Make sure backend CORS `origin` matches your deployed frontend URL exactly (no trailing slash).

- **401 Unauthorized after login:**  
  - Check cookies are being set and sent in browser dev tools.
  - Ensure both frontend and backend are using HTTPS in production.

---


## 📜 License

MIT

---

## 🙏 Acknowledgements

- [Create React App](https://github.com/facebook/create-react-app)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Vercel](https://vercel.com/)
- [Render](https://render.com/)

---
