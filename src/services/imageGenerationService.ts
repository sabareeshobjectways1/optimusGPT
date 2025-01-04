import { GEMINI_API_KEY } from '../config/gemini';

const IMAGE_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent';

export async function generateImage(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${IMAGE_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Generate an image of: ${prompt}` }]
        }]
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].inlineData.data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image');
  }
}