// services/ollamaService.js
export const getOllamaResponse = async (prompt) => {
  const response = await fetch('/api/ollama/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  return data.response;
};
