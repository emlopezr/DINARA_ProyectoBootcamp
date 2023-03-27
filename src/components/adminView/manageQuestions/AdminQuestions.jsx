import React, { useEffect, useState } from 'react'
import { useModal } from '../../../hooks/useModal'
import Modal from '../../utilities/Modal'
import QuestionList from './QuestionList'
import PageSelector from '../../utilities/PageSelector'
import '../../../styles/adminView/manageQuestions/AdminQuestions.css'
import QuestionCreateModal from './QuestionCreateModal'

const AdminQuestions = ({ userData }) => {
    // Estado para guardar las preguntas recibidas o mensaje de error
    const [questions, setQuestions] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [changes, setChanges] = useState(false)

    // Llamado a la API para conseguir las preguntas guardadas
    useEffect(() => {
        const getQuestions = async () => {
            setLoading(true)

            const apiURL = `http://127.0.0.1:4001/api/v1/form/getquestions`
            const response = await fetch(apiURL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userData?.token}`
                },
            })
            const data = await response.json();
            setLoading(false)

            // Manejo de peticiones sin autorización
            if (data?.message !== 'Falló la autenticación del token.') {
                let { questions } = data
                questions = questions.filter(question => question.options.length > 0)

                setQuestions([...questions])
            } else {
                setError(true)
                setMessage(data?.message)
            }
        }

        getQuestions()
    }, [changes])

    // Funcionalidad de búsqueda de preguntas
    const [inputValue, setInputValue] = useState('')
    const onClearInput = () => setInputValue('')

    // Manejo de eventos para la búsqueda
    let filteredQuestions = []

    if (inputValue.length > 0) {
        filteredQuestions = questions.filter((question) =>
            question.question.toLowerCase().includes(inputValue.toLowerCase())
        );
    } else {
        filteredQuestions = questions
    }

    // Paginador -> Dividir los estudiantes a mostrar en listas de tamaño 5 y usar el estado para decidir cual mostrar
    const [page, setPage] = useState(0)
    const pageSize = 4
    let tablePages = []

    for (let i = 0; i < filteredQuestions.length; i += pageSize) {
        const page = filteredQuestions.slice(i, i + pageSize)
        tablePages.push(page)
    }

    // Reiniciar la página en caso de búsqueda para evitar errores
    useEffect(() => {
        setPage(0)
    }, [inputValue])

    // Uso de las ventanas modales
    const [isOpenModalCreate, toggleModalCreate] = useModal(false)
    const [isOpenModalEdit, toggleModalEdit] = useModal(false)
    const [dataModal, setDataModal] = useState({})

    return (
        <div className='admin-content-questions'>
            <h2 className="admin-content__title">Administrar preguntas</h2>

            {!error && !loading &&
                <>
                    {/* Funcionalidad de búsqueda */}
                    <div className="search-bar-questions">
                        <label htmlFor="nombre">Nombre de la pregunta</label>
                        <input
                            type="text" name='nombre'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />

                        <button
                            className="clear-inputs"
                            onClick={onClearInput}
                        >
                            Limpiar campo
                        </button>
                    </div>

                    {(filteredQuestions.length > 0) &&
                        <>
                            <div className="admin-questions__list">
                                <QuestionList
                                    questions={tablePages[page] || []}
                                    toggleModalEdit={toggleModalEdit}
                                    setDataModal={setDataModal}
                                    setChanges={setChanges}
                                    setError={setError}
                                    setMessage={setMessage}
                                    userData={userData}
                                />
                            </div>

                            <PageSelector
                                pages={tablePages.length}
                                page={page}
                                setPage={setPage}
                            />
                        </>
                    }

                    {(filteredQuestions.length === 0) &&
                        <div className="error-alert">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            No hay preguntas registradas en la aplicación o los criterios de búsqueda no encontraron resultados
                        </div>
                    }

                    <button
                        className="create-question"
                        onClick={toggleModalCreate}
                    >
                        Crear una nueva pregunta
                    </button>
                </>
            }

            {
                error && !loading &&
                <div className="error-alert">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span>Ha ocurrido un error:</span> "{message}", por favor reinicia tu sesión para arreglarlo
                </div>
            }

            {
                loading &&
                <div className="loading-state">
                    <span className="users-loader"></span>
                </div>
            }



            {/* Modal de edición de usuario */}
            <Modal isOpen={isOpenModalEdit} toggleModal={toggleModalEdit}>
                {/* <StudentEditModal
                    dataModal={dataModal}
                    toggleModal={toggleModalEdit}
                    setChanges={setChanges}
                    isOpenModalEdit={isOpenModalEdit}
                /> */}
            </Modal>

            {/* Modal de creación de usuario */}
            <Modal isOpen={isOpenModalCreate} toggleModal={toggleModalCreate}>
                <QuestionCreateModal
                    toggleModal={toggleModalCreate}
                    setChanges={setChanges}
                    isOpenModalCreate={isOpenModalCreate}
                />
            </Modal>
        </div >
    )
}

export default AdminQuestions