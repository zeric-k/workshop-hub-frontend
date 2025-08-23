# 🎨 Dance Workshop Frontend

Frontend application for the **Dance Workshop Management Platform**, built with **React**.  
It allows users to register/login, explore workshops & spaces, book sessions, and manage payments.  

🌐 **Live App:** [Dance Workshop Platform](https://victorious-bush-0ba28f000.2.azurestaticapps.net/)  


---

## 🚀 Features
- 🔐 **Authentication** – Register/Login, JWT-based session handling  
- 📅 **Workshops** – Browse, filter by category/level, view details  
- 🏢 **Spaces** – List & manage studio spaces  
- 💳 **Payments** – Book workshops and confirm payments (mocked for demo)  
- 📱 **Responsive UI** – Optimized for desktop & mobile  

---

## 🛠️ Tech Stack
- **React 18** (or Vite/Next.js – update if different)  
- **Axios** for API requests  
- **React Router** for navigation  
- **TailwindCSS / Material UI** for styling (update if using something else)  
- **Backend:** Spring Boot 2 + Azure SQL (see [Backend Repo](../backend))  

---

## 📂 Project Structure
frontend/
├── public/ # Static assets
├── src/
│ ├── api/ # Axios API calls
│ ├── components/ # Reusable UI components
│ ├── pages/ # Pages (Login, Workshops, Spaces, Payments, etc.)
│ ├── hooks/ # Custom hooks
│ ├── App.js # Root app with routes
│ └── index.js # Entry point
├── package.json
└── README.md

yaml
Copy
Edit

---

## ⚙️ Setup & Installation

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/dance-workshop-frontend.git
cd dance-workshop-frontend
2. Install Dependencies
bash
Copy
Edit
npm install
# or
yarn install
3. Configure Environment Variables
Create a .env file in the root:

env
Copy
Edit
REACT_APP_API_BASE_URL=http://localhost:8080
Replace http://localhost:8080 with your deployed backend URL when running in production.

4. Run Locally
bash
Copy
Edit
npm start
Runs on 👉 http://localhost:3000

🔑 API Integration
This frontend communicates with the backend endpoints:

Auth
POST /auth/register → User signup

POST /auth/login → User login

Workshops
GET /api/v1/workshops → List workshops (with filters)

POST /api/v1/workshops → Create a new workshop (admin only)

Spaces
GET /api/v1/spaces → List spaces

POST /api/v1/spaces → Create space

Payments
POST /api/payments/create → Create payment

POST /api/payments/confirm/{paymentId} → Confirm payment

GET /api/payments/user/{userId} → User’s payment history

📦 Build for Production
bash
Copy
Edit
npm run build
The production-ready build will be available in the build/ directory.

You can then deploy to Netlify, Vercel, Azure Static Web Apps, or any hosting service.

🌐 Deployment Example (Azure Static Web Apps)
Push your repo to GitHub.

Go to Azure Portal → Static Web Apps → Create resource.

Connect your GitHub repo & branch.

Set build output folder: build

Set environment variable REACT_APP_API_BASE_URL to your backend API URL.

🖼️ Demo Screenshots
(Add screenshots/gifs here after running the app: Login page, Workshop list, Booking flow, Payment confirmation, etc.)

🤝 Contributing
Contributions are welcome! Feel free to fork and create a PR.
