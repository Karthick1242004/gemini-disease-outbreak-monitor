# Disease Monitoring System

## Overview

The Disease Monitoring System is a comprehensive project designed to scrape disease outbreak information from the World Health Organization (WHO) website, store this data in a JSON file, and then use the Gemini AI API to extract and provide key details such as the disease name and the number of victims. The project utilizes Python for web scraping, Node.js for the backend server, and React (with Vite) for the frontend interface.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- Python 3.x installed on your machine.
- A Google API key for accessing the Gemini AI API.
- Basic knowledge of Node.js, React, and Python.

## Installation

### Clone the Repository

### Backend Setup

- Navigate to the server directory:
  ```bash
  cd server
- Create a .env file in the server directory and add your Google API key:
- Run the server:
  ```bash
  node server.js
### Frontend Setup

- Navigate to the client directory:
  ```bash
  cd client
- Install the dependencies:
  ```bash
  npm install
- Run the React application
   ```bash
   npm run dev

### Python Setup

- Navigate to the python-algorithm directory
  ```bash
  cd python-algorithm
- Ensure you have the necessary Python libraries installed
  ```bash
  pip install requests beautifulsoup4
- Run the Python script to scrape WHO data and generate the don_content.json file


### Project Structure

disease-monitoring-system/
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Gemini.jsx
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
├── python-algorithm/
│   ├── app.py
│   └── link.csv
├── server/
│   ├── .env
│   ├── .gitignore
│   ├── chatHistory.json
│   ├── server.js
│   └── don_content.json
├── README.md
└── package.json



