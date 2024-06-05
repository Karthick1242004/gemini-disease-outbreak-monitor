import requests
from bs4 import BeautifulSoup
import json
import os
import csv

def get_don_content_text(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        don_content_divs = soup.find_all('div', class_='don-content')
        don_content_texts = [div.get_text(separator="\n", strip=True) for div in don_content_divs]
        return "\n\n".join(don_content_texts)

    except requests.exceptions.RequestException as e:
        return f'Error fetching data: {e}'

def save_to_json(data, filename):
    try:
        if os.path.exists(filename):
            with open(filename, 'r') as file:
                existing_data = json.load(file)
        else:
            existing_data = {}
            
        next_id = f'id{len(existing_data) + 1}'
        existing_data[next_id] = data
        with open(filename, 'w') as file:
            json.dump(existing_data, file, indent=4)
        
        print(f'Data successfully saved to {filename} as {next_id}')
    except IOError as e:
        print(f'Error saving data to {filename}: {e}')

csv_filename = '/Users/karthicks/Desktop/All/gemini/py/link.csv'
json_filename = 'don_content.json'

with open(csv_filename, 'r') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        url = row[0] 
        don_content_text = get_don_content_text(url)
        data = {
            'url': url,
            'content': don_content_text
        }

        save_to_json(data, json_filename)
