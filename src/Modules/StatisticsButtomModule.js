import React, {useState, useEffect} from 'react'

const StatisticsButtomModule = ({ lambdaOutput }) => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [newLeads, setNewLeads] = useState(0);
    const [newOpportunities, setNewOpportunities] = useState(0);
    const [wins, setWins] = useState(0);

    useEffect(() => {
        if (lambdaOutput === undefined) return;
        setTotalRevenue(lambdaOutput[lambdaOutput.length - 1].find(obj => obj.Stage === "Revenue").values);
        setWins(Math.round(lambdaOutput[lambdaOutput.length - 1].find(obj => obj.Stage === "Win").values));
    }, [lambdaOutput]);

    return (
        <div id='statistics-buttom-module-layout'>
        <h3 className='title'>Statistics</h3>
            <div className='statistics-module-info'>
                <p className='statistics-module-info-legend'>
                    Total Revenue: 
                    <p className='statistics-module-info-values'>
                        ${totalRevenue}M
                    </p>
                </p>
                <p>New Leads: {' '}</p>
                <p>New Opportunities: {' '}</p>
                <p className='statistics-module-info-legend'>
                    Wins:
                    <p className='statistics-module-info-values'>
                        {wins}
                    </p>
                </p>
            </div>
        </div>
    )
}

export default StatisticsButtomModule
