import React, { useState, useEffect } from 'react';
import MyResponsiveScoreBoard from '../Components/ScoreboardComponents/ScoreboardBarChart';

/*
    Description: This component is used to display the scoreboard.

    Arguments: lambdaOutput: the data that is passed into the bar chart component

    Return Type: None
*/
const Scoreboard = ({ lambdaOutput }) => {
    //This state variable is used to keep track of the data that is passed into the bar chart component. It is initialized with a default value of [[]].
    const [filteredData, setFilteredData] = useState([]);

    /*
        Description: This function parsed the result from the lambda
                     function and sets the filteredData state with the data that will be passed into the bar chart component.

        Arguments: None

        Return Type: None
    */
    useEffect(() => {
        const newFilteredData = [];
        let previousRevenue = 0;
        if(lambdaOutput === undefined) return;
        for (let i = 1; i <= lambdaOutput.length; i++) {
            if (i % 13 === 0 && i !== 0) {
                const revenue = lambdaOutput[i-1].find(obj => obj.Stage === "Revenue");
                const RevenueQuarter = `Quarter ${i/13}`;
                const modifiedRevenue = { Stage: RevenueQuarter, values: (revenue.values - previousRevenue).toFixed(2) };
                previousRevenue = revenue.values;
                newFilteredData.push(modifiedRevenue);
            }
        }
        setFilteredData(newFilteredData);
    }, [lambdaOutput]);

    return (
        <div id='scoreboard-layout'>
            <h3 className='title'> Scoreboard </h3>
            <div id='scoreboard-graph'>
                <MyResponsiveScoreBoard data={filteredData}/>
            </div>
        </div>
    )
}

export default Scoreboard
