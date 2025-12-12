import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';

const GeminiAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Namaste! I am your Ayurvedic Wellness Guide. How can I assist you today with your health or Dosha?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
        if (!process.env.API_KEY) {
            throw new Error("API Key missing");
        }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-2.5-flash';
      
      const systemInstruction = `You are an expert Ayurvedic practitioner and consultant for an e-commerce store called VedaLife. 
      Your goal is to provide helpful, safe, and culturally accurate advice based on Ayurvedic principles (Doshas: Vata, Pitta, Kapha).
      Always recommend consulting a doctor for serious medical conditions.
      Keep answers concise (under 100 words) and friendly.
      If relevant, suggest types of products (e.g., "Ashwagandha might help") but do not invent URLs.`;

      const chat = ai.chats.create({
        model: model,
        config: { systemInstruction }
      });

      // Simple history context construction (last 5 messages)
      // In a real app, use the chat.sendMessage history management
      const response = await chat.sendMessage({ message: userMsg });
      
      const text = response.text || "I apologize, I am meditating right now. Please try again later.";
      
      setMessages(prev => [...prev, { role: 'model', text }]);

    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm currently unable to connect to the cosmic wisdom (API Error or Key missing). Please check your connection or environment variables." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-nature-dark text-white rounded-full shadow-lg hover:bg-nature transition-all z-40 flex items-center gap-2 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles className="w-5 h-5" />
        <span className="font-semibold">Ask Ayurveda AI</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-veda-200 z-50 flex flex-col overflow-hidden h-[500px]">
          {/* Header */}
          <div className="bg-nature-dark p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-serif font-semibold">VedaLife Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-300">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-veda-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-nature text-white rounded-br-none' 
                    : 'bg-white border border-veda-200 text-veda-900 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-veda-200 text-veda-500 rounded-lg p-3 text-sm italic">
                  Consulting ancient texts...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-veda-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about sleep, stress, or doshas..."
              className="flex-1 border border-veda-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-nature focus:ring-1 focus:ring-nature"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 bg-nature text-white rounded-full hover:bg-nature-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GeminiAdvisor;
