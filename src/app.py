# Replace with your Twitter API key and access token
# api_key = "9I9t5ExLB5FsZF45gQKxXYpq6"
# api_secret = "R2orJ1gTVFrWbinV66KG5i2Xz4WkpDQFIkysWGbAjXYbpa61zQ"
# access_token = "1567761859171819520-cyerNgGjKBvVPCGPVLebfKDkPsw2kE"
# access_token_secret = "NqI9GXZbhfLhMibMEC0UGEdOnhCJPTmVsP7ilFUh8qGOf"

import requests
import base64

def get_bearer_token(api_key, api_secret, project_id):
    # Construct the URL for obtaining a Bearer token
    token_url = f'https://api.twitter.com/oauth2/token'

    # Set up the data for obtaining the token
    token_data = {'grant_type': 'client_credentials'}

    # Set up authentication headers
    auth_header = f'Basic {base64.b64encode(f"{api_key}:{api_secret}".encode()).decode()}'
    headers = {
        'Authorization': auth_header,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'x-twitter-client-metadata': f'client_id={api_key},project_id={project_id}',
    }

    # Make the request to obtain the Bearer token
    response = requests.post(token_url, data=token_data, headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        # Extract and return the Bearer token
        return response.json().get('access_token')
    else:
        # Print an error message if the request was not successful
        print(f"Error obtaining Bearer token: {response.status_code}, {response.text}")
        return None

def get_trending_topics_v2(woeid, bearer_token):
    # Construct the API endpoint URL for v2
    endpoint_url = f'https://api.twitter.com/2/tweets/search/recent?query=trending&place.fields=geo&place.id={woeid}'

    # Set up authentication headers with the Bearer token
    headers = {
        'Authorization': f'Bearer {bearer_token}'
    }

    # Make the API request
    response = requests.get(endpoint_url, headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse and return the trending topics data
        trending_topics = response.json()['data'][:50]
        return trending_topics
    else:
        # Print an error message if the request was not successful
        print(f"Error: {response.status_code}, {response.text}")
        return None

woeid_us = 23424977
api_key ='9I9t5ExLB5FsZF45gQKxXYpq6'
api_secret ='R2orJ1gTVFrWbinV66KG5i2Xz4WkpDQFIkysWGbAjXYbpa61zQ'
project_id = 'gen_ai'

# Get the Bearer token
bearer_token = get_bearer_token(api_key, api_secret, project_id)

if bearer_token:
    # Get trending topics using the Bearer token
    trending_topics_us = get_trending_topics_v2(woeid_us, bearer_token)

    if trending_topics_us:
        for i, topic in enumerate(trending_topics_us, start=1):
            print(f"{i}. {topic['name']} - Tweet Volume: {topic.get('tweet_volume', 'N/A')}")