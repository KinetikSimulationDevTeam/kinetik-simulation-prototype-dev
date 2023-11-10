import json
import numpy
import boto3
import copy
from kinetikSimulationLambda import monteCarloSimulation

# Create an instance of the Boto3 Lambda client
client = boto3.client('lambda')


def handler(event, context):

    # store body of request in variable
    eventBody = event['body']

    # convert body to JSON object
    body = json.loads(json.loads(eventBody))

    # Create an array to store the revenue values
    revenue_values = []

    # Run the simulation 10 times
    for _ in range(300):
        response_simulation = monteCarloSimulation(body)

        print("response_simulation", response_simulation)

        last_subarray = response_simulation

        revenue_value = 0

        for i in last_subarray:
            if i.get("Stage") == "Revenue":
                revenue_value = i.get("values")

        revenue_values.append(revenue_value)

    # Calculate the median of the revenue values
    revenue_values.sort()
    middle = len(revenue_values) // 2
    if len(revenue_values) % 2 == 0:
        average_revenue = (
            revenue_values[middle - 1] + revenue_values[middle]) / 2
    else:
        average_revenue = revenue_values[middle]

    # Create an array to store the results of each trial
    all_results = []

    # Run the simulation 10 times
    for _ in range(300):

        # Results for one trial
        result = []

        # for loop to iterate through each stage increase by 1 in the simulation
        for i in range(len(body['stages'])-2):

            difference_array = []

            # create copys of the body
            body_copy_5percent = copy.deepcopy(body)

            # increase the value of the stage by 5%
            body_copy_5percent["sensitivityanalysis"] = [
                0 if index < i else 0.05 for index in range(i + 1)]

            body_copy_10percent = copy.deepcopy(body)
            # increase the value of the stage by 10%
            body_copy_10percent["sensitivityanalysis"] = [
                0 if index < i else 0.1 for index in range(i + 1)]

            body_copy_15percent = copy.deepcopy(body)
            # increase the value of the stage by 15%
            body_copy_15percent["sensitivityanalysis"] = [
                0 if index < i else 0.15 for index in range(i + 1)]

            # Call another Lambda function to get the simulation result for the 5% increase
            response_simulation_5percent = monteCarloSimulation(body)

            # Call another Lambda function to get the simulation result for the 10% increase
            response_simulation_10percent = monteCarloSimulation(body)

            # Call another Lambda function to get the simulation result for the 15% increase
            response_simulation_15percent = monteCarloSimulation(body)

            # Get the last subarray
            last_subarray_5percent = response_simulation_5percent
            last_subarray_10percent = response_simulation_10percent
            last_subarray_15percent = response_simulation_15percent

            revenue_stage_5percent = 0
            revenue_stage_10percent = 0
            revenue_stage_15percent = 0

            # Find the dictionary with the "Revenue" stage
            for i in last_subarray_5percent:
                if i.get("Stage") == "Revenue":
                    revenue_stage_5percent = i.get("values")

            for i in last_subarray_10percent:
                if i.get("Stage") == "Revenue":
                    revenue_stage_10percent = i.get("values")

            for i in last_subarray_15percent:
                if i.get("Stage") == "Revenue":
                    revenue_stage_15percent = i.get("values")

            # calculate the difference between the new revenue and the old revenue and store it in the difference array
            difference_array.append(
                revenue_stage_5percent - average_revenue)

            difference_array.append(
                revenue_stage_10percent - average_revenue)

            difference_array.append(
                revenue_stage_15percent - average_revenue)

            # Append the difference_array for this trial to result
            result.append(difference_array)

        # Append the result for this trial to all_results
        all_results.append(result)

    # Calculate the average of the results for each stage 5% 10% 15% for each trial
    average_results = []

    # Create an array to store the stage name
    stage_name = body['stages']
    stage_name.pop()
    stage_name.pop()

    # Add stage names to average_results
    average_results.append(stage_name)

    for i in range(len(all_results[0])):
        average_results.append(numpy.mean(
            [all_results[j][i] for j in range(len(all_results))], axis=0).tolist())

    # create response
    response = {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        },
        "body": json.dumps(average_results),
        "isBase64Encoded": False
    }

    return response
