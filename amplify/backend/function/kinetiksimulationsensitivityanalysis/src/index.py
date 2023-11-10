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

    # iterations that the simulation will run
    iterations = 300

    # for loop to iterate through each stage increase by 1 in the simulation
    for i in range(len(body['stages'])-2):

        difference_array_5percent = []
        difference_array_10percent = []
        difference_array_15percent = []

        for _ in range(iterations):

            # create copys of the body
            body_copy_5percent = copy.deepcopy(body)

            # increase the value of the stage by 5%
            body_copy_5percent["sensitivityanalysis"] = [
                0 if index != i else 0.05 for index in range(i + 1)]

            body_copy_10percent = copy.deepcopy(body)
            # increase the value of the stage by 10%
            body_copy_10percent["sensitivityanalysis"] = [
                0 if index != i else 0.1 for index in range(i + 1)]

            body_copy_15percent = copy.deepcopy(body)
            # increase the value of the stage by 15%
            body_copy_15percent["sensitivityanalysis"] = [
                0 if index != i else 0.15 for index in range(i + 1)]

            # Call another Lambda function to get the simulation result for the 5% increase
            response_simulation_5percent = monteCarloSimulation(
                body_copy_5percent)

            # Call another Lambda function to get the simulation result for the 10% increase
            response_simulation_10percent = monteCarloSimulation(
                body_copy_10percent)

            # Call another Lambda function to get the simulation result for the 15% increase
            response_simulation_15percent = monteCarloSimulation(
                body_copy_15percent)

            revenue_stage_5percent = 0
            revenue_stage_10percent = 0
            revenue_stage_15percent = 0

            # Find the dictionary with the "Revenue" stage
            for j in response_simulation_5percent:
                if j.get("Stage") == "Revenue":
                    revenue_stage_5percent = j.get("values")

            for j in response_simulation_10percent:
                if j.get("Stage") == "Revenue":
                    revenue_stage_10percent = j.get("values")

            for j in response_simulation_15percent:
                if j.get("Stage") == "Revenue":
                    revenue_stage_15percent = j.get("values")

            # calculate the difference between the new revenue and the old revenue and store it in the difference array
            difference_array_5percent.append(
                revenue_stage_5percent - average_revenue)

            difference_array_10percent.append(
                revenue_stage_10percent - average_revenue)

            difference_array_15percent.append(
                revenue_stage_15percent - average_revenue)

        # Calculate the average of the difference array for each stage 5% 10% 15%
        difference_array = []
        difference_array.append(numpy.floor(
            numpy.median(difference_array_5percent)))
        difference_array.append(numpy.floor(
            numpy.median(difference_array_10percent)))
        difference_array.append(numpy.floor(
            numpy.median(difference_array_15percent)))

        # Append the result for this trial to all_results
        all_results.append(difference_array)

    average_results = []

    # Create an array to store the stage name
    stage_name = body['stages']
    stage_name.pop()
    stage_name.pop()

    # Add stage names to average_results
    average_results.append(stage_name)

    # Add the median of the all_result array to average_results
    average_results.append(all_results)

    print("average_results", average_results)

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
