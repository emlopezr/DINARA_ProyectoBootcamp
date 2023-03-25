import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminPage from '../components/admin/AdminPage'

const AdminRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminPage />} />
            <Route path="/*" element={<Navigate to="/admin" />} />
        </Routes>
    )
}

export default AdminRouter