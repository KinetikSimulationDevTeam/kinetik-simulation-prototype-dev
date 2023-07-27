import React from 'react'

const StatisticsTopModule = () => {
  return (
    <div id='statistics-top-module-layout'>
        <h3 className='title'>Statistics</h3>
        <div className='statistics-module-info'>
            <p>Customer Acquisition Cost: {' '}</p>
            <p>Sales Cycle {'('}Weeks{'): '}</p>
            <p>Win Rate: {' '}</p>
            <p>Progression Velocity: {' '}</p>
        </div>
    </div>
  )
}

export default StatisticsTopModule
