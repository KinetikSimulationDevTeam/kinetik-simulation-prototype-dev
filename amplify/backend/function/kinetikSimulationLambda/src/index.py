import json, numpy

def handler(event, context):
    print('received event:')
    print(event)

    data = [[{} for i in range(len(event['stages']))]
                               for j in range(event['weeks'])]

    for i in range(event['weeks']):

        output = [0 for j in range(len(event['stages']))]

        # total new opportunities coming in
        # uses normal distribution for each source and adds to total opportunities
        newOpsTotal = 0.0
        for j in range(len(event['sources'])):
            newOpsTotal = newOpsTotal + 5

        # new opportunities distributed to each stage (need to calculate using normal dist)
        # Order: Engage, Qualify, Design, Propose, Negotiate, Closing, Win, Loss
        newOps = [j * newOpsTotal for j in event['newOpsProbabilities']]

        # movement from each stage to each other stage
        # Order: Engage, Qualify, Design, Propose, Negotiate, Closing, Win, Loss
        movementFromStages = [0 for j in range(len(event['stages']))]

        for j in range(len(event['stages'])):
            movementForCurrentStage = [k * event['ops'][j]
                for k in event['opsProbabilities'][j]]
            movementFromStages[j] = movementForCurrentStage

        # new totals (update output list with new totals for each stage)
        for j in range(len(movementFromStages)):
            output[j] = newOps[j] + sum(movementFromStages[k][j]
                                            for k in range(len(movementFromStages)))

        for j in range(len(event['stages'])):
            data[i][j]["Stage"] = event['stages'][j]
            data[i][j]["values"] = output[j]

        response = {
            "statusCode": 200,
            "headers": {},
            "body": json.dumps(data),
            "isBase64Encoded": False
        }

    return response
