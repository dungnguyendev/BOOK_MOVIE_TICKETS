import React from 'react'

const Loading = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 100, backgroundColor: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center' }}>
            <div className='text-4xl'>Loading...</div>
        </div>
    )
}

export default Loading