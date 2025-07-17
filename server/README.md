
---

##  `server/README.md`

```md
# Server - Node.js Backend

Handles user authentication and expense data management.

# 🌐 API Endpoints

| Method | Endpoint      | Description             |
| ------ | ------------- | ----------------------- |
| POST   | /register     | Register a new user     |
| POST   | /login        | Log in existing user    |
| POST   | /add-expense  | Add a new expense       |
| GET    | /get-expenses | Fetch all user expenses |
| POST   | /logout       | Clear cookie and logout |

# 🧠 Middleware

- JWT-based token validation
- Cookie parser
- CORS and JSON parsing

# 🌍 Environment Variables
- Create a .env file in /server:

- PORT=8080
- MONGO_URI=your_mongo_connection_string
- JWT_SECRET=your_jwt_secret

// example file given in directory


## 🛠️ Setup

```bash
cd server
npm install
npm run dev
