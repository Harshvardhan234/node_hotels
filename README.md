🏨 Hotel Management Backend API
This is a practice backend project built using Node.js and Express.js for a hotel management application. It provides RESTful APIs to manage core entities such as menu items and persons (e.g., customers or staff).

📁 Project Navigation Tree (Backend – Hotel App)
bash
Copy
Edit
Hotel-Backend/
│
├── server.js               # Main entry point
├── db.js                   # MongoDB connection
├── auth.js                 # Auth logic (login/register)
├── jwt.js                  # JWT utilities
├── Menu.js                 # Menu model/controller
├── person.js               # Person model/controller
├── package.json            # Dependencies & scripts
├── .gitignore              # Ignored files
│
├── Routes/                 # API routes
│   ├── menuRoutes.js       # /api/menu endpoints
│   └── personRoutes.js     # /api/person endpoints
│
└── node_modules/           # Auto-generated (on install)

📁 Project Structure
Routes/

menuRoutes.js: Handles all CRUD operations related to hotel menu items.

personRoutes.js: Manages data related to persons (guests, employees, etc.).

Core Files:

Menu.js: Menu model or logic

person.js: Person model or logic

auth.js: Authentication handling (possibly using JWT)

jwt.js: Utility for handling JWT tokens

db.js: MongoDB connection logic

server.js: Main entry point to start the server

🛠️ Features
✅ MongoDB database connection (db.js)

✅ REST APIs for:

Menu management (menuRoutes.js)

Person management (personRoutes.js)

✅ JWT-based authentication

✅ Modular file structure for scalability

✅ .gitignore configured to keep unnecessary files out of version control

🚀 Technologies Used
Node.js

Express.js

MongoDB

Mongoose

JSON Web Tokens (JWT)
