import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/authorization" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<AuthPage />} /> {/* fallback route */}
      </Routes>
    </Router>
  )
}

export default App
