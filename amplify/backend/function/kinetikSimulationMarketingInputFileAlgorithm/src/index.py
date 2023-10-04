import json
import numpy as np


def handler(event, context):
    eventbody = event['body']
    data = eventbody['data']

    # Initialize dictionaries to store means and standard deviations
    mql_means = {}
    mql_std_devs = {}
    sql_means = {}
    sql_std_devs = {}

    # Iterate through sources and subcategories
    for source_data in data:
        for source, subcategories in source_data.items():
            if source not in mql_means:
                mql_means[source] = {}
                mql_std_devs[source] = {}
                sql_means[source] = {}
                sql_std_devs[source] = {}

            for subcategory_data in subcategories:
                subcategory_name = list(subcategory_data.keys())[0]
                subcategory_values = subcategory_data[subcategory_name]

                # Check if MQLs and SQLs exist and are not empty
                mql_values = [float(
                    value['Mean']) for value in subcategory_values if 'MQLs' in value and 'Mean' in value and value['Mean']]
                sql_values = [float(
                    value['Mean']) for value in subcategory_values if 'SQLs' in value and 'Mean' in value and value['Mean']]

                if mql_values:
                    mql_means[source][subcategory_name] = np.mean(mql_values)
                    mql_std_devs[source][subcategory_name] = np.std(
                        mql_values, ddof=1)

                if sql_values:
                    sql_means[source][subcategory_name] = np.mean(sql_values)
                    sql_std_devs[source][subcategory_name] = np.std(
                        sql_values, ddof=1)

    # Prepare the response JSON
    response = {
        "MQL_Means": mql_means,
        "MQL_Std_Devs": mql_std_devs,
        "SQL_Means": sql_means,
        "SQL_Std_Devs": sql_std_devs
    }

    # Return the response
    return {
        "statusCode": 200,
        "headers": {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        },
        "body": json.dumps(response),
        "isBase64Encoded": False
    }
