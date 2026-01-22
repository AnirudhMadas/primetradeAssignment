✅ TaskFlow — Task Manager App (MERN + Tailwind)

TaskFlow is a full-stack Task Manager application with secure authentication, role-based user profile, and a modern dashboard UI built using Tailwind CSS.
It supports creating, searching, and deleting tasks with a clean REST API integration.

🚀 Features

✅ Authentication

User Register

User Login

JWT Token based authentication

Fetch logged-in user profile using /auth/me

✅ Task Management

Create a new task

View all tasks

Search tasks by title

Delete tasks

✅ Modern UI (Tailwind CSS)

Clean responsive Dashboard UI

Stats cards (Total / Completed / Pending)

Professional Login/Register layout

🛠 Tech Stack

Frontend

React (Vite)

Tailwind CSS

Axios (API calls)

Lucide Icons

Backend

Node.js

Express.js

MongoDB

JWT Authentication

📂 Project Structure

project-root/

├── backend/

│   ├── (Express + MongoDB + JWT APIs)

│

├── frontend/

│   ├── src/

│   │   ├── api/

│   │   ├── components/

│   │   ├── context/

│   │   └── pages/

│   │       ├── Dashboard.jsx

│   │       ├── Login.jsx

│   │       └── Register.jsx

│   ├── tailwind.config.js

│   └── package.json

│

└── README.md


⚙️ Installation & Setup
✅ 1. Clone the repo
git clone <your-repo-url>
cd <your-project-folder>

🖥 Backend Setup
✅ 2. Go to backend folder
cd backend

✅ 3. Install dependencies
npm install

✅ 4. Create .env file inside backend/
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

✅ 5. Start backend server
npm start


Backend will run on:

http://localhost:5000

🌐 Frontend Setup
✅ 6. Go to frontend folder
cd ../frontend

✅ 7. Install dependencies
npm install

✅ 8. Start frontend
npm run dev


Frontend will run on:

http://localhost:5173

🔗 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/auth/register	Register new user
POST	/auth/login	Login user
GET	/auth/me	Get logged in user profile
Task Routes
Method	Endpoint	Description
GET	/tasks	Fetch all tasks
POST	/tasks	Create a new task
DELETE	/tasks/:id	Delete a task
🧪 Usage Flow

Register a new account

Login and receive JWT token

Redirect to Dashboard

Create tasks, search tasks, delete tasks

Logout anytime

📸 Screenshots (Optional)

Add your UI screenshots here:

frontend/src/assets/


Example:

Login Page

Register Page

Dashboard

🔐 Environment Variables Notes

Backend requires:

MONGO_URI

JWT_SECRET

PORT

Frontend should point Axios baseURL to backend server (example: http://localhost:5000)

✅ Future Enhancements

✅ Mark tasks as completed (checkbox)

✅ Edit task feature

✅ Task categories / tags

✅ Drag & Drop Kanban Board

✅ Dark Mode

✅ Task due dates + reminders

👨‍💻 Author

Anirudh Madas
Frontend Developer | MERN Stack Learner 🚀
