export async function* streamResponse(text: string): AsyncGenerator<string> {
  const chars = text.split('');
  let accumulator = '';
  
  for (const char of chars) {
    accumulator += char;
    // Yield the accumulated text so far
    yield accumulator;
    // Add a small delay for the streaming effect
    await new Promise(resolve => setTimeout(resolve, 30));
  }
}