import json
import numpy as np


def handler(event, context):
    # Parse the JSON body from the event
    eventbody = json.loads(event['body'])

    data = eventbody['data']

    # Initialize dictionaries to store means and standard deviations
    mql_means = 0
    mql_std_devs = []
    sql_means = 0
    sql_std_devs = []

    # Iterate through sources and subcategories
    for source_data in data:
        for source, subcategories in source_data.items():

            for subcategory_data in subcategories:
                subcategory_name = list(subcategory_data.keys())[0]
                subcategory_values = subcategory_data[subcategory_name]

                # search the SQLs values index
                sql_values = subcategory_values[3]

                sql_mean_array = sql_values['SQLs']

                # convert the value to a float
                def safe_float_conversion(value):
                    try:
                        return float(value)
                    except ValueError:
                        return -1.0

                sql_mean = safe_float_conversion(sql_mean_array[0]['Mean'])

                sql_std = safe_float_conversion(sql_mean_array[1]['Std Dev'])

                # search the MQLs values index
                mql_values = subcategory_values[2]

                mql_mean_array = mql_values['MQLs']

                mql_mean = safe_float_conversion(mql_mean_array[0]['Mean'])

                mql_std = safe_float_conversion(mql_mean_array[1]['Std Dev'])

                if mql_mean and mql_mean != -1 and mql_std and mql_std != -1.0:
                    mql_means += mql_mean
                    mql_std_devs.append(mql_std)

                if sql_mean and sql_mean != -1 and sql_std and sql_std != -1.0:
                    sql_means += sql_mean
                    sql_std_devs.append(sql_std)

    # get the averages and standard deviations of the arrays
    mql_std_devs = np.std(mql_std_devs)

    sql_std_devs = np.std(sql_std_devs)

    total_sql = 0
    total_mql = 0

    # Iterate through each week and calculate the MQLs and SQLs
    for i in range(eventbody["weeks"]):
        # Calculate the MQLs
        mqls = np.random.normal(mql_means, mql_std_devs)

        # Calculate the SQLs
        sqls = np.random.normal(sql_means, sql_std_devs)

        total_sql += sqls
        total_mql += mqls

    # Prepare the response JSON
    response = {
        "MQL": round(mqls, 2),
        "SQL": round(sqls, 2),
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
