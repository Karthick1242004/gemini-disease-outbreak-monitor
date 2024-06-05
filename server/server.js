const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to read DON content from JSON file
function readDonContent() {
  const donContentFilePath = '../don_content.json'; // Ensure this path is correct
  if (fs.existsSync(donContentFilePath)) {
    const data = fs.readFileSync(donContentFilePath);
    return JSON.parse(data);
  }
  return { error: 'DON content not found' };
}

// Function to generate text using Gemini AI
async function generateOutput(content) {
  try {
    // Generate text using Gemini AI
    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const text = `${content}, give me just disease name from the provided content and also the number of victims of it without any external words, just name and victim count`;
    const result = await chat.sendMessage(text);
    const response = await result.response;
    const generatedOutput = await response.text();
    return generatedOutput;
  } catch (error) {
    console.error('Error generating text:', error);
    throw new Error('Failed to generate text');
  }
}

// Route to fetch all IDs
app.get('/ids', (req, res) => {
  const donContent = readDonContent();

  if (donContent.error) {
    return res.status(404).json(donContent);
  }

  const ids = Object.keys(donContent);
  res.json({ ids });
});

// Route to generate output for a specific ID
app.get('/generate-output/:id', async (req, res) => {
  try {
    const donContent = readDonContent();

    if (donContent.error) {
      return res.status(404).json(donContent);
    }

    const id = req.params.id;

    if (!donContent[id]) {
      return res.status(404).json({ error: 'ID not found in JSON file' });
    }

    const content = donContent[id].content;
    // Generate output using Gemini AI
    const generatedOutput = await generateOutput(content);

    // Send the generated output as response
    res.json({ id, output: generatedOutput });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
