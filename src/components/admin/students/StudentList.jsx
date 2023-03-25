import React from 'react'
import StudentItem from './StudentItem'
import '../../../styles/admin/manageStudents/StudentList.css'

const StudentList = ({ students }) => {
    return (

        <table className='students-table'>
            {
                // TODO: Maybe agregar el campo de tipo documento (llamado a la api para traducir)
            }

            <thead>
                <tr>
                    <th>Nombre completo</th>
                    <th className='mobile-hidden'>Número de documento</th>
                    <th className='mobile-hidden'>Correo electrónico</th>
                    <th className='mobile-hidden'>Teléfono</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {students.map(student => <StudentItem key={student.documentNumber} student={student} />)}
            </tbody>
        </table>
    )
}

export default StudentList