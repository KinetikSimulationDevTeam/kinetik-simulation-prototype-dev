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
            <p>Customer Acquisition Cost: {' '}</p>
            <p>Sales Cycle {'('}Weeks{'): '}</p>
            <p className='statistics-module-info-legend'>
                Win Rate:
                <span className='statistics-module-info-values'>
                    {winRate.toLocaleString('en')}%
                </span>
            </p>
            <p>Progression Velocity: {' '}</p>
        </div>
    </div>
  )
}

export default StatisticsTopModule
