import React, { useState } from "react";
import { GoogleGenAI } from '@google/genai';

const DoubtArena = () => {
  const [doubt, setDoubt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doubt.trim()) {
      setError("Please enter a doubt before submitting.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse("");

    try {
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
      });

      const tools = [{ googleSearch: {} }];
      const config = {
        thinkingConfig: { thinkingBudget: -1 },
        tools,
        responseMimeType: 'text/plain',
      };
      const model = 'gemini-2.5-pro';
      const contents = [
        { role: 'user', parts: [{ text: doubt }] },
      ];

      const responseStream = await ai.models.generateContentStream({
        model,
        config,
        contents,
      });

      let responseText = "";
      for await (const chunk of responseStream) {
        responseText += chunk.text;
        setResponse(responseText);
      }
    } catch (err) {
      setError("Failed to fetch response. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Response area */}
      <div className="p-4 overflow-auto flex-1 max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Ask Your Doubt</h2>
        {response && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Response:</h3>
            <p className="text-gray-800 text-sm sm:text-base whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>

      {/* Fixed input box at the bottom */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto bg-white p-4 border-t border-gray-300 shadow fixed bottom-0 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <textarea
            value={doubt}
            onChange={(e) => setDoubt(e.target.value)}
            placeholder="Enter your doubt here..."
            className="flex-1 p-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
            aria-label="Doubt input"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 rounded-lg text-white font-semibold ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            } transition-colors`}
          >
            {isLoading ? "Submitting..." : "Ask"}
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </form>
    </div>
  );
};

export default DoubtArena;

