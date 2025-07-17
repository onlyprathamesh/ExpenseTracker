
---

## `client/README.md`

```md
# Client - React Frontend

This folder contains the frontend built with React.js and Tailwind CSS.


# 📁 Folder Structure
src/
├── api/             # Axios requests to server
├── components/      # Reusable UI components
├── pages/           # Login, Register, Home
├── App.jsx          # Main app routing

# 🌟 Features
- UI with Tailwind
- Protected Routes using useNavigate
- Modal for adding expense
- Form validations
- Conditional rendering of logout
# 🔐 Authentication
- JWT is stored in cookies. On login/signup, a token is set via HTTP-only cookie from the backend.
# ⚠️ Validations
- Expense form validates amount and category before submission.
- Errors are shown inline; modal stays open if invalid.

# 🛠️ Setup

```bash
cd client
npm install
npm run dev

