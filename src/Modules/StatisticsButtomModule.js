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

        // add all the opportunities of each week to get the total number of new opportunities
        let totalOpportunities = 0;
        for (let i = 0; i < lambdaOutput.length; i++) {
            totalOpportunities += lambdaOutput[i].find(obj => obj.Stage === "New Opportunities").values;
        }
        setNewOpportunities(Math.round(totalOpportunities));
    }, [lambdaOutput]);

    return (
        <div id='statistics-buttom-module-layout'>
        <h3 className='title'>Statistics</h3>
            <div className='statistics-module-info'>
                <p className='statistics-module-info-legend'>
                    Total Revenue: 
                    <p className='statistics-module-info-values'>
                        ${totalRevenue.toLocaleString('en')}M
                    </p>
                </p>
                <p>New Leads: {' '}</p>
                <p className='statistics-module-info-legend'>
                    New Opportunities:
                    <p className='statistics-module-info-values'>
                        {newOpportunities.toLocaleString('en')}
                    </p>
                </p>
                <p className='statistics-module-info-legend'>
                    Wins:
                    <p className='statistics-module-info-values'>
                        {wins.toLocaleString('en')}
                    </p>
                </p>
            </div>
        </div>
    )
}

export default StatisticsButtomModule
