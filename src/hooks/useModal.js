import { useState } from "react"

export const useModal = (initialValue = false) => {
    const [isOpen, setIsOpen] = useState(initialValue)
    const toggleModal = () => setIsOpen(!isOpen)

    return [isOpen, toggleModal]
}