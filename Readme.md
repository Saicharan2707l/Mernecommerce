
Start the backend:

```bash
npm start
# or
node index.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

In `frontend/src/common/index.js`, set the backend URL for local development:

```js
const backendDomain = "http://localhost:8000";
```

Start the frontend:

```bash
npm start
```

---

## Deployment

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

## Troubleshooting

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

## Folder Structure
