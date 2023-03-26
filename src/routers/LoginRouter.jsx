import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../components/loginView/LoginPage'

const LoginRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
    )
}

export default LoginRouter