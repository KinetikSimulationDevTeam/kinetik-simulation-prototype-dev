import React, { useState, useEffect } from 'react';
import MyResponsiveScoreBoard from './ScoreboardBarChart';

const Scoreboard = ({ lambdaOutput }) => {
    //This state variable is used to keep track of the data that is passed into the bar chart component. It is initialized with a default value of [[]].
    const [filteredData, setFilteredData] = useState([]);

    /*
        Description: This function parsed the result from the lambda function and sets the filteredData state with the data that will be passed into the bar chart component.

        Arguments: None

        Return Type: None
    */
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
