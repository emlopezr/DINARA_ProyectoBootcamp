import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminMenu from '../components/admin/AdminMenu'
import AdminStudents from '../components/admin/AdminStudents'
import AdminQuestions from '../components/admin/AdminQuestions'

const AdminRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminMenu />} />
            <Route path="/students" element={<AdminStudents />} />
            <Route path="/questions" element={<AdminQuestions />} />

            <Route path="/*" element={<Navigate to="/admin" />} />
        </Routes>
    )
}

export default AdminRouter