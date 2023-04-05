import json
import numpy

def handler(event, context):
    print('received event:')
    print(event)

    eventBody = event['body']
    print(eventBody)
    print(type(eventBody))
    body = json.loads(json.loads(eventBody))
    print(body)
    print(type(body))

    data = [[{} for i in range(len(body['stages']))]
                               for j in range(body['weeks'])]

    for i in range(body['weeks']):

        output = [0 for j in range(len(body['stages']))]

        # total new opportunities coming in
        # uses normal distribution for each source and adds to total opportunities
        newOpsTotal = 0.0
        for j in range(len(body['sources'])):
            newOpsTotal = newOpsTotal + numpy.random.normal(body['means'][j], body['stds'][j])

        # new opportunities distributed to each stage (need to calculate using normal dist)
        # Order: Engage, Qualify, Design, Propose, Negotiate, Closing, Win, Loss
        newOps = [j * newOpsTotal for j in body['newOpsProbabilities']]

        # movement from each stage to each other stage
        # Order: Engage, Qualify, Design, Propose, Negotiate, Closing, Win, Loss
        movementFromStages = [0 for j in range(len(body['stages']))]

        for j in range(len(body['stages'])):
            movementForCurrentStage = [k * body['ops'][j]
                for k in body['opsProbabilities'][j]]
            movementFromStages[j] = movementForCurrentStage

        # new totals (update output list with new totals for each stage)
        for j in range(len(movementFromStages)):
            output[j] = newOps[j] + sum(movementFromStages[k][j]
                                            for k in range(len(movementFromStages)))

        for j in range(len(body['stages'])):
            data[i][j]["Stage"] = body['stages'][j]
            data[i][j]["values"] = output[j]

    response = {
        "statusCode": 200,
        "headers": {},
        "body": json.dumps(data),
        "isBase64Encoded": False
    }

    return response
