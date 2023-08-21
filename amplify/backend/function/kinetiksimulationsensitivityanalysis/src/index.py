import json
import numpy
import boto3

# Create an instance of the Boto3 Lambda client
client = boto3.client('lambda')


def handler(event, context):

    # store body of request in variable
    eventBody = event['body']

    # convert body to JSON object
    body = json.loads(json.loads(eventBody))

    # Call another Lambda function to get the simulation data
    response_simulation = client.invoke(
        # Replace with the actual Lambda function name
        FunctionName='kinetikSimulationLambda-dev',
        # Use RequestResponse for synchronous invocation
        InvocationType='RequestResponse',
        # Pass the payload/data to the other Lambda function
        Payload=json.dumps(body)
    )

    print(response_simulation)

    # # Process the response from the other Lambda function if needed
    # response_payload = json.loads(response['Payload'].read().decode())

    # loop through each stage in the simulation

    # create response
    response = {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        },
        "body": json.dumps(response_simulation[0]),
        "isBase64Encoded": False
    }

    return response
