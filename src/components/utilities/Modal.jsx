import React, { useState } from 'react'
import '../../styles/utilities/Modal.css'

const Modal = ({ children, isOpen, toggleModal }) => {
    return (
        <div className={`modal ${isOpen ? 'modal--open' : ''}`}>
            <div className="modal-container">
                <button className="modal__close" onClick={toggleModal}>
                    <i className="fa-solid fa-circle-xmark"></i>
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal