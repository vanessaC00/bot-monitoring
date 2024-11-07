import requests
import json
from datetime import datetime

# Define your API details
bot_id = "a4acca45-aa89-4340-996f-e12b79cb2ab9"
workspace_id = "wkspace_01HMAJW0RD0NBS3N9MEDM111JF"  
personal_access_token = "bp_pat_dJS04K28LMhVf2gseZpKQIDq1bL0PqU9RJIc"  

# lead-gen-new-elli = b73aeb28-640f-48a6-9b1f-46d84fc02e70
# lead-gen-luca = a4acca45-aa89-4340-996f-e12b79cb2ab9

# Define the API URL and parameters
url = f"https://api.botpress.cloud/v1/admin/bots/{bot_id}/analytics"
params = {
    'startDate': '2024-06-01',  
    'endDate': datetime.today().strftime('%Y-%m-%d')    
}

# Define the headers, including the Bearer token for authorization
headers = {
    'Authorization': f'Bearer {personal_access_token}',
    'x-workspace-id': workspace_id,
    'Content-Type': 'application/json'

}

# Send the GET request to the API
response = requests.get(url, headers=headers, params=params)

# Check if the request was successful
if response.status_code == 200:
    # Parse the response as JSON
    analytics_data = response.json()

    # Save the data to a JSON file
    with open('botpress_analytics.json', 'w') as file:
        json.dump(analytics_data, file, indent=2)

    print("Analytics data saved to 'botpress_analytics.json'")
else:
    print(f"Failed to fetch data: {response.status_code} - {response.text}")
