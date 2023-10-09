import json
import boto3
from botocore.vendored import requests
import random
import string


def handler(event, context):
    # Create a DynamoDB client
    dynamodb = boto3.resource('dynamodb')
    dynamodb_table_name = 'webUrls-dev'
    url_table = dynamodb.Table(dynamodb_table_name)

    # Create a s3 client
    s3 = boto3.client('s3')
    bucket = 'recommendation-engine-scraped-data'

    # Get all the paths from the DynamoDB table
    response = url_table.scan()

    # If there are no paths, return
    if not response['Items']:
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps("No paths found")
        }

    # Zenrows API key
    apikey = '75308e5f348e13570fa5fe05a64a1212cbc6ac50'

    print("Starting tasks")

    try:
        # Iterate over the paths and make a request to each one
        for item in response['Items']:
            url = item['path']

            # Make a request to Zenrows API
            params = {
                'url': url,
                'apikey': apikey,
                'js_render': 'true',
                'antibot': 'true',
            }

            response = requests.post(
                'https://api.zenrows.com/v1/', params=params)

            # Create a dictionary to store the response
            file = {}
            file['path'] = url
            file['body'] = response.text
            file['status_code'] = response.status_code
            file['headers'] = dict(response.headers)

            # Convert the response to a JSON string
            uploadByteStream = json.dumps(file)

            # Save the response to S3
            # file name is the path with '/' replaced with '-' and a random 16 bit string appended and .html
            random_string = ''.join(random.choice(
                string.ascii_lowercase + string.digits) for _ in range(16))

            file_name = url.replace('/', '-') + '----' + \
                random_string + '.html'

            s3.put_object(Body=uploadByteStream, Bucket=bucket, Key=file_name)

            print("Saved " + file_name + " to S3 completed")

            # Remove the path from the DynamoDB table
            url_table.delete_item(Key={'path': url})

    except Exception as e:
        print(e)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps("Tasks finished")
    }
