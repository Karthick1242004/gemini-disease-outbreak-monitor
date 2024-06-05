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

function readDonContent() {
  const donContentFilePath = '../don_content.json';
  if (fs.existsSync(donContentFilePath)) {
    const data = fs.readFileSync(donContentFilePath);
    return JSON.parse(data);
  }
  return { error: 'DON content not found' };
}

async function generateOutput(content) {
  try {
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

app.get('/ids', (req, res) => {
  const donContent = readDonContent();

  if (donContent.error) {
    return res.status(404).json(donContent);
  }

  const ids = Object.keys(donContent);
  res.json({ ids });
});

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
    const generatedOutput = await generateOutput(content);
    res.json({ id, output: generatedOutput });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
