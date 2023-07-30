import React, { useState, useEffect } from 'react';
import MyResponsiveScoreBoard from '../Components/ScoreboardComponents/ScoreboardBarChart';
import Select from 'react-select';

/*
    Description: This component is used to display the scoreboard.

    Arguments: lambdaOutput: the data that is passed into the bar chart component

    Return Type: None
*/
const Scoreboard = ({ lambdaOutput }) => {
    //This state variable is used to keep track of the data that is passed into the bar chart component. It is initialized with a default value of [[]].
    const [filteredData, setFilteredData] = useState([]);
    //This state variable is used to keep track of the time frame that the user has selected. It is initialized with a default value of '13'.
    const [timeFrame, setTimeFrame] = useState('13');

    const dropdownOptions = [
        { value: "4", label: "Monthly" },
        { value: "13", label: "Quarterly" }
    ]

    const monthList = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"
    ]

    const handleTimeFrameChange = (choice) => {
        setTimeFrame(choice.value);
    }

    /*
        Description: This function parsed the result from the lambda
                     function and sets the filteredData state with the data that will be passed into the bar chart component.

        Arguments: None

        Return Type: None
    */
    useEffect(() => {
        if(lambdaOutput === undefined) return;
        const data = lambdaOutput.map((array) =>
            array.slice(0, -3)
        );
        // get the current quarter and year to display in the x-axis
        const currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();
        let currentQuarter = Math.floor((currentMonth + 3) / 3);

        const newFilteredData = [];
        let previousRevenue = 0;
        for (let i = 1; i <= data.length; i++) {
            // if the current index is a revenue value, add it to the filtered data
            if (i % timeFrame === 0 && i !== 0) {

                // reset the quarter to 1 and increment the year if the current quarter is greater than 4
                if(currentQuarter > 4) {
                    currentQuarter = 1;
                    currentYear++;
                }else if(currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }

                // get the revenue value and add it to the filtered data
                const revenue = lambdaOutput[i-1].find(obj => obj.Stage === "Revenue");

                // create a new object with the quarter and revenue value and add it to the filtered data
                let revenueDate = '';

                // if the time frame is monthly, add the revenue value to the filtered data
                if(timeFrame === '4') {
                    // get the month and year and add it to the filtered data
                    revenueDate = `${monthList[currentMonth++]} ${currentYear}`;
                }else if(timeFrame === '13') {
                    //if the time frame is quarterly, add the revenue value to the filtered data
                    // get the quarter and year and add it to the filtered data
                    revenueDate = `Q${currentQuarter++} ${currentYear}`;
                }

                // create a new object with the quarter and revenue value and add it to the filtered data
                const modifiedRevenue = { Stage: revenueDate, values: timeFrame === '13' ? (revenue.values - previousRevenue).toFixed(2) : (revenue.values - previousRevenue).toFixed(0)};
                // update the previous revenue value
                previousRevenue = revenue.values;
                // add the new object to the filtered data
                newFilteredData.push(modifiedRevenue);
            }
        }
        setFilteredData(newFilteredData);
    }, [lambdaOutput, timeFrame]);

    return (
        <div id='scoreboard-layout'>
            <div id='scoreboard-top-layout'>
                <h3 className='title'> Scoreboard </h3>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={dropdownOptions[1]}
                    name="Time Frame"
                    options={dropdownOptions}
                    onChange={(choice) => handleTimeFrameChange(choice)}
                />
            </div>
            <div id='scoreboard-graph'>
                <MyResponsiveScoreBoard data={filteredData}/>
            </div>
        </div>
    )
}

export default Scoreboard
