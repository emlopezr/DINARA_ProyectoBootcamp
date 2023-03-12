import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import StudentPage from '../components/student/StudentPage'

const StudentRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<StudentPage />} />
            <Route path="/*" element={<Navigate to="/student" />} />
        </Routes>
    )
}

export default StudentRouter