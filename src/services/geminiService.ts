import { GEMINI_API_KEY, GEMINI_API_URL } from '../config/gemini';
import { GeminiResponse } from '../types';

export async function sendMessageToGemini(message: string, imageData?: string): Promise<string> {
  try {
    const contents: any[] = [{
      parts: []
    }];

    // Add image if provided
    if (imageData) {
      const base64Data = imageData.split(',')[1];
      contents[0].parts.push({
        inline_data: {
          mime_type: "image/jpeg",
          data: base64Data
        }
      });
    }

    // Add text message
    contents[0].parts.push({ text: message });

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.error?.message || 'Failed to get response from Gemini');
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('No valid response received from the model');
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error: any) {
    if (error.message.includes('model has been deprecated')) {
      throw new Error('We are experiencing technical difficulties. Please try again later.');
    }
    throw error;
  }
}