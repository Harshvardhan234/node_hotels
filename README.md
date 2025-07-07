🏨 Hotel Management Backend API
This is a practice backend project built using Node.js and Express.js for a hotel management application. It provides RESTful APIs to manage core entities such as menu items and persons (e.g., customers or staff).

📁 Project Navigation Tree (Backend – Hotel App)
![image](https://github.com/user-attachments/assets/08feff9b-ca06-4ad3-a1d8-b7f43c0858b3)

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
