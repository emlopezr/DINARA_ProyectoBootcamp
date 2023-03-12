import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminRouter from './AdminRouter'
import LoginRouter from './LoginRouter'
import StudentRouter from './StudentRouter'

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login/*" element={<LoginRouter />} />
            <Route path="/admin/*" element={<AdminRouter />} />
            <Route path="/student/*" element={<StudentRouter />} />

            <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
    )
}

export default AppRouter