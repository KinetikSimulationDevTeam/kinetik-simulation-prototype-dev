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
        // get the current quarter and year to display in the x-axis
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();
        let currentQuarter = Math.floor((currentMonth + 3) / 3);

        const newFilteredData = [];
        let previousRevenue = 0;
        if(lambdaOutput === undefined) return;
        for (let i = 1; i <= lambdaOutput.length; i++) {
            // if the current index is a revenue value, add it to the filtered data
            if (i % 13 === 0 && i !== 0) {

                // reset the quarter to 1 and increment the year if the current quarter is greater than 4
                if(currentQuarter > 4) {
                    currentQuarter = 1;
                    currentYear++;
                }

                // get the revenue value and add it to the filtered data
                const revenue = lambdaOutput[i-1].find(obj => obj.Stage === "Revenue");
                // get the quarter and year and add it to the filtered data
                const RevenueQuarter = `Q${currentQuarter++} ${currentYear}`;
                // create a new object with the quarter and revenue value and add it to the filtered data
                const modifiedRevenue = { Stage: RevenueQuarter, values: (revenue.values - previousRevenue).toFixed(2) };
                // update the previous revenue value
                previousRevenue = revenue.values;
                // add the new object to the filtered data
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
