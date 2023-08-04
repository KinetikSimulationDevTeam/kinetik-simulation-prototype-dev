import React, { useState, useEffect } from 'react'

const StatisticsTopModule = ({ lambdaOutput }) => {
    const [customerAcquisitionCost, setCustomerAcquisitionCost] = useState(0);
    const [salesCycle, setSalesCycle] = useState(0);
    const [winRate, setWinRate] = useState(0);  
    const [progressionVelocity, setProgressionVelocity] = useState(0);

    useEffect(() => {
        if (lambdaOutput === undefined) return;
        setWinRate(Math.round(lambdaOutput[lambdaOutput.length - 1].find(obj => obj.Stage === "Win").values / (lambdaOutput[lambdaOutput.length - 1].find(obj => obj.Stage === "Win").values + lambdaOutput[lambdaOutput.length - 1].find(obj => obj.Stage === "Loss").values) * 100));
    }, [lambdaOutput]);

  return (
    <div id='statistics-top-module-layout'>
        <h3 className='title'>Statistics</h3>
        <div className='statistics-module-info'>
            <p className='statistics-module-info-legend'>
                Customer Acquisition Cost:
                <span className='statistics-module-info-values'>
                </span>
            </p>

            <p className='statistics-module-info-legend'>
                Sales Cycle {'('}Weeks{'): '}
                <span className='statistics-module-info-values'>
                </span>
            </p>

            <p className='statistics-module-info-legend'>
                Win Rate:
                <span className='statistics-module-info-values'>
                    {winRate.toLocaleString('en')}%
                </span>
            </p>

            <p>Progression Velocity: {' '}
                <span className='statistics-module-info-values'>
                </span>
            </p>
        </div>
    </div>
  )
}

export default StatisticsTopModule
