import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './app/pages/Dashboard'
import Login from './app/pages/Login'
import Register from './app/pages/Register'
import Navbar from './app/components/Navbar/Navbar'

function App() {
    return (
        <>
            <Router>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    )
}

export default App
