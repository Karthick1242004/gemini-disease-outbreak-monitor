import requests
from bs4 import BeautifulSoup
import json
import os
import csv

# Function to fetch the content from the given URL
def get_don_content_text(url):
    try:
        # Send a GET request to the URL
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors

        # Parse the content of the request with BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find all div elements with class 'don-content'
        don_content_divs = soup.find_all('div', class_='don-content')

        # Extract and concatenate the text from each 'don-content' div
        don_content_texts = [div.get_text(separator="\n", strip=True) for div in don_content_divs]
        return "\n\n".join(don_content_texts)

    except requests.exceptions.RequestException as e:
        return f'Error fetching data: {e}'

# Function to save data to JSON file with unique IDs for each link's content
def save_to_json(data, filename):
    try:
        # Check if the file already exists
        if os.path.exists(filename):
            # Load existing data from the file
            with open(filename, 'r') as file:
                existing_data = json.load(file)
        else:
            # Initialize an empty dictionary if the file does not exist
            existing_data = {}

        # Determine the next ID based on existing keys
        next_id = f'id{len(existing_data) + 1}'

        # Add new data with the next ID
        existing_data[next_id] = data

        # Save the updated data back to the file
        with open(filename, 'w') as file:
            json.dump(existing_data, file, indent=4)
        
        print(f'Data successfully saved to {filename} as {next_id}')
    except IOError as e:
        print(f'Error saving data to {filename}: {e}')

# Read links from CSV file
csv_filename = '/Users/karthicks/Desktop/All/gemini/py/link.csv'
json_filename = 'don_content.json'

with open(csv_filename, 'r') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        url = row[0]  # Assuming each row has one URL in the first column
        # Fetch all text content within 'don-content' divs
        don_content_text = get_don_content_text(url)

        # Prepare data to be stored in JSON format
        data = {
            'url': url,
            'content': don_content_text
        }

        # Save the data to a JSON file
        save_to_json(data, json_filename)
