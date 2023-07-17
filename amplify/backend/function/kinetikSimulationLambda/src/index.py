import json
import numpy

"""
    Description: This function is used to simulate the movement of opportunities through the sales pipeline 
            by injectin new oportunities from multiple normal distributions each week and redistributing the 
            opportunities in each stage using transition probabilities.
            This is a serverless lambda function that is triggered by a POST request to the API endpoint /simulation.
            The function is written in Python 3.8 and uses the numpy library to generate random numbers from normal distributions.

    Arguments: event - The event that triggered the function, which is a JSON object that contains the body of the request with keys:
                1. weeks - The number of weeks to simulate
                2. ops - The number of opportunities in each stage at the start of the simulation
                3. stages - The stages of the sales pipeline
                4. sources - The sources of the opportunities
                5. means - The means of the normal distributions for each source
                6. stds - The standard deviations of the normal distributions for each source
                7. newOpsProbabilities - The probabilities of new opportunities coming in from each source
                8. opsProbabilities - The probabilities of opportunities moving from each stage to each other stage
                9. sliderValues - The values of the sliders for each source, default is 0

                context - an object that contains information about the invocation, function, and execution environment

    Return Type: A JSON object that contains the body of the response with keys:
                1. statusCode - The status code for the response
                2. headers - The headers for the response
                3. body - The body of the response: a JSON object that contains the number of opportunities in each stage for each week:
                    a. Stage - The stage of the sales pipeline
                    b. values - The number of opportunities in the stage
                4. isBase64Encoded - A boolean that indicates if the body is base64 encoded
"""
def handler(event, context):

    # store body of request in variable
    eventBody = event['body']
    # convert body to JSON object
    body = json.loads(json.loads(eventBody))

    # create 2D array to store data
    data = [[{} for i in range(len(body['stages']))]
                               for j in range(body['weeks'])]
    
    # set slider values
    sliderValues = body['sliderValues']
    
    # set first week to current number of opportunities
    currentNumber = body["ops"]

    # change opsProbabilities to reflect slider values
    # progression slider bar
    # prospecting > Lead Qualification
    currentLeadQualification = body['opsProbabilities'][0][1]
    newLeadQualification = body['opsProbabilities'][0][1] * (1 + sliderValues[2])
    if(body['opsProbabilities'][0][0] - (newLeadQualification - currentLeadQualification) > 0):
        body['opsProbabilities'][0][1] = newLeadQualification
        body['opsProbabilities'][0][0] -= (newLeadQualification - currentLeadQualification)
    else:
        body['opsProbabilities'][0][1] = body['opsProbabilities'][0][1] + body['opsProbabilities'][0][0]
        body['opsProbabilities'][0][0] = 0

    # prospecting > Demo
    currentDemo = body['opsProbabilities'][0][2]
    newDemo = body['opsProbabilities'][0][2] * (1 + sliderValues[2])
    if(body['opsProbabilities'][0][0] - (newDemo - currentDemo) > 0):
        body['opsProbabilities'][0][2] = newDemo
        body['opsProbabilities'][0][0] -= (newDemo - currentDemo)
    else:
        body['opsProbabilities'][0][2] = body['opsProbabilities'][0][2] + body['opsProbabilities'][0][0]
        body['opsProbabilities'][0][0] = 0

    # lead Qualification > Demo
    currentDemo2 = body['opsProbabilities'][1][2]
    newDemo2 = body['opsProbabilities'][1][2] * (1 + sliderValues[2])
    if(body['opsProbabilities'][1][1] - (newDemo2 - currentDemo2) > 0):
        body['opsProbabilities'][1][2] = newDemo2
        body['opsProbabilities'][1][1] -= (newDemo2 - currentDemo2)
    else:
        body['opsProbabilities'][1][2] = body['opsProbabilities'][1][2] + body['opsProbabilities'][1][1]
        body['opsProbabilities'][1][1] = 0

    # lead Qualification > Proposal
    currentProposal = body['opsProbabilities'][1][3]
    newProposal = body['opsProbabilities'][1][3] * (1 + sliderValues[2])
    if(body['opsProbabilities'][1][1] - (newProposal - currentProposal) > 0):
        body['opsProbabilities'][1][3] = newProposal
        body['opsProbabilities'][1][1] -= (newProposal - currentProposal)
    else:
        body['opsProbabilities'][1][3] = body['opsProbabilities'][1][3] + body['opsProbabilities'][1][1]
        body['opsProbabilities'][1][1] = 0

    # Closing slider bar
    # Demo > Proposal
    currentProposal2 = body['opsProbabilities'][2][3]
    newProposal2 = body['opsProbabilities'][2][3] * (1 + sliderValues[3])
    if(body['opsProbabilities'][2][2] - (newProposal2 - currentProposal2) > 0):
        body['opsProbabilities'][2][3] = newProposal2
        body['opsProbabilities'][2][2] -= (newProposal2 - currentProposal2)
    else:
        body['opsProbabilities'][2][3] = body['opsProbabilities'][2][3] + body['opsProbabilities'][2][2]
        body['opsProbabilities'][2][2] = 0

    # Demo > Negotiation
    currentNegotiation = body['opsProbabilities'][2][4]
    newNegotiation = body['opsProbabilities'][2][4] * (1 + sliderValues[3])
    if(body['opsProbabilities'][2][2] - (newNegotiation - currentNegotiation) > 0):
        body['opsProbabilities'][2][4] = newNegotiation
        body['opsProbabilities'][2][2] -= (newNegotiation - currentNegotiation)
    else:
        body['opsProbabilities'][2][4] = body['opsProbabilities'][2][4] + body['opsProbabilities'][2][2]
        body['opsProbabilities'][2][2] = 0

    # Proposal > Negotiation
    currentNegotiation2 = body['opsProbabilities'][3][4]
    newNegotiation2 = body['opsProbabilities'][3][4] * (1 + sliderValues[3])
    if(body['opsProbabilities'][3][3] - (newNegotiation2 - currentNegotiation2) > 0):
        body['opsProbabilities'][3][4] = newNegotiation2
        body['opsProbabilities'][3][3] -= (newNegotiation2 - currentNegotiation2)
    else:
        body['opsProbabilities'][3][4] = body['opsProbabilities'][3][4] + body['opsProbabilities'][3][3]
        body['opsProbabilities'][3][3] = 0

    # win Rate slider bar
    # negotiation > win
    currentWin = body['opsProbabilities'][4][5]
    newWin = body['opsProbabilities'][4][5] * (1 + sliderValues[4])
    if(body['opsProbabilities'][4][4] - (newWin - currentWin) > 0):
        body['opsProbabilities'][4][5] = newWin
        body['opsProbabilities'][4][4] -= (newWin - currentWin)
    else:
        body['opsProbabilities'][4][5] = body['opsProbabilities'][4][5] + body['opsProbabilities'][4][4]
        body['opsProbabilities'][4][4] = 0

    # market Dynamics slider bar



    # loop through weeks
    for i in range(body['weeks']):
        # create array to store output for each stage
        output = [0 for j in range(len(body['stages']))]

        # total new opportunities coming in
        # uses normal distribution for each source and adds to total opportunities
        newOpsTotal = 0.0
        for j in range(len(body['sources'])):
            newOpsTotal = newOpsTotal + numpy.random.normal(body['means'][j], body['stds'][j])
        
        # adjust slider values to reflect new opportunities
        newOpsTotal = newOpsTotal * (1 + sliderValues[1] + sliderValues[5])

        # new opportunities distributed to each stage (need to calculate using normal dist)
        # Order: All stages, followed by Win and Loss
        newOps = [j * newOpsTotal for j in body['newOpsProbabilities']]

        # movement from each stage to each other stage
        # Order: All stages, followed by Win and Loss
        movementFromStages = [0 for j in range(len(body['stages']))]

        # calculate movement from each stage to each other stage
        for j in range(len(body['stages'])):
            movementForCurrentStage = [k * currentNumber[j]
                for k in body['opsProbabilities'][j]]
            movementFromStages[j] = movementForCurrentStage

        # new totals (update output list with new totals for each stage)
        for j in range(len(movementFromStages)):
            output[j] = newOps[j] + sum(movementFromStages[k][j]
                                            for k in range(len(movementFromStages)))
            
        # update current number of opportunities
        for j in range(len(body['stages'])):
            data[i][j]["Stage"] = body['stages'][j]
            data[i][j]["values"] = round(output[j], 1)
        
        # set current number of opportunities to output for next week
        currentNumber = output

    # create response
    response = {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        },
        "body": json.dumps(data),
        "isBase64Encoded": False
    }

    return response
