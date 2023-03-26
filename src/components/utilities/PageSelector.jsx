import React from 'react'
import '../../styles/utilities/PageSelector.css'

const PageSelector = ({ pages, page, setPage }) => {
    const numbers = [...Array(pages).keys()]

    const onChangePage = (number) => setPage(number)

    return (
        <div className='page-selector'>
            {numbers.map(number => (
                <div
                    key={number}
                    className={`page ${page === number ? 'page--selected' : ''}`}
                    onClick={() => onChangePage(number)}
                >
                    {number + 1}
                </div>
            ))}
        </div>
    )
}

export default PageSelector