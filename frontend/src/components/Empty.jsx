import React from 'react'

const Empty = ({msg}) => {
    return (
        <div className="flex justify-center items-center h-100 text-red-600">
            <p>{msg}</p>
        </div>
    )
}

export default Empty