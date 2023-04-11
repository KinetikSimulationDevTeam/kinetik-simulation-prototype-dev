import React, { useState, useEffect } from 'react';
import MyResponsiveBar from './SimulationBarChart';

const Scoreboard = ({ lambdaOutput }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [largestValue, setLargestValue] = useState(100);

    useEffect(() => {
        const newFilteredData = [];
        if(lambdaOutput === undefined) return;
        for (let i = 0; i < lambdaOutput.length; i++) {
            if (i % 13 === 0) {
                const winObj = lambdaOutput[i].find(obj => obj.Stage === "Win");
                const lossObj = lambdaOutput[i].find(obj => obj.Stage === "Loss");
                const winStage = `Win-Q${(i/13)+1}`;
                const lossStage = `Loss-Q${(i/13)+1}`;
                const modifiedWinObj = { Stage: winStage, values: winObj.values };
                const modifiedLossObj = { Stage: lossStage, values: lossObj.values };
                newFilteredData.push(modifiedWinObj);
                newFilteredData.push(modifiedLossObj);
            }
        }
        setFilteredData(newFilteredData);

        let largestValue = 0;
        for (let i = 0; i < filteredData.length; i++) {
            const value = filteredData[i].values;
            console.log(value);
            if (value > largestValue) {
                largestValue = value;
            }
        }
        setLargestValue(largestValue);
    }, [lambdaOutput]);

    return (
        <div id='scoreboard-layout'>
            <h3> Scoreboard </h3>
            <div id='scoreboard-graph'>
                <MyResponsiveBar data={filteredData} largestValue={largestValue}/>
            </div>
        </div>
    )
}

export default Scoreboard
